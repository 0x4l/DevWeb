// Selecciona todos los elementos li dentro de la lista con clase 'banner-buttons'
document.querySelectorAll('.banner-buttons li').forEach(item => {
    item.addEventListener('click', function() {
        const url = this.getAttribute('data-link');
        if (url) {
            window.open(url, '_blank'); // Abre la URL en una nueva pestaña
        }
    });
});

// Obtener elementos del DOM
const searchIcon = document.querySelector('.search-icon');
const searchModal = document.getElementById('searchModal');
const closeSearch = document.getElementById('closeSearch');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

// Función para abrir el modal de búsqueda
searchIcon.addEventListener('click', () => {
    searchModal.style.display = 'flex';
    searchInput.value = ''; // Limpiar el input de búsqueda
    searchResults.innerHTML = ''; // Limpiar resultados de búsqueda
});

// Función para cerrar el modal de búsqueda
closeSearch.addEventListener('click', () => {
    searchModal.style.display = 'none';
});

// Cerrar el modal si se hace clic fuera de la ventana de contenido
window.addEventListener('click', (e) => {
    if (e.target === searchModal) {
        searchModal.style.display = 'none';
    }
});

// Función de búsqueda
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase();
    searchResults.innerHTML = ''; // Limpiar resultados anteriores

    // Obtener todas las tarjetas de noticias
    const newsCards = document.querySelectorAll('.news-card');

    newsCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();

        // Verificar si el título o la descripción contienen la consulta
        if (title.includes(query) || description.includes(query)) {
            // Crear un resultado de búsqueda
            const result = document.createElement('div');
            result.classList.add('search-result');
            result.innerHTML = `<h4>${card.querySelector('h3').textContent}</h4><p>${card.querySelector('p').textContent}</p>`;
            searchResults.appendChild(result);
        }
    });

    // Mostrar mensaje si no hay resultados
    if (searchResults.innerHTML === '') {
        searchResults.innerHTML = '<p>No se encontraron resultados.</p>';
    }
});

// Carrusel
// Metodos de paso de pagina carrusel
document.addEventListener("DOMContentLoaded", function () {
    const carouselInner = document.querySelector(".carousel-inner");
    const carouselItems = document.querySelectorAll(".carousel-item");
    const newsButtons = document.querySelectorAll(".news-button");
    const slideIndicator = document.createElement("div");
    slideIndicator.className = "slide-indicator";
    document.querySelector(".carousel").appendChild(slideIndicator);

    let currentIndex = 0;
    let autoSlideInterval;

    function updateIndicator() {
        slideIndicator.textContent = `Imagen ${currentIndex + 1} de ${carouselItems.length}`;
    }

    function showSlide(index) { 
        if (index < 0) {
            currentIndex = carouselItems.length - 1;
        } else if (index >= carouselItems.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        carouselItems.forEach((item, idx) => {
            item.style.opacity = idx === currentIndex ? "1" : "0";
            item.style.zIndex = idx === currentIndex ? "1" : "0";
            item.style.display = idx === currentIndex ? "block" : "none";
        });

        newsButtons.forEach((button, idx) => {
            button.classList.toggle("active", idx === currentIndex);
        });

        updateIndicator();
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    newsButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });

    document.querySelector(".carousel-button.next").addEventListener("click", () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    document.querySelector(".carousel-button.prev").addEventListener("click", () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    // Detener y reanudar el auto-slide con hover
    carouselInner.addEventListener("mouseenter", stopAutoSlide);
    carouselInner.addEventListener("mouseleave", startAutoSlide);

    showSlide(currentIndex);
    startAutoSlide();


});
