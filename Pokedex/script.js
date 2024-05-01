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

searchBtn.addEventListener(`click`, () => search());

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

const search = () => {
    const searchInp = searchInput.value.toLowerCase();
    fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon`)
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return response.json();
        })
        .then(data => {
            const pokeName = data.results.find(p => p.name === searchInp);
            const pokeId = data.results.find(p => p.id === parseInt(searchInp));
            const pokemon = (pokeNameOrId) => {
                const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokeNameOrId}`;
                fetch(url).
                    then(response => response.json()).
                    then(data => {
                        const upper = data.name.split(``)[0].toUpperCase().concat(data.name.split(``).slice(1).join(``));
                        nameP.textContent = '';
                        idP.textContent = '';
                        height.textContent = '';
                        weight.textContent = '';
                        types.textContent = '';
                        hp.textContent = '';
                        attack.textContent = '';
                        defense.textContent = '';
                        specialAttack.textContent = '';
                        specialDefense.textContent = '';
                        speed.textContent = '';
                        nameP.innerHTML += `Nombre: <p>${upper}</p>`;
                        idP.innerHTML += `Número de la pokedex nacional: <p>${data.id}</p>`;
                        sprites.innerHTML = `
                        <img id="sprite" src="${data.sprites.front_default}">`;
                        height.innerHTML += `Altura: <p>${data.height}</p>`;
                        weight.innerHTML += `Peso: <p>${data.height}</p>`;
                        if (data.types.length === 1) {
                            types.innerHTML += `Tipo: <p>${typesSpn[data.types[0].type.name]}</p>`;
                        } else {
                            types.innerHTML += `Tipos:
                                <p>${typesSpn[data.types[0].type.name]}</p>
                                <p>${typesSpn[data.types[1].type.name]}</p>`
                        }
                        hp.textContent += data.stats[0].base_stat;
                        attack.textContent += data.stats[1].base_stat;
                        defense.textContent += data.stats[2].base_stat;
                        specialAttack.textContent += data.stats[3].base_stat;
                        specialDefense.textContent += data.stats[4].base_stat;
                        speed.textContent += data.stats[5].base_stat;
                    })
            }
            if (!pokeName && !pokeId) {
                alert(`Pokemon not found`);
            } else {
                if (pokeId) {
                    pokemon(pokeId.id)
                } else {
                    pokemon(pokeName.name)
                }
                
            }
        })
        .catch(error => {
            console.error('Ocurrió un error:', error);
        });
}