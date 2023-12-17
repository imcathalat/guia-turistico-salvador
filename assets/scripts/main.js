const api_url = "https://jsonserver-tp2-salvador--imcathalat1.repl.co";

function get_map(){
    const centralLatLong = [-38.47949112318273, -12.9838139460819];

    mapboxgl.accessToken= 'pk.eyJ1IjoiaW1jYXRoYWxhdCIsImEiOiJjbHBndTAxZzUwMWMwMmx0MmV3bXNjZmZqIn0.QrqPjcwRi1b_Kz4YBs2r_A';

    const map = new mapboxgl.Map ({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: centralLatLong,
        zoom: 12
    })

    return map;
}

function get_card_marker(album) {
    return `
      <a class="popUp text-decoration-none text-reset anchor-popup" href="./details.html?id=${album.id}" target="_blank">
          <img src="${album.cover}" class="card-img-top" alt="${album.name}" height="150px">
          <div class="card-boy">
            <h5 class="card-title text-truncate mt-2">${album.name}</h5>
            <p class"card-text">${album.location_name}</p>
          </div>
      </a>`;
  }
  
  
function get_locations(map){
    const url = `${api_url}/albums` //api
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((array_data) => {
        array_data.forEach((item) => {
          let popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            get_card_marker(item)
          );
          console.log(popup);
          const marker = new mapboxgl.Marker({ color: "blue" })
            .setLngLat(item.location_coordinates)
            .setPopup(popup)
            .addTo(map);
        })
      });

  }

function getAlbuns() {
    const url = `${api_url}/albums`;
  
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((albums) => {
        console.log(albums);
        renderCardSection(albums);
      });
  }


  function renderCard(album){
    const cardDiv = document.createElement('div');
    cardDiv.className = 'col-xxl-3 col-xl-3 col-lg-4 col-md-4 col-sm-12 d-flex justify-content-center p-2';

    cardDiv.innerHTML = `
    <div class="card mb-2" style="width:380px;">
        <img src="${album.cover}" class="card-img-top object-fit-cover" alt="..." height="300px">
        <div class="card-body position-relative">
            <h5 class="card-title">${album.name}</h5>
            <p class="card-text">${album.home_description}</p>
            <br>
          <div class="position-absolute bottom-0 end-0">
            <button type="button" class="btn btn-light align-end mb-2 mx-2">
                <a href="./details.html?id=${album.id}" class="decoration-none align-self-end">Ver detalhes</a>
            </button>
          </div>
        </div>
    </div>
    `;

    return cardDiv;
}

async function renderCardSection(data){
    const cardContainer = document.getElementById('card-container');

    for(let i=0; i<= data.length; i++){
        const card = renderCard(data[i]); 
        cardContainer.appendChild(card); // aqui, a variavel cardContainer adiciona aquele html de card da função renderCard com as informações vindas do json no html do index
    }  
}
const map = get_map();
get_locations(map);
getAlbuns();
