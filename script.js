document.getElementById("miFormulario").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const url = "https://script.google.com/macros/s/AKfycbxecXJGiURxApfpFHvcZCRvxaXNmzPitUCnaBtjNzlpPMWefOzH7Sj2eTOouF-Qjz7Q/exec"; // Reemplaza con tu URL de Google Apps Script

    try {
        const response = await fetch(url, {
            method: "POST",
            body: new URLSearchParams(formData),
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });

        if (response.ok) {
            alert("Datos enviados correctamente.");
            window.location.href = "usuario.html";
        } else {
            alert("Error al enviar los datos.");
        }
    } catch (error) {
        alert("Ocurrió un error al enviar el formulario.");
    }
});
