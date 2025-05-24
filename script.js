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

        // Traducir placeholders del formulario
        document.getElementById('nombre').placeholder = translations[language].name.replace(':', '');
        document.getElementById('telefono').placeholder = translations[language].phone.replace(':', '');
        document.getElementById('origen').placeholder = translations[language].origin.replace(':', '');
        document.getElementById('destino').placeholder = translations[language].destination.replace(':', '');

        // Traducir sección de servicios
        document.querySelector('.services h3').textContent = translations[language].services_title;
        const serviceItems = document.querySelectorAll('.service-item');
        serviceItems[0].querySelector('h4').textContent = translations[language].airport_transfer;
        serviceItems[0].querySelector('p').textContent = translations[language].airport_transfer_desc;
        serviceItems[1].querySelector('h4').textContent = translations[language].business;
        serviceItems[1].querySelector('p').textContent = translations[language].business_desc;
        serviceItems[2].querySelector('h4').textContent = translations[language].tourism;
        serviceItems[2].querySelector('p').textContent = translations[language].tourism_desc;
        serviceItems[3].querySelector('h4').textContent = translations[language].service_24_7;
        serviceItems[3].querySelector('p').textContent = translations[language].service_24_7_desc;

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
        
        // Número de WhatsApp del servicio de taxi
        const numeroWhatsApp = '+34634634774'; // Incluimos el + para el prefijo internacional
        
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
        
        window.open(urlWhatsApp, '_blank');
    });

    // Inicializar la página en español
    translatePage('es');

    // Animación suave al hacer scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}); 