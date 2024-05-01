const num = document.getElementById("number");
const convBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

convBtn.addEventListener("click", () => (num.value < 1 || num.value > 3999 || isNaN(parseInt(num.value) || Math.round(num.value) !== num.value)) ? validator(num.value) : arabToRom(num.value));

// ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "M", "MM", "MMM"];

const rom = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X",
    20: "XX",
    30: "XXX",
    40: "XL",
    50: "L",
    60: "LX",
    70: "LXX",
    80: "LXXX",
    90: "XC",
    100: "C",
    200: "CC",
    300: "CCC",
    400: "CD",
    500: "D",
    600: "DC",
    700: "DCC",
    800: "DCCC",
    900: "CM",
    1000: "M",
    2000: "MM",
    3000: "MMM"
}

Object.freeze(rom);

const validator = (inv) => {
    if (inv < 1 && inv !== "") {
        output.innerText = "Ingrese un número mayor o igual a 1.";
        output.style.display = "inline-block";
    } else if (inv > 3999) {
        output.innerText = "Ingrese un número menor o igual a 3999.";
        output.style.display = "inline-block";
    } else if ((isNaN(parseInt(inv)) || Math.round(inv) !== inv)) {
        output.innerText = "Ingrese un valor válido.";
        output.style.display = "inline-block";
    }
}

const mult = (m, n) => {
    for (let i = 0; i <= n; i++) {
        let cont = m * (10 ** n);
        return cont;
    }
}

const converter = (arab) => {
    arab = arab.split("").map(j => parseInt(j)).reverse();
    arab = arab.map((i, j) => mult(i, j)).reverse();
    return arab;
}

const transl = (arab) => {
    for (let i in rom) {
        if (arab == i) {
            return rom[i];
        }
    }
}

const arabToRom = (arab) => {
    arab = converter(arab).map(i => transl(i)).join("");
    output.innerText = arab;
    output.style.display = "inline-block";
}