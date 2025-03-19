const form = document.querySelector("#form-imc");
const imcSpan = document.querySelector("#imc");
const clasificacionSpan = document.querySelector("#clasificacion");
const resultImc = document.querySelector("#result-imc");


function calcularIMC(peso, altura) {
    const imc = peso / (altura * altura);
    return imc;
}

function clasificarIMC(imc) {
    resultImc.classList.remove("text-yellow-500", "text-green-500", "text-orange-500", "text-red-500");
    if (imc < 18.5) {
        clasificacionSpan.textContent = "Bajo peso";
        resultImc.classList.add("text-yellow-500");
        return "Bajo peso";

    } else if (imc < 24.9) {
        clasificacionSpan.textContent = "Peso normal";
        resultImc.classList.add("text-green-500");
        return "Peso normal";

    } else if (imc < 29.9) {
        clasificacionSpan.textContent = "Sobrepeso";
        resultImc.classList.add("text-orange-500");
        return "Sobrepeso";

    } else {
        clasificacionSpan.textContent = "Obesidad";
        resultImc.classList.add("text-red-500");
        return "Obesidad";
    }
}

function mostrarResultados(imc) {
    imcSpan.textContent = parseFloat(imc.toFixed(2));
}

function agregarHistorial(peso, altura, imc, clasificacion) {

    const fecha = new Date().toLocaleDateString();

    const historial = JSON.parse(localStorage.getItem("historial")) || [];

    if (historial.length >= 5) {
        historial.pop();
    }

    const nuevoRegistro = {
        fecha,
        peso,
        altura,
        imc,
        clasificacion
    };
    historial.push(nuevoRegistro);
    localStorage.setItem("historial", JSON.stringify(historial));
}

function mostrarHistorial() {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];
    const historialContainer = document.querySelector("#historial-imc");
    historialContainer.innerHTML = "";
    historial.forEach(registro => {
        const item = document.createElement("li");
        item.classList.add("text-gray-700", "mb-2");
        item.textContent = `Fecha: ${registro.fecha}, Peso: ${registro.peso} kg, Altura: ${registro.altura} m, IMC: ${registro.imc.toFixed(2)}, Clasificación: ${registro.clasificacion}`;
        historialContainer.appendChild(item);
    });
}

form.addEventListener("submit", function (e) {

    const pesoInput = parseFloat(document.querySelector("#peso").value);
    const alturaInput = parseFloat(document.querySelector("#altura").value);

    e.preventDefault()

    const imc = calcularIMC(pesoInput, alturaInput);
    clasificarIMC(imc);
    mostrarResultados(imc);

    agregarHistorial(pesoInput, alturaInput, imc, clasificarIMC(imc));
    mostrarHistorial();
});

document.addEventListener("DOMContentLoaded", mostrarHistorial);