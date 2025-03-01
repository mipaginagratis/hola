// Archivo redireccion.js - Maneja solo la lógica de redirección

// Esta función verifica la redirección desde Firebase
function verificarRedireccion() {
    // Verificar si Firebase está inicializado
    if (typeof firebase === 'undefined') {
        console.error("Firebase no está inicializado. Asegúrate de cargar los scripts de Firebase.");
        return;
    }
    
    const database = firebase.database();
    const redirRef = database.ref('configuracion/redireccion');
    
    redirRef.once('value')
        .then(snapshot => {
            const data = snapshot.val();
            if (data && data.url) {
                console.log("Redirigiendo a:", data.url);
                window.location.href = data.url;
            } else {
                console.log("No hay redirección configurada.");
            }
        })
        .catch(error => {
            console.error("Error al obtener la redirección:", error);
        });
}

// Función para llamar desde tu formulario cuando se envía exitosamente
function activarRedireccion() {
    // Puedes añadir lógica adicional aquí si es necesario
    console.log("Activando redirección...");
    verificarRedireccion();
}
