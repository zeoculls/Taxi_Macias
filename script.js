document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taxiForm');
    const languageSelect = document.getElementById('languageSelect');
    let currentLanguage = 'es';

    // Función para traducir la página
    function translatePage(language) {
        document.documentElement.lang = language;
        const elements = document.getElementsByClassName('translate');
        
        for (let element of elements) {
            const key = element.getAttribute('data-key');
            if (key && translations[language] && translations[language][key]) {
                if (element.tagName === 'TITLE') {
                    element.textContent = translations[language][key];
                } else {
                    element.textContent = translations[language][key];
                }
            }
        }
        currentLanguage = language;
    }

    // Evento para cambio de idioma
    languageSelect.addEventListener('change', function(e) {
        translatePage(e.target.value);
    });

    // Manejo del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const origen = document.getElementById('origen').value;
        const destino = document.getElementById('destino').value;
        const fecha = document.getElementById('fecha').value;
        
        const fechaFormateada = new Date(fecha).toLocaleString(currentLanguage + '-' + currentLanguage.toUpperCase(), {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const mensaje = `${translations[currentLanguage].whatsapp_msg}
- ${translations[currentLanguage].name.replace(':', '')} ${nombre}
- ${translations[currentLanguage].phone.replace(':', '')} ${telefono}
- ${translations[currentLanguage].origin.replace(':', '')} ${origen}
- ${translations[currentLanguage].destination.replace(':', '')} ${destino}
- ${translations[currentLanguage].date.replace(':', '')} ${fechaFormateada}`;
        
        const mensajeCodificado = encodeURIComponent(mensaje);
        
        // Número de WhatsApp del servicio de taxi (reemplazar con el número real)
        const numeroWhatsApp = '34XXXXXXXXX'; // Reemplazar con el número real
        
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
        
        window.open(urlWhatsApp, '_blank');
    });

    // Inicializar la página en español
    translatePage('es');
}); 