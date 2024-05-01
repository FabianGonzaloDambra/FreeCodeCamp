const changeDue = document.getElementById(`change-due`);
const price = document.getElementById(`price`);
const cash = document.getElementById(`cash`);
const purchaseBtn = document.getElementById(`purchase-btn`);
const cID = document.getElementById(`cid`);
const abierta = document.getElementById(`img1`);
const cerrada = document.getElementById(`img2`);

let cid;
let change;

const money = {
    Penny: 0.01,
    Nickel: 0.05,
    Dime: 0.1,
    Quarter: 0.25,
    One: 1,
    Five: 5,
    Ten: 10,
    Twenty: 20,
    Hundred: 100,
}

const numb = {
    Penny: 0,
    Nickel: 1,
    Dime: 2,
    Quarter: 3,
    One: 4,
    Five: 5,
    Ten: 6,
    Twenty: 7,
    Hundred: 8,
}

for (let i in money) {
    let obj = {};
    cID.innerHTML += `
        ${obj[i] = `<div><input id="${i}" placeholder="${i}" type="number" min="0" value="0" step=${money[i]}>`}${i}`;
}

const cidTras = (cid) => {
    let cidT = [];
    for (let i in cid) {
        cidT.push(cid[i][1]);
    }
    return cidT.reduce((a, b) => a + b, 0);
}

purchaseBtn.addEventListener(`keyup`, (e) => {
    console.log(e.key);
    if (e.key === `Enter`) {
        comp();
    }
});
purchaseBtn.addEventListener(`keyup`, (e) => {
    if (e.key === `Enter`) {
        anim();
    }
});
purchaseBtn.addEventListener(`click`, () => comp());
purchaseBtn.addEventListener(`click`, () => anim());


const anim = () => {
    if (cerrada.style.display === "flex") {
        cerrada.style.display = `none`;
        abierta.style.display = `flex`;
    } else {
        cerrada.style.display = `flex`;
        abierta.style.display = `none`;
    }
}
const comp = () => {
    let arr = [];
    let ciD;
    change = parseFloat((cash.value - price.value).toFixed(2));
    for (let i in money) {
        let obj = {};
        cid = {};
        obj[i] = document.getElementById(`${i}`);
        cid[i] = parseFloat(obj[i].value);
        arr.push([i, cid[i]]);
    }
    ciD = arr;
    if (cash.value < parseFloat(price.value) && cash.value >= 0) {
        alert(`El cliente no tiene el dinero suficiente para comprar el ítem.`);
    } else if (cidTras(ciD) < change || drawer(change, ciD)[`Dif`] !== 0) {
        changeDue.innerHTML = `<p>Estado: FONDOS INSUFICIENTES</p>`;
    } else if (change === 0) {
        changeDue.innerHTML = `<p>No hay cambio porque el cliente pagó con el dinero exacto.</p>`;
    } else if (cidTras(ciD) === change) {
        let obj = {};
        changeDue.innerHTML =
            `<p>Estado: CERRADO</p>`;
            for (let el in drawer(change, ciD)) {
                obj[el] = drawer(change, ciD)[el];
            }
            delete obj["Dif"];
            for (let el in obj) {
                changeDue.innerHTML += `<li>
            ${el}:
            ${obj[el]}$</li>`;
            }
            for (let i in numb) {
                let map = {};
                cid = {};
                map[i] = document.getElementById(`${i}`);
                if (update(ciD, obj)[numb[i]] >= 0) {
                    map[i].value = update(ciD, obj)[numb[i]];
                }
            }
        } else {
        let obj = {};
        changeDue.innerHTML =
            `<p>Estado: ABIERTO</p>`;
        for (let el in drawer(change, ciD)) {
            obj[el] = drawer(change, ciD)[el];
        }
        delete obj["Dif"];
        for (let el in obj) {
            changeDue.innerHTML += `<li>
        ${el}:
        ${obj[el]}$</li>`;
        }
        for (let i in numb) {
            let map = {};
            cid = {};
            map[i] = document.getElementById(`${i}`);
            if (update(ciD, obj)[numb[i]] >= 0) {
                map[i].value = update(ciD, obj)[numb[i]];
            }
        }
    }
}

const update = (cid, obj) => {
    let calc = [];
    for (let el in numb) {
        let cal = parseFloat((cid[numb[el]][1] - obj[el]).toFixed(2))
        calc.push(cal);
    }
    return calc;
}

const drawer = (change, cid) => {
    const values = Object.values(money);
    const keys = Object.keys(money);
    let obj = {};
    for (let i = values.length - 1; i >= 0; i--) {
        let div = parseInt(change / values[i]);
        if (change - values[i] < 0) {
            change = change;
        } else if (change - values[i] >= 0 && cid[i][1] >= values[i] * div) {
            change = parseFloat((change - (values[i] * div)).toFixed(2));
            if (cid[i][1] !== 0) {
                obj[keys[i]] = parseFloat((div * values[i]).toFixed(2));
            }
        } else {
            change = parseFloat((change - cid[i][1]).toFixed(2));
            if (cid[i][1] !== 0) {
                obj[keys[i]] = cid[i][1];
            }
        }
    }
    obj[`Dif`] = parseFloat((cash.value - price.value - Object.values(obj).reduce((a, b) => a + b, 0)).toFixed(2));
    return obj;
}