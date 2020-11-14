const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  //Validar
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (ciudad === "" || pais === "") {
    // Hubo un error
    mostrarError("Ambos campos son obligatorios");
    return;
  }
  //consultar API

  consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
  const alerta = document.querySelector(".bg-red-100");
  if (!alerta) {
    //Crear Alerta
    const alerta = document.createElement("div");

    alerta.classList.add(
      "bt-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounder",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );

    alerta.innerHTML = `
      <strong class="font-bold>Error!</strong>
      <span class="block">${mensaje}</span>
    
    `;
    container.appendChild(alerta);

    //Se elimine Alerta despues de 5sg

    setTimeout(() => {
      alerta.remove();
    }, 5000);
  }
}
function consultarAPI(ciudad, pais) {
  const appID = "660904702c5831aee3adef6c72067bdd";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

  spinner(); //muestra un spinner

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      limpiarHTML(); //limpiar el html
      if (datos.cod == "404") {
        mostrarError("Ciudad no Encontrada");
        return;
      }

      //Imprimir la respuesta en el HTML
      mostrarClima(datos);
    });
}

function mostrarClima(datos) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = datos;
  const centigrados = kelvinACentigrados(temp);
  const max = kelvinACentigrados(temp_max);
  const min = kelvinACentigrados(temp_min);

  const nombreCiudad = document.createElement("p");
  nombreCiudad.textContent = `Clima en ${name}`;
  nombreCiudad.classList.add("font-bold", "text-xl");

  const actual = document.createElement("p");
  actual.innerHTML = ` ${centigrados} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const tempMaxima = document.createElement("p");
  tempMaxima.innerHTML = `Max: ${max} &#8451`;
  tempMaxima.classList.add("text-xl");

  const tempMinima = document.createElement("p");
  tempMinima.innerHTML = `Min: ${min} &#8451`;
  tempMinima.classList.add("text-xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMinima);

  resultado.appendChild(resultadoDiv);
}

function kelvinACentigrados(grados) {
  return parseInt(grados - 273.15);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function spinner() {
  limpiarHTML();
  const divSpinner = document.createElement("div");
  divSpinner.classList.add("sk-fading-circle");

  divSpinner.innerHTML = `
  
  <div class="sk-circle1 sk-child"></div>
  <div class="sk-circle2 sk-child"></div>
  <div class="sk-circle3 sk-child"></div>
  <div class="sk-circle4 sk-child"></div>
  <div class="sk-circle5 sk-child"></div>
  <div class="sk-circle6 sk-child"></div>
  <div class="sk-circle7 sk-child"></div>
  <div class="sk-circle8 sk-child"></div>
  <div class="sk-circle9 sk-child"></div>
  <div class="sk-circle10 sk-child"></div>
  <div class="sk-circle11 sk-child"></div>
  <div class="sk-circle12 sk-child"></div>

  `;
  resultado.appendChild(divSpinner);
}
