const input = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const results = document.getElementById("results-div");

checkBtn.addEventListener("click", () => input.value === "" ? alert("Please provide a phone number") : numValid(input.value));
clearBtn.addEventListener("click", () => input.value = "");
clearBtn.addEventListener("click", () => results.innerText = "");

const regex = /^1{0,1}\s?(\({1}[\d]{3}\){1}|[\d]{3})[\s-]?[\d]{3}[\s-]?[\d]{4}$/;

const numValid = (numb) => regex.test(numb) ? results.innerText = `Valid US number: ${input.value}` : results.innerText = `Invalid US number: ${input.value}`;