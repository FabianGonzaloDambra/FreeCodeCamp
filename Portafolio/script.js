const changeLanguage = document.getElementById(`change-lang`);
const cambiarIdioma = document.getElementById(`cambiar-idioma`);
const fabian = document.getElementById(`fabian`);
const fabianEng = document.getElementById(`fabian-eng`);
const fabianImg = document.getElementById(`fabian-img`);
const aboutMe = [];
for (let i = 0; i < 3; i++) {
    aboutMe[i] = document.getElementById(`about-me-${i + 1}`);
}
const aboutMeE = [];
for (let i = 0; i < 3; i++) {
    aboutMeE[i] = document.getElementById(`about-me-e${i + 1}`);
}

const mas = document.getElementById(`button-mas`);
const more = document.getElementById(`button-more`);


const changeLang = () => {
    const idioma = [];
    for (let i = 1; i < 16; i++) {
        elementSpn = document.querySelectorAll(`.spanish-${i}`);
        Array.prototype.push.apply(idioma, elementSpn);

    }
    const language = [];
    for (let i = 1; i < 16; i++) {
        elementsEng = document.querySelectorAll(`.english-${i}`);
        Array.prototype.push.apply(language, elementsEng);
    }

    if (idioma[0].classList.contains(`spanish-1`)) {
        for (let i = 0; i < 15; i++) {
            idioma[i].classList.add(`english-${i + 1}`);
            idioma[i].classList.remove(`spanish-${i + 1}`);
            language[i].classList.remove(`english-${i + 1}`);
            language[i].classList.add(`spanish-${i + 1}`);
        }
    } else {
        for (let i = 0; i < 15; i++) {
            language[i].classList.remove(`spanish-${i + 1}`);
            language[i].classList.add(`english-${i + 1}`);
            idioma[i].classList.remove(`english-${i + 1}`);
            idioma[i].classList.add(`spanish-${i + 1}`);
        }
    }
}

changeLanguage.addEventListener(`click`, changeLang);
cambiarIdioma.addEventListener(`click`, changeLang);

const showInfo = () => {
    if (changeLanguage.classList.contains(`spanish-1`)) {
        aboutMe.forEach(el => el.style.display = `block`);
        aboutMeE.forEach(el => el.style.display = `none`);
    } else {
        aboutMe.forEach(el => el.style.display = `none`);
        aboutMeE.forEach(el => el.style.display = `block`);
    }
}

const hideInfo = () => {
    aboutMe.forEach(el => el.style.display = `none`);
    aboutMeE.forEach(el => el.style.display = `none`);
}

fabianImg.addEventListener(`mouseenter`, showInfo);
fabianImg.addEventListener(`mouseout`, hideInfo);

const redirectToUrl = () => {
    window.location.href = `https://github.com/FabianGonzaloDambra`;
}

mas.addEventListener(`click`, redirectToUrl);
more.addEventListener(`click`, redirectToUrl);

const showFabian = (text) => {
    let i = 0;
    const interval = setInterval(() => {
        if (text === `Soy Fabian Dambra`) {
            fabian.innerText = text.slice(0, i);
            i++
        }
        else {
            fabianEng.innerText = text.slice(0, i);
            i++
        }
        if (i > text.length) {
            clearInterval(interval);
        };
    }, 200);
}
showFabian(`Soy Fabian Dambra`);
setInterval(() => showFabian(`Soy Fabian Dambra`), 5000);
showFabian(`I'm Fabian Dambra`);
setInterval(() => showFabian(`I'm Fabian Dambra`), 5000)