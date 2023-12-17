const urlBase = "https://jsonserver-tp2-salvador--imcathalat1.repl.co";

// ##############################################
// CÓDIGOS PARA LIDAR COM O DETALHE DO PRODUTO

// Função para buscar detalhes do produto a partir do arquivo JSON
async function fetchAlbumDetails(albumId) {
  try {
    const response = await fetch(`${urlBase}/albums/${albumId}?_embed=highlights`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}

// Função para atualizar o conteúdo HTML com os detalhes do produto
function updateAlbumDetails(album) {
  if (album) {
    document.getElementById('detail-name').textContent = album.name;
    document.getElementById('image-cover').src = album.cover;
    document.getElementById('detail_description').textContent = album.detail_description;
    document.getElementById('location-name').textContent = album.location_name;
    document.getElementById('detail-date').textContent = album.date;
  } else {
    alert('Produto não encontrado');
  }

  if (album.highlights.length > 0) {
    // Se o produto tiver destaque, o checkbox deve ser marcado
    // VEJA A FUNÇÃO setHighligth() MAIS ABAIXO
    setHighligth(album.highlights);
  }
}

// Função para inicializar a página e buscar detalhes do produto
async function renderDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const albumId = urlParams.get('id');

  const album = await fetchAlbumDetails(albumId);
  updateAlbumDetails(album);
}


// ##############################################
// CÓDIGOS PARA LIDAR COM O CHECKBOX DE DESTAQUE

//É preciso salvar o id do destaque para poder remover
//"highlights": [
// {
//   "albumId": 172, 
//   "id": 1 -> ESSE ID AQUI SERÁ USADO NO MÉTODO REMOVE HIGHLIGHT
// },
//]
// A linha abaixo inicializa a variável idDestaque que será utilizada para salvar o id
let idDestaque = null;

// Função que adiciona os eventos no Checkbox presente no HTML
function initiateCheckbox() {

  // Obter o elemento do checkbox pelo seu ID
  const checkbox = document.getElementById('destaque');

  // Adicionar um "event listener" para o evento 'change' que é marcar ou dersmarcar o checkbox
  checkbox.addEventListener('change', function(event) {
    // Verificar se o checkbox está marcado ou não
    if (event.target.checked) {
      addHighligth()
      console.log('Checkbox está marcado!');
    } else {
      removeHighligth()
      console.log('Checkbox não está marcado!');
    }
  });
}

// Essa função usa a response da API para setar o checkbox como marcado ou não
// quando a página é carregada. Se a API Retornar um objeto highlights que não seja vazio,
// significa que o checkbox deve ser marcado. Caso contrário, o checkbox deve permanecer desmarcado.
function setHighligth(highlights) {
  // Localiza o checkbox pelo ID no HTML
  const checkbox = document.getElementById("destaque");

  if (highlights && highlights[0]) {
    checkbox.checked = true;

    // Salva o id do destaque.
    // Esse id será usado para remover o destaque, se o usuário desmarcar o checkbox
    idDestaque = highlights[0].id;
  }
}

// Função para adicionar um destaque
// Ao marcar o checkbox, essa função é chamada para adicionar um destaque
// dando um POST na API
function addHighligth() {
  const urlParams = new URLSearchParams(window.location.search);
  const albumId = urlParams.get('id');
  idDestaque = albumId;

  const url = `${urlBase}/highlights`;
  const data = { albumId: parseInt(albumId) };
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  fetch(url, request).then((response) => {
    console.log(response);
  });
  return true;
}

// Função para remover um destaque
// Ao desmarmarcar o checkbox, essa função é chamada para remover um destaque
// dando um DELETE na API e usando o id do destaque que foi salvo na variável idDestaque
function removeHighligth() {
  const url = `${urlBase}/highlights/${idDestaque}`;
  const request = { method: "DELETE" };
  fetch(url, request).then((response) => {
    console.log(response);
  });
  return true;
}

// #######################################
// Funções para pegar os detalhes do álbum


async function fetchCardDetails(albumId) {
  const url = `${urlBase}/detalhes?albumId=${albumId}`;
  console.log(url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}


function renderCardsDetails(album){
  const cardDiv = document.createElement('div');
  cardDiv.className = 'col-sm-6 col-md-3 d-flex justify-content-center p-2';

  cardDiv.innerHTML = `
  <div class="card mb-2" style="width:380px;">
      <img src="${album.cover}" class="card-img-top object-fit-cover" alt="..." height="300px">
      <div class="card-body position-relative">
          <h5 class="card-title">${album.name}</h5>
          <p class="card-text">${album.description}</p>
          <br>
          <div class="position-absolute bottom-0 end-0">
            <button type="button" class="btn btn-light align-end mb-2 mx-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              Detalhes
            </button>
          </div>
      </div>
  </div>
  `;

  return cardDiv;
}


async function renderCardsOneByOne(data){
  const cardContainer = document.getElementById('card-container-detail');

  for(let i=0; i<= data.length; i++){
      const card = renderCardsDetails(data[i]); 
      cardContainer.appendChild(card); // aqui, a variavel cardContainer adiciona aquele html de card da função renderCard com as informações vindas do json no html do index
  }  
}


async function renderCardsDetalhes() {
  const urlParams = new URLSearchParams(window.location.search);
  const albumId = urlParams.get('id');
  console.log(albumId);

  const album = await fetchCardDetails(albumId);
  console.log(album);
  renderCardsOneByOne(album);
}



// ##############################################
// Funções para inicializar a página
renderDetails();
initiateCheckbox();
renderCardsDetalhes();
