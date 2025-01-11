const generateBtn = document.getElementById("generate-btn");
const passwordDisplay = document.getElementById("password");
const copyBtn = document.getElementById("copy-btn");
const lengthInput = document.getElementById("length");
const lowercaseCheckbox = document.getElementById("include-lowercase");
const uppercaseCheckbox = document.getElementById("include-uppercase");
const numbersCheckbox = document.getElementById("include-numbers");
const specialCheckbox = document.getElementById("include-special");
const passwordStrengthContainer = document.getElementById("password-strength");
const toggleThemeButton = document.getElementById("toggle-theme");

// Función para generar la contraseña
function generatePassword() {
    const length = lengthInput.value;
    const chars = [];
    let password = '';

    if (lowercaseCheckbox.checked) chars.push('abcdefghijklmnopqrstuvwxyz');
    if (uppercaseCheckbox.checked) chars.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if (numbersCheckbox.checked) chars.push('0123456789');
    if (specialCheckbox.checked) chars.push('!@#$%^&*()_+[]{}|;:,.<>?');

    if (chars.length === 0) {
        alert("Selecciona al menos un tipo de carácter.");
        return;
    }

    const allChars = chars.join('');
    for (let i = 0; i < length; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    passwordDisplay.value = password;
    evaluateStrength(password);
}

// Función para evaluar la fuerza de la contraseña
function evaluateStrength(password) {
    const lengthCriteria = password.length >= 12;
    const numberCriteria = /[0-9]/.test(password);
    const specialCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const uppercaseCriteria = /[A-Z]/.test(password);
    const lowercaseCriteria = /[a-z]/.test(password);

    let strength = 0;
    if (lengthCriteria) strength++;
    if (numberCriteria) strength++;
    if (specialCriteria) strength++;
    if (uppercaseCriteria) strength++;
    if (lowercaseCriteria) strength++;

    if (strength === 5) {
        passwordStrengthContainer.className = "strength-strong";
    } else if (strength >= 3) {
        passwordStrengthContainer.className = "strength-medium";
    } else {
        passwordStrengthContainer.className = "strength-weak";
    }
}

// Función para copiar la contraseña
copyBtn.addEventListener("click", function () {
    passwordDisplay.select();
    document.execCommand('copy');
    copyBtn.textContent = "Copiado!";
    setTimeout(() => {
        copyBtn.textContent = "Copiar";
    }, 1500);
});

// Función para cambiar el tema a modo oscuro
toggleThemeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleThemeButton.textContent = document.body.classList.contains("dark-mode") ? "Modo Claro" : "Modo Oscuro";
});

// Generar la contraseña al hacer clic
generateBtn.addEventListener("click", generatePassword);