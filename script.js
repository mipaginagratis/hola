
document.getElementById("miFormulario").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Ocultar el formulario y mostrar el mensaje de carga
    document.getElementById("miFormulario").style.display = "none";
    document.getElementById("loadingMessage").style.display = "block";

    const formData = new FormData(this);
    const url = "https://script.google.com/macros/s/AKfycbxecXJGiURxApfpFHvcZCRvxaXNmzPitUCnaBtjNzlpPMWefOzH7Sj2eTOouF-Qjz7Q/exec";

    try {
        const response = await fetch(url, {
            method: "POST",
            body: new URLSearchParams(formData),
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });

        window.location.href = "usuario.html"; // Redirigir tras éxito
    } catch (error) {
        alert("Error al conectar con el servidor.");
        console.error("Error:", error);

        // Si hay un error, volver a mostrar el formulario y ocultar el mensaje
        document.getElementById("miFormulario").style.display = "block";
        document.getElementById("loadingMessage").style.display = "none";
    }
});
