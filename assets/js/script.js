// ===========================
// Smooth Scroll para enlaces internos
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Cerrar el menú móvil si está abierto
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// ===========================
// Navbar transparente en scroll
// ===========================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow');
    } else {
        navbar.classList.remove('shadow');
    }
});

// ===========================
// Formulario de Contacto
// ===========================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación básica
        const nombre = document.getElementById('nombre').value.trim();
        const empresa = document.getElementById('empresa').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const tipo = document.getElementById('tipo').value;
        const ubicacion = document.getElementById('ubicacion').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        
        if (!nombre || !empresa || !email || !telefono || !tipo || !ubicacion || !mensaje) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }
        
        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingresa un email válido.');
            return;
        }
        
        // Simular envío de formulario
        // En producción, aquí se haría una llamada AJAX a un servidor o servicio de email
        console.log('Formulario enviado:', {
            nombre,
            empresa,
            email,
            telefono,
            tipo,
            ubicacion,
            mensaje,
            credito: document.getElementById('credito').checked
        });
        
        // Mostrar mensaje de éxito
        formSuccess.style.display = 'block';
        contactForm.reset();
        
        // Scroll al mensaje de éxito
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            formSuccess.style.display = 'none';
        }, 5000);
    });
}

// ===========================
// Animación de elementos al hacer scroll
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos que queremos animar
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.problem-card, .solution-card, .benefit-item, .testimonial-card, .process-card, .credit-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// ===========================
// Contador animado para testimonios
// ===========================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// ===========================
// Efecto parallax suave en hero
// ===========================
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// ===========================
// Tooltip de Bootstrap (si se necesita)
// ===========================
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// ===========================
// Preloader (opcional)
// ===========================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===========================
// Validación de imágenes rotas
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Si la imagen no carga, usar un placeholder
            this.src = 'https://via.placeholder.com/800x600/00AEEF/FFFFFF?text=VASANMEX';
            this.alt = 'Imagen placeholder VASANMEX';
        });
    });
});

// ===========================
// Botón de WhatsApp flotante (opcional)
// ===========================
function createWhatsAppButton() {
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/525512345678?text=Hola,%20me%20gustaría%20solicitar%20una%20cotización';
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = '<i class="bi bi-whatsapp"></i>';
    whatsappBtn.setAttribute('aria-label', 'Contactar por WhatsApp');
    
    // Estilos inline para el botón flotante
    whatsappBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #25D366;
        color: white;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    whatsappBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 16px rgba(0,0,0,0.4)';
    });
    
    whatsappBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    });
    
    document.body.appendChild(whatsappBtn);
}

// Crear el botón de WhatsApp al cargar la página
document.addEventListener('DOMContentLoaded', createWhatsAppButton);

// ===========================
// Analytics y tracking (placeholder)
// ===========================
function trackEvent(category, action, label) {
    // Aquí se integraría Google Analytics o similar
    console.log('Event tracked:', { category, action, label });
}

// Trackear clics en CTAs
document.querySelectorAll('.btn-primary, .btn-light').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('CTA', 'Click', this.textContent.trim());
    });
});

