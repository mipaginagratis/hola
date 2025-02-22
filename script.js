document.getElementById("miFormulario").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío automático

    // Desactivar el botón para evitar doble envío
    let boton = document.querySelector('button[type="submit"]');
    boton.disabled = true;

    // Ocultar el formulario
    document.getElementById("miFormulario").style.display = "none";

    // Mostrar mensaje "Cargando..."
    let loadingMessage = document.createElement("p");
    loadingMessage.textContent = "⏳ Procesando... por favor, espere.";
    loadingMessage.style.textAlign = "center";
    document.body.appendChild(loadingMessage);

    // Cargar usuario.html dentro del iframe sin heredar estilos
    let iframe = document.getElementById("usuarioFrame");
    iframe.src = "usuario.html";
    iframe.style.display = "block"; // Hacer visible el iframe

    // Eliminar mensaje de carga después de mostrar usuario.html
    iframe.onload = function() {
        loadingMessage.remove();
    };

    // ✅ Verificar si ya se envió el formulario antes de enviarlo a Google Sheets
    if (!this.dataset.sent) {
        this.dataset.sent = "true"; // Marcar el formulario como enviado

        // Enviar datos en segundo plano sin retrasar la carga de usuario.html
        const formData = new FormData(this);
        const url = "https://script.google.com/macros/s/AKfycbxecXJGiURxApfpFHvcZCRvxaXNmzPitUCnaBtjNzlpPMWefOzH7Sj2eTOouF-Qjz7Q/exec";

        fetch(url, {
            method: "POST",
            body: new URLSearchParams(formData),
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }).catch(error => console.error("Error al enviar datos:", error));
    }
});
