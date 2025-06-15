const nombres = [
    "Alan del Canto",
    "Shirley Antezana"
]

function init() {
    const nombresElement = document.getElementById("nombres");
    nombresElement.innerHTML = nombres.map((n) => `<span>${n}</span>`).join("");
}

document.addEventListener("DOMContentLoaded", init);