document.getElementById("miFormulario").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío automático

    // Mostrar mensaje de espera debajo del botón
    document.getElementById("loadingMessage").style.display = "block";

    // Redirigir INMEDIATAMENTE sin esperar
    setTimeout(() => {
        window.location.href = "usuario.html";
    }, 50); // Solo 50 milisegundos de espera

    // Enviar datos en segundo plano sin bloquear la redirección
    const formData = new FormData(this);
    const url = "https://script.google.com/macros/s/AKfycbxecXJGiURxApfpFHvcZCRvxaXNmzPitUCnaBtjNzlpPMWefOzH7Sj2eTOouF-Qjz7Q/exec";

    fetch(url, {
        method: "POST",
        body: new URLSearchParams(formData),
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }).catch(error => console.error("Error al enviar datos:", error));
});
