const searchInput = document.getElementById(`search-input`)
const searchBtn = document.getElementById(`search-button`);
const nameP = document.getElementById(`pokemon-name`);
const idP = document.getElementById(`pokemon-id`);
const sprites = document.getElementById(`sprites`);
const height = document.getElementById(`height`);
const weight = document.getElementById(`weight`);
const types = document.getElementById(`types`);
const hp = document.getElementById(`hp`);
const attack = document.getElementById(`attack`);
const defense = document.getElementById(`defense`);
const specialAttack = document.getElementById(`special-attack`);
const specialDefense = document.getElementById(`special-defense`);
const speed = document.getElementById(`speed`);

searchBtn.addEventListener(`click`, () => {
    clean();
    search();
    });

const typesSpn = {
    "bug": "Bicho",
    "dark": "Siniestro",
    "dragon": "Dragón",
    "electric": "Eléctrico",
    "fighting": "Lucha",
    "fairy": "Hada",
    "fire": "Fuego",
    "flying": "Volador",
    "grass": "Planta",
    "ground": "Tierra",
    "ghost": "Fantasma",
    "ice": "Hielo",
    "normal": "Normal",
    "poison": "Veneno",
    "psychic": "Psíquico",
    "rock": "Roca",
    "steel": "Acero",
    "water": "Agua",
}

const typesSpnInv = (obj) => {
    for (let i in obj) {
        typesSpnInv[obj[i]] = i;
    }
    return typesSpnInv;
}

const clean = () => {
    nameP.innerHTML = ``;
    idP.innerHTML = ``;
    sprites.innerHTML = ``;
    height.innerHTML = ``;
    weight.innerHTML = ``;
    types.innerHTML = ``;
    hp.innerHTML = ``;
    attack.innerHTML = ``;
    defense.innerHTML = ``;
    specialAttack.innerHTML = ``;
    specialDefense.innerHTML = ``;
    speed.innerHTML = ``;
}

const search = () => {
    const searchInp = searchInput.value.toLowerCase();
    const reg = new RegExp(`^${searchInp}$`, "i");
    const urlPoke = `https://pokeapi.co/api/v2/pokemon/${searchInp}`;
    const pokeName = () => {
        fetch(urlPoke).
            then(
                response => response.json()
            )
            .then(
                data => {
                    nameP.innerHTML = `Nombre: <p>${data.forms[0].name.split("")[0].toUpperCase().concat(data.forms[0].name.split("").slice(1).join(""))}</p>`;
                    idP.innerHTML = `Número de la pokedex nacional: <p>${data.id}</p>`;
                    sprites.innerHTML = `
                        <img id="sprite" src="${data.sprites.front_default}">`;
                    height.innerHTML = `Altura: <p>${data.height}</p>`;
                    weight.innerHTML = `Peso: <p>${data.height}</p>`;
                    if (data.types.length === 1) {
                        types.innerHTML = `Tipo: <p>${typesSpn[data.types[0].type.name]}</p>`;
                    } else {
                        types.innerHTML = `Tipos:
                                <p>${typesSpn[data.types[0].type.name]}</p>
                                <p>${typesSpn[data.types[1].type.name]}</p>`
                    }
                    hp.textContent = `HP: ${data.stats[0].base_stat}`;
                    attack.textContent = `Ataque: ${data.stats[1].base_stat}`;
                    defense.textContent = `Defensa: ${data.stats[2].base_stat}`;
                    specialAttack.textContent = `Ataque especial: ${data.stats[3].base_stat}`;
                    specialDefense.textContent = `Defensa especial: ${data.stats[4].base_stat}`;
                    speed.textContent = `Velocidad: ${data.stats[5].base_stat}`;
                })
            .catch(error => console.error(`La solicitud devolvió error`, error));;
    }
    const pokeType = () => {
        const urlType = `https://pokeapi.co/api/v2/type/${typesSpnInv(typesSpn)[searchInp.split("")[0].toUpperCase().concat(searchInp.split("").slice(1).join(""))]}`;
        fetch(urlType)
            .then(response => response.json())
            .then(data => {
                data.pokemon.forEach(el => {
                    nameP.innerHTML += `${el.pokemon.name}
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${el.pokemon.url.split("/")[6]}.png">
            </br>`;
                })
                    .catch(error => console.error(`La solicitud devolvió error`, error));
            })
    }

    const pokeTOF = () => fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1382`)
        .then(response => response.json())
        .then(data => data.results.some(el => el.name === searchInp))
        .catch(error => console.error(`La solicitud devolvió error`, error));
    pokeTOF().then(pokemonExists => {
        if (!Object.values(typesSpn).some(el => reg.test(el)) && !pokemonExists) {
            nameP.innerHTML = `Pokemon no encontrado`;
        }
    });

    if (Object.values(typesSpn).some(el => reg.test(el))) {
        pokeType();
    } else {
        pokeName();
    }
}