const input = document.getElementById("text-input");
const button = document.getElementById("check-btn");
const result = document.getElementById("result");
const fls1 = document.getElementById("fls1");
const fls2 = document.getElementById("fls2");

const oracionTR = input.addEventListener("input", inpTR => input.value === "" ? result.innerText = "" : checker(inpTR.target.value));
const oracionTRB = button.addEventListener("click", () => input.value === "" ? alertFunction() : checker(input.value));

const alertFunction = () => {
    alert("Por favor ingrese un valor.");
    result.innerText = "";
}

function checker(str) {
    const regex = /[a-z0-9]+/gi;
    const strCl = str.toLowerCase().match(regex).map(elem => elem.split("")).join(",").split(",");
    const strReg = strCl.join("");
    const strRev = strCl.reverse().join("");
    if (strReg === strRev) {
        fls1.appendChild(result);
        result.innerText = `${str}`;
    } else {
        fls2.appendChild(result);
        result.innerText = `${str}`;
    }
}