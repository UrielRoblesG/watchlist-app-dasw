const ITEMS_PER_PAGE = 5;

let allItems = [];
let currentPage = 1;
let paginationData = {};

const fetchAPI = async (endpoint, options = {}) => {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    const response = await fetch(endpoint, { ...options, headers, credentials: 'include' });
    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
    return response.json();
};

const obtenerData = async (page = 1) => {
    try {
        const params = new URLSearchParams(window.location.search);
        const tipo = params.get('tipo');
        const estado = params.get('estado');
        const genero = params.get('genero');

        const queryParams = new URLSearchParams({
            page,
            limit: ITEMS_PER_PAGE,
            ...(tipo && { tipo }),
            ...(estado && { estatus: estado }),
            ...(genero && { genero })
        });

        const { data, pagination } = await fetchAPI(`/api/watchlist?${queryParams}`);
        allItems = data || [];
        paginationData = pagination || {};

        console.log(data);

        return allItems;
    } catch (error) {
        console.error('Error obteniendo watchlist:', error);
        return [];
    }
};

const obtenerEstrellas = (rating10) => {
    const rating5 = rating10 / 2;
    const completas = Math.floor(rating5);
    const decimal = rating5 - completas;

    let medias = 0;
    let finales = completas;

    if (decimal >= 0.75) finales += 1;
    else if (decimal >= 0.25) medias = 1;

    return { completas: finales, medias, rating: rating5 };
};

const crearTarjeta = (item) => {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('watchlist-card');
    tarjeta.setAttribute('data-id', item._id || item.id);

    const { completas, medias, rating: rating5 } = obtenerEstrellas(item.calificacion || 0);

    let estrellas = '';
    for (let i = 0; i < completas; i++) estrellas += '<i class="bi bi-star-fill"></i>';
    for (let i = 0; i < medias; i++) estrellas += '<i class="bi bi-star-half"></i>';

    let badgeStyle = '';
    const estado = item.estatus || 'pendiente';

    switch (estado) {
        case 'viendo':
        case 'watching':
            badgeStyle = 'badge-watching';
            break;
        case 'visto':
        case 'watched':
            badgeStyle = 'badge-watched';
            break;
        case 'pendiente':
        case 'pending':
            badgeStyle = 'badge-pending';
            break;
    }

    const tipo = item.tipo === 'movie' ? 'Película' : 'Serie';
    const posterUrl = item.coverUrl || 'https://placehold.co/200';

    tarjeta.innerHTML = `
        <div class="card-poster" style="background-image: url('${posterUrl}')">
            <div class="card-overlay">
                <div class="card-title">${item.titulo}</div>
            </div>
            <div class="card-actions">
                <button class="btn-delete" data-id="${item._id || item.id}" title="Eliminar">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
        <div class="card-body">
            <div class="card-badges">
                <span class="badge-custom badge-series">${tipo}</span>
                <span class="badge-custom ${badgeStyle}">${estado}</span>
            </div>
            <div class="card-rating">
                ${estrellas}
                <span>${rating5.toFixed(1)}</span>
            </div>
            <div class="card-genre">${item.genero || 'Sin género'}</div>
            ${item.notas ? `<div class="card-notes">${item.notas}</div>` : ''}
        </div>`;

    tarjeta.addEventListener('click', (e) => {
        if (!e.target.closest('.btn-delete')) {
            window.location.href = `/watchlist/${item._id || item.id}`;
        }
    });

    const btnDelete = tarjeta.querySelector('.btn-delete');
    btnDelete.addEventListener('click', (e) => {
        e.stopPropagation();
        eliminarItem(item._id || item.id);
    });

    return tarjeta;
};

const obtenerPaginaActual = () => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page')) || 1;
    return Math.max(1, page);
};

const actualizarEstadisticas = () => {
    const total = paginationData.total || 0;
    const peliculas = allItems.filter(i => i.tipo === 'movie').length;
    const series = allItems.filter(i => i.tipo === 'serie').length;
    const vistos = allItems.filter(i => i.estatus === 'visto').length;

    document.querySelectorAll('.stat-item strong').forEach((el, idx) => {
        const values = [total, peliculas, series, vistos];
        el.textContent = values[idx];
    });
};


const renderizarPaginacion = () => {
    const { pages = 1, page = 1 } = paginationData;
    const pagination = document.querySelector('.pagination');

    pagination.innerHTML = `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="prev">
                <i class="bi bi-chevron-left"></i>
            </a>
        </li>`;

    for (let i = 1; i <= pages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${currentPage === i ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>`;
    }

    pagination.innerHTML += `
        <li class="page-item ${currentPage === pages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="next">
                <i class="bi bi-chevron-right"></i>
            </a>
        </li>`;

    pagination.addEventListener('click', async (e) => {
        e.preventDefault();
        const page = e.target.dataset.page;

        if (page === 'prev' && currentPage > 1) currentPage--;
        else if (page === 'next' && currentPage < pages) currentPage++;
        else if (!isNaN(page)) currentPage = parseInt(page);

        actualizarURL();
        await obtenerData(currentPage);
        await renderizarContenido();
    });
};

const actualizarURL = () => {
    const url = new URL(window.location);
    url.searchParams.set('page', currentPage);
    window.history.pushState({}, '', url);
};

const renderizarContenido = async () => {
    const contenedor = document.querySelector('.watchlist-grid');

    contenedor.innerHTML = '';
    allItems.forEach(item => {
        contenedor.appendChild(crearTarjeta(item));
    });

    renderizarPaginacion();
};

const crearItem = async (formData) => {
    try {
        await fetchAPI('/api/watchlist', {
            method: 'POST',
            body: JSON.stringify(formData)
        });

        currentPage = 1;
        actualizarURL();
        await obtenerData(currentPage);
        await renderizarContenido();
        actualizarEstadisticas();
    } catch (error) {
        console.error('Error creando item:', error);
        alert('Error al crear el item');
    }
};

const eliminarItem = async (id) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este item?')) return;

    try {
        await fetchAPI(`/api/watchlist/${id}`, { method: 'DELETE' });
        currentPage = 1;
        actualizarURL();
        await obtenerData(currentPage);
        await renderizarContenido();
        actualizarEstadisticas();
    } catch (error) {
        console.error('Error eliminando item:', error);
        alert('Error al eliminar el item');
    }
};

const inicializarFiltros = () => {
    const filtroCategoriaPadre = document.getElementById('filtro-categoria');
    const filtroEstadoPadre = document.getElementById('filtro-estado');
    const filtroGeneroPadre = document.getElementById('filtro-genero');

    const actualizarFiltro = (filtro, param) => async (e) => {
        e.preventDefault();
        const valor = e.target.dataset[filtro];
        if (!valor) return;

        const url = new URL(window.location);
        if (valor === 'todos') {
            url.searchParams.delete(param);
        } else {
            url.searchParams.set(param, valor);
        }
        url.searchParams.set('page', 1);
        window.history.pushState({}, '', url);

        currentPage = 1;
        actualizarFiltrosActivos();
        await obtenerData(currentPage);
        await renderizarContenido();
        actualizarEstadisticas();
    };

    filtroCategoriaPadre?.addEventListener('click', actualizarFiltro('categoria', 'tipo'));
    filtroEstadoPadre?.addEventListener('click', actualizarFiltro('estado', 'estado'));
    filtroGeneroPadre?.addEventListener('click', actualizarFiltro('genero', 'genero'));
};

const actualizarFiltrosActivos = () => {
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('tipo') || 'todos';
    const estado = params.get('estado') || 'todos';
    const genero = params.get('genero') || 'todos';

    document.querySelectorAll('.filter-option').forEach(el => {
        el.classList.remove('active');
        if (el.dataset.categoria === categoria ||
            el.dataset.estado === estado ||
            el.dataset.genero === genero) {
            el.classList.add('active');
        }
    });
};

const inicializarModal = () => {
    const modal = document.getElementById('addModal');
    if (!modal) return;

    const btnAgregar = Array.from(modal.querySelectorAll('button[type="button"]'))
        .find(btn => btn.textContent.includes('Agregar'));

    btnAgregar?.addEventListener('click', async () => {
        const titulo = modal.querySelector('input[placeholder*="Nombre"]')?.value;
        const selects = modal.querySelectorAll('select');
        const tipo = selects[0]?.value;
        const genero = selects[1]?.value;
        const estatus = selects[2]?.value;
        const calificacion = parseInt(selects[3]?.value) || 0;
        const coverUrl = modal.querySelector('input[type="url"]')?.value;
        const notas = modal.querySelector('textarea')?.value;

        if (!titulo) {
            alert('El título es requerido');
            return;
        }

        const formData = { titulo, tipo, genero, estatus, calificacion, coverUrl, notas };
        await crearItem(formData);

        const inputs = modal.querySelectorAll('input, select, textarea');
        inputs.forEach(input => input.value = '');

        const bootstrapModal = bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal);
        bootstrapModal.hide();
    });
};

document.addEventListener('DOMContentLoaded', async () => {
    currentPage = obtenerPaginaActual();
    await obtenerData(currentPage);
    actualizarEstadisticas();
    inicializarFiltros();
    actualizarFiltrosActivos();
    await renderizarContenido();
    inicializarModal();
});