
// Validaciones
const validarEmail = (email, errorId = 'email-error') => {
    const errorMsg = document.getElementById(errorId);

    if (!email) {
        mostrarError(errorId, 'El correo electrónico es obligatorio');
        return false;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        mostrarError(errorId, 'Por favor, ingresa un correo electrónico válido');
        return false;
    }

    ocultarError(errorId);
    return true;
};

const validarPassword = (password, errorId = 'password-error', minChars = 6) => {
    const errorMsg = document.getElementById(errorId);

    if (!password) {
        mostrarError(errorId, 'La contraseña es obligatoria');
        return false;
    }

    if (password.length < minChars) {
        mostrarError(errorId, `La contraseña debe tener mínimo ${minChars} caracteres`);
        return false;
    }

    ocultarError(errorId);
    return true;
};

const validarNombre = (nombre, errorId) => {
    if (!nombre || nombre.trim().length < 3) {
        mostrarError(errorId, 'El nombre debe tener al menos 3 caracteres');
        return false;
    }

    ocultarError(errorId);
    return true;
};

const validarCoincidenciaPassword = (password, confirm, errorId) => {
    if (password !== confirm) {
        mostrarError(errorId, 'Las contraseñas no coinciden');
        return false;
    }

    ocultarError(errorId);
    return true;
};

const mostrarError = (errorId, mensaje) => {
    const errorMsg = document.getElementById(errorId);
    if (errorMsg) {
        errorMsg.textContent = mensaje;
        errorMsg.classList.remove('hidden');
    }
};

const ocultarError = (errorId) => {
    const errorMsg = document.getElementById(errorId);
    if (errorMsg) {
        errorMsg.classList.add('hidden');
    }
};

// Mostrar estado de carga
const mostrarCargando = (boton, mostrar = true) => {
    if (mostrar) {
        boton.disabled = true;
        boton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Cargando...';
    } else {
        boton.disabled = false;
        boton.textContent = boton.dataset.originalText || 'Enviar';
    }
};

// Login
const intentarLogin = async (e) => {
    e.preventDefault();

    const formLogin = document.getElementById('login-form');
    const botonSubmit = formLogin.querySelector('button[type="submit"]');
    botonSubmit.dataset.originalText = botonSubmit.textContent;

    const email = formLogin.querySelector('input[type="text"]').value.trim();
    const password = formLogin.querySelector('input[type="password"]').value.trim();

    const emailValido = validarEmail(email, 'email-error');
    const passwordValido = validarPassword(password, 'password-error', 6);

    if (!emailValido || !passwordValido) return;

    mostrarCargando(botonSubmit, true);

    try {
        const response = await fetch('/api/auth/ingresar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al iniciar sesión');
        }

        const { token } = data.respuesta;
        localStorage.setItem('token', token);
        window.location.replace('/watchlist');
    } catch (error) {
        mostrarCargando(botonSubmit, false);
        mostrarError('email-error', error.message);
    }
};

// Registro
const intentarRegistro = async (e) => {
    e.preventDefault();

    const formRegistro = document.getElementById('register-form');
    const botonSubmit = formRegistro.querySelector('button[type="submit"]');
    botonSubmit.dataset.originalText = botonSubmit.textContent;

    const nombre = document.getElementById('register-nombre').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const confirmPassword = document.getElementById('register-confirm').value.trim();

    // Validaciones
    const nombreValido = validarNombre(nombre, 'nombre-error-reg');
    const emailValido = validarEmail(email, 'email-error-reg');
    const passwordValido = validarPassword(password, 'password-error-reg', 6);
    const confirmValido = validarCoincidenciaPassword(password, confirmPassword, 'confirm-error-reg');

    if (!nombreValido || !emailValido || !passwordValido || !confirmValido) return;

    mostrarCargando(botonSubmit, true);

    try {
        const response = await fetch('/api/auth/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al crear la cuenta');
        }

        const { token } = data.respuesta;
        localStorage.setItem('token', token);
        window.location.replace('/watchlist');
    } catch (error) {
        mostrarCargando(botonSubmit, false);
        mostrarError('email-error-reg', error.message);
    }
};

// Validación en tiempo real
const validarEnTiempoReal = (input, tipo, errorId) => {
    input.addEventListener('input', (e) => {
        const valor = e.target.value.trim();

        switch(tipo) {
            case 'email':
                validarEmail(valor, errorId);
                break;
            case 'password':
                validarPassword(valor, errorId, 6);
                break;
            case 'nombre':
                validarNombre(valor, errorId);
                break;
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('login-form');
    const formRegistro = document.getElementById('register-form');

    // Configurar login
    if (formLogin) {
        const emailInput = formLogin.querySelector('input[type="text"]');
        const passwordInput = formLogin.querySelector('input[type="password"]');

        validarEnTiempoReal(emailInput, 'email', 'email-error');
        validarEnTiempoReal(passwordInput, 'password', 'password-error');

        formLogin.addEventListener('submit', intentarLogin);
    }

    // Configurar registro
    if (formRegistro) {
        const nombreInput = document.getElementById('register-nombre');
        const emailInput = document.getElementById('register-email');
        const passwordInput = document.getElementById('register-password');
        const confirmInput = document.getElementById('register-confirm');

        validarEnTiempoReal(nombreInput, 'nombre', 'nombre-error-reg');
        validarEnTiempoReal(emailInput, 'email', 'email-error-reg');
        validarEnTiempoReal(passwordInput, 'password', 'password-error-reg');

        // Validar coincidencia de contraseñas en tiempo real
        confirmInput.addEventListener('input', () => {
            const password = passwordInput.value.trim();
            const confirm = confirmInput.value.trim();
            if (confirm) {
                validarCoincidenciaPassword(password, confirm, 'confirm-error-reg');
            }
        });

        formRegistro.addEventListener('submit', intentarRegistro);
    }
});