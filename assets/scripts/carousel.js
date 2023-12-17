// Função para buscar dados da API e adicionar banners ao carousel
function loadCarousel() {
  fetch('https://jsonserver-tp2-salvador--imcathalat1.repl.co/highlights/?_expand=album')
    .then(response => response.json())
    .then(data => {
      const carouselIndicators = document.getElementById('carouselIndicators');
      const carouselInner = document.getElementById('carouselInner');

      // Para cada item, criar um indicador e um banner no carousel
      data.forEach((item, index) => {
        // Criar o indicador
        const indicator = document.createElement('button');
        indicator.setAttribute('type', 'button');
        indicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
        indicator.setAttribute('data-bs-slide-to', index.toString());
        if (index === 0) {
          indicator.classList.add('active');
        }
        carouselIndicators.appendChild(indicator);

        // Criar o banner
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) {
          carouselItem.classList.add('active');
        }
        const banner = `
          <a href="./details.html?id=${item.album.id}">
            <img src="${item.album.cover}" class="d-block w-100 object-fit-cover" alt="${item.album.name}" height="400px">
            <div class="carousel-caption d-none d-md-block">
              <h5 class="carousel-title">${item.album.name}</h5>
              <p class="carousel-text">${item.album.location_name}</p>
            </div>
          </a>
        `;
        carouselItem.innerHTML = banner;
        carouselInner.appendChild(carouselItem);
      });
    })
}

loadCarousel();
