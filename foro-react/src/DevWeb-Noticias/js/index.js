document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.querySelector('.search-button');
    const searchBox = document.querySelector('.search-box-container');
    const searchInput = document.querySelector('.search-input');
    const newsCards = document.querySelectorAll('.news-card');
    const searchResultsContainer = document.getElementById('search-results');

    let isSearchVisible = false;

    // Evento para mostrar/ocultar el buscador con clic
    searchButton.addEventListener('click', function () {
        if (isSearchVisible) {
            performSearch(searchInput.value.trim());
        } else {
            searchBox.style.display = 'flex';
            searchInput.focus();
            isSearchVisible = true;
        }
    });

    // Opción para ocultar el buscador cuando no está en uso
    document.addEventListener('click', function (event) {
        if (!searchBox.contains(event.target) && !searchButton.contains(event.target)) {
            searchBox.style.display = 'none';
            isSearchVisible = false;
        }
    });

    // Función para realizar la búsqueda
    function performSearch(query) {
        const lowerCaseQuery = query.toLowerCase();
        const results = [];
        
        newsCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();

            if (title.includes(lowerCaseQuery) || content.includes(lowerCaseQuery)) {
                results.push(card.cloneNode(true)); // Clonar el nodo para mostrarlo en resultados
            }
        });

        displayResults(results);
        searchInput.value = ''; // Limpiar el campo de búsqueda
        searchBox.style.display = 'none'; // Ocultar buscador
        isSearchVisible = false;
    }

    // Función para mostrar los resultados
    function displayResults(results) {
        searchResultsContainer.innerHTML = ''; // Limpiar resultados anteriores

        if (results.length > 0) {
            results.forEach(card => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');
                resultItem.innerHTML = `<h3>${card.querySelector('h3').textContent}</h3><p>${card.querySelector('p').textContent}</p>`;
                searchResultsContainer.appendChild(resultItem);
            });
        } else {
            searchResultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
        }
    }
});


    // Sección para manejar los botones del banner y redirigir a nuevas pestañas
    const botones = document.querySelectorAll('.banner-buttons li');

    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-link'); // Corrección: usar 'targetPage'
            if (targetPage) {
                window.open(targetPage, '_blank'); // Abre en una nueva pestaña
            }
        });
    });

document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.search-button');
    const searchBox = document.querySelector('.search-box');
    const searchInput = document.querySelector('.search-input');

    let isSearchVisible = false;
    // Evento para mostrar/ocultar el buscador con clic
    searchButton.addEventListener('click', function() {
        if (isSearchVisible) {
            // Si el buscador está visible y tiene texto, realizar búsqueda
            if (searchInput.value.trim() !== "") {
                searchBox.submit();
            } else {
                // Si no tiene texto, ocultar el buscador
                searchBox.style.display = 'none';
                isSearchVisible = false;
            }
        } else {
            // Mostrar el buscador
            searchBox.style.display = 'flex';
            isSearchVisible = true;
        }
    });

    // Opción para ocultar el buscador cuando no está en uso
    document.addEventListener('click', function(event) {
        if (!searchBox.contains(event.target) && !searchButton.contains(event.target)) {
            if (isSearchVisible) {
                searchBox.style.display = 'none';
                isSearchVisible = false;
            }
        }
    });
});

// Metodos de paso de pagina carrusel
document.addEventListener("DOMContentLoaded", function() {
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    function showSlide(index) {
        if (index < 0) {
            currentIndex = carouselItems.length - 1; // Mover a la última diapositiva
        } else if (index >= carouselItems.length) {
            currentIndex = 0; // Volver a la primera diapositiva
        } else {
            currentIndex = index;
        }
        const offset = -currentIndex * 100; // Calcular el desplazamiento
        carouselInner.style.transform = `translateX(${offset}%)`; // Desplazar el carrusel
    }

    window.nextSlide = function() {
        showSlide(currentIndex + 1);
    };

    window.prevSlide = function() {
        showSlide(currentIndex - 1);
    };

    // Inicializar la vista
    showSlide(currentIndex);

    // Cambiar de diapositiva automáticamente cada 3 segundos
    setInterval(function() {
        nextSlide(); // Llamar a la función que pasa a la siguiente diapositiva
    }, 5000); // 4000 milisegundos = 4 segundos
});

function showSlide(index) {
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = index;

    if (currentIndex < 0) {
        currentIndex = carouselItems.length - 1; // Mover a la última diapositiva
    } else if (currentIndex >= carouselItems.length) {
        currentIndex = 0; // Volver a la primera diapositiva
    }

    const offset = -currentIndex * 100; // Calcular el desplazamiento
    carouselInner.style.transform = `translateX(${offset}%)`; // Desplazar el carrusel
}

document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.querySelector('.search-button');
    const searchBox = document.querySelector('.search-box');
    const searchInput = document.querySelector('.search-input');
    const newsCards = document.querySelectorAll('.news-card'); // Selecciona todas las cartas de noticias

    let isSearchVisible = false;

    // Evento para mostrar/ocultar el buscador con clic
    searchButton.addEventListener('click', function () {
        if (isSearchVisible) {
            // Si el buscador está visible y tiene texto, realizar búsqueda
            if (searchInput.value.trim() !== "") {
                performSearch(searchInput.value.trim()); // Llamar a la función de búsqueda
            } else {
                // Si no tiene texto, ocultar el buscador
                searchBox.style.display = 'none';
                isSearchVisible = false;
            }
        } else {
            // Mostrar el buscador
            searchBox.style.display = 'flex';
            isSearchVisible = true;
        }
    });

    // Opción para ocultar el buscador cuando no está en uso
    document.addEventListener('click', function (event) {
        if (!searchBox.contains(event.target) && !searchButton.contains(event.target)) {
            if (isSearchVisible) {
                searchBox.style.display = 'none';
                isSearchVisible = false;
            }
        }
    });

    // Función para realizar la búsqueda
    // Función para realizar la búsqueda
    function performSearch(query) {
        const lowerCaseQuery = query.toLowerCase();
        let results = [];

        newsCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();

            if (title.includes(lowerCaseQuery) || content.includes(lowerCaseQuery)) {
                results.push(card); // Agregar a los resultados
            }
        });

        displayResults(results);
        searchBox.style.display = 'none';
        isSearchVisible = false;
    }

    // Función para mostrar los resultados
    function displayResults(results) {
        searchResultsContainer.innerHTML = ''; // Limpiar resultados anteriores

        if (results.length > 0) {
            results.forEach(card => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');
                
                const title = card.querySelector('h3').textContent;
                const content = card.querySelector('p').textContent;

                resultItem.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
                searchResultsContainer.appendChild(resultItem);
            });
        } else {
            searchResultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
        }
    }
        // Ocultar el buscador después de la búsqueda
        searchBox.style.display = 'none';
        isSearchVisible = false;
    
});

document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.querySelector('.search-button');
    const searchBox = document.querySelector('.search-box');
    const searchInput = document.querySelector('.search-input');
    const newsCards = document.querySelectorAll('.news-card'); // Selecciona todas las cartas de noticias

    let isSearchVisible = false;

    // Evento para mostrar/ocultar el buscador con clic
    searchButton.addEventListener('click', function () {
        if (isSearchVisible) {
            // Si el buscador está visible y tiene texto, realizar búsqueda
            if (searchInput.value.trim() !== "") {
                performSearch(searchInput.value.trim()); // Llamar a la función de búsqueda
            } else {
                // Si no tiene texto, ocultar el buscador
                searchBox.style.display = 'none';
                isSearchVisible = false;
            }
        } else {
            // Mostrar el buscador
            searchBox.style.display = 'flex';
            isSearchVisible = true;
        }
    });

    // Opción para ocultar el buscador cuando no está en uso
    document.addEventListener('click', function (event) {
        if (!searchBox.contains(event.target) && !searchButton.contains(event.target)) {
            if (isSearchVisible) {
                searchBox.style.display = 'none';
                isSearchVisible = false;
            }
        }
    });

    // Función para realizar la búsqueda
    function performSearch(query) {
        // Convertir la consulta a minúsculas para hacer la búsqueda insensible a mayúsculas
        const lowerCaseQuery = query.toLowerCase();

        let foundMatch = false; // Para controlar si se encontró al menos una coincidencia

        // Iterar sobre cada carta de noticia
        newsCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();

            // Mostrar u ocultar la carta según si contiene el texto de búsqueda
            if (title.includes(lowerCaseQuery) || content.includes(lowerCaseQuery)) {
                card.style.display = 'block'; // Mostrar si hay coincidencia
                foundMatch = true;
            } else {
                card.style.display = 'none'; // Ocultar si no hay coincidencia
            }
        });

        // Mostrar un mensaje si no se encontraron coincidencias
        if (!foundMatch) {
            alert("No se encontraron resultados para: " + query);
        }

        // Ocultar el buscador después de la búsqueda
        searchBox.style.display = 'none';
        isSearchVisible = false;
    }

    // Agregar evento para detectar Enter en el campo de búsqueda
    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevenir el envío del formulario
            if (searchInput.value.trim() !== "") {
                performSearch(searchInput.value.trim()); // Llamar a la función de búsqueda
            }
        }
    });
});
