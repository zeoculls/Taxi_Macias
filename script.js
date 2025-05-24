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
        const formElements = {
            'nombre': 'name',
            'telefono': 'phone',
            'origen': 'origin',
            'destino': 'destination'
        };

        for (const [id, key] of Object.entries(formElements)) {
            const element = document.getElementById(id);
            if (element) {
                element.placeholder = translations[language][key].replace(':', '');
            }
        }

        // Traducir sección de servicios
        const servicesTitle = document.querySelector('.services h3');
        if (servicesTitle) {
            servicesTitle.textContent = translations[language].services_title;
        }

        const serviceTranslations = [
            ['airport_transfer', 'airport_transfer_desc'],
            ['business', 'business_desc'],
            ['tourism', 'tourism_desc'],
            ['service_24_7', 'service_24_7_desc']
        ];

        const serviceItems = document.querySelectorAll('.service-item');
        serviceItems.forEach((item, index) => {
            if (index < serviceTranslations.length) {
                const [titleKey, descKey] = serviceTranslations[index];
                const titleElement = item.querySelector('h4');
                const descElement = item.querySelector('p');
                
                if (titleElement) {
                    titleElement.textContent = translations[language][titleKey];
                }
                if (descElement) {
                    descElement.textContent = translations[language][descKey];
                }
            }
        });

        currentLanguage = language;
    }

    // Evento para cambio de idioma
    languageSelect.addEventListener('change', function(e) {
        translatePage(e.target.value);
    });

    // Inicializar la traducción con el idioma por defecto
    translatePage(currentLanguage);

    // Manejo del formulario
    if (form) {
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
            const numeroWhatsApp = '+34634634774';
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
            
            window.open(urlWhatsApp, '_blank');
        });
    }

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