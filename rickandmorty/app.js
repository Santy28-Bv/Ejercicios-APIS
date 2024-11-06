const URL_BASE = 'https://rickandmortyapi.com/api';
const container = document.querySelector('.container');
const divCharacters = document.querySelector('.characters');
const divButtons = document.querySelector('.botones');
let page = 1;

function createCard(character) {
    const card = document.createElement('div');
    let htmlObj = `
    <img src='${character.image}'>
    <div>
        <h1 style="color: aqua;">${character.name}</h1>
        <p>${character.status} - ${character.species}</p>
        <p>Última ubicación</p>
        <p>${character.location.name}</p>
        <p>Primera Aparición</p>
        <p>UTT</p>
    </div>
    `;
    card.innerHTML = htmlObj;
    card.className = 'card';
    return card;
}

function createCards(characters) {
    divCharacters.innerHTML = '';
    characters.forEach(c => {
        divCharacters.appendChild(createCard(c));
    });
}

function createButtons(info) {
    divButtons.innerHTML = '';
    if (info.prev) {
        const btnLeft = document.createElement('button');
        btnLeft.innerText = '<=';
        btnLeft.className = 'btn';
        btnLeft.setAttribute('data-id', page - 1);
        divButtons.appendChild(btnLeft);
    }
    if (info.next) {
        const btnRight = document.createElement('button');
        btnRight.innerText = '=>';
        btnRight.className = 'btn';
        btnRight.setAttribute('data-id', page + 1);
        divButtons.appendChild(btnRight);
    }
}

async function getCharacters(page = 1) {
    try {
        const response = await fetch(URL_BASE + '/character/?page=' + page);
        const data = await response.json();
        const characters = data.results;
        createCards(characters);
        createButtons(data.info);
    } catch (error) {
        console.error("Error al obtener personajes:", error);
    }
}

async function getCharactersByStatus(status) {
    try {
        const response = await fetch(URL_BASE + '/character/?status=' + status);
        const data = await response.json();
        const characters = data.results;
        createCards(characters);
        createButtons(data.info);
    } catch (error) {
        console.error("Error al obtener personajes:", error);
    }
}

getCharacters(page);

divButtons.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        page = parseInt(e.target.getAttribute('data-id'));
        getCharacters(page);
    }
});

document.querySelector('#status').addEventListener('change', e => {
    getCharactersByStatus(e.target.value);
});