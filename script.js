document.getElementById("miFormulario").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío automático

    // Ocultar el formulario
    document.getElementById("miFormulario").style.display = "none";

    // Mostrar mensaje "Cargando..."
    let loadingMessage = document.createElement("p");
    loadingMessage.textContent = "⏳ Procesando... por favor, espere.";
    loadingMessage.style.textAlign = "center";
    document.body.appendChild(loadingMessage);

    // Cargar el contenido de usuario.html dentro del div oculto
    fetch("usuario.html")
        .then(response => response.text())  // Obtiene el contenido de usuario.html
        .then(data => {
            document.getElementById("usuarioContent").innerHTML = data; // Muestra el contenido
            document.getElementById("usuarioContent").style.display = "block"; // Lo hace visible
            loadingMessage.remove(); // Eliminar mensaje de carga
        })
        .catch(error => console.error("Error cargando usuario.html:", error));

    // Enviar datos en segundo plano sin retrasar la carga de usuario.html
    const formData = new FormData(this);
    const url = "https://script.google.com/macros/s/AKfycbxecXJGiURxApfpFHvcZCRvxaXNmzPitUCnaBtjNzlpPMWefOzH7Sj2eTOouF-Qjz7Q/exec";

    fetch(url, {
        method: "POST",
        body: new URLSearchParams(formData),
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }).catch(error => console.error("Error al enviar datos:", error));
});

