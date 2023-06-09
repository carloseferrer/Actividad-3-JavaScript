// Obtenemos los datos del DOM
var formulariosGenerados = document.getElementById("formularios-generados");
var enviarDatosBtn = document.getElementById("enviar-datos");
var header = document.getElementById("h2-header");

// Arreglos para guardar los datos
var cedulas = [];
var nombres = [];
var notasMatematicas = [];
var notasFisica = [];
var notasProgramacion = [];

// Activamos el onsubmit con la funcion arrow
formulario.addEventListener("submit", (e) => {
  e.preventDefault(); // hacemos que no se envie el formulario
  var cantidadAlumnos = parseInt(
    document.getElementById("cantidad_alumnos").value
  );
  enviarDatosBtn.classList.remove("hidden");
  enviarFormularios(cantidadAlumnos);
});

// Funcion para repetir los formularios n cantidad de veces
enviarFormularios = (cantidadAlumnos) => {
  contadorAlumno = 1;
  formulariosGenerados.innerHTML = "";

  if (cantidadAlumnos == 0) {
    enviarDatosBtn.classList.add("hidden");
    header.classList.add("hidden");
  }

  // Limpiamos los arreglos
  cedulas = [];
  nombres = [];
  notasMatematicas = [];
  notasFisica = [];
  notasProgramacion = [];

  for (let i = 0; i < cantidadAlumnos; i++) {
    var formulario = document.createElement("form");
    var label = document.createElement("label");
    formulario.appendChild(document.createElement("br"));
    label.textContent = `Datos Alumno # ${contadorAlumno++}`;
    formulario.appendChild(label);
   
    // Input de Cedula
    var inputCedula = document.createElement("input");
    var labelCedula = document.createElement("label");
    labelCedula.textContent = `Ingrese la cedula: `;
    formulario.appendChild(labelCedula);
    inputCedula.type = "text";
    inputCedula.name = "cedula";
    inputCedula.placeholder = "Ej 28326446";
    formulario.appendChild(inputCedula);
    formulario.appendChild(document.createElement("br"));
    formulario.appendChild(document.createElement("br"));

    // Input nombre
    var inputNombre = document.createElement("input");
    var labelNombre = document.createElement("label");
    labelNombre.textContent = `Ingrese el Nombre: `;
    formulario.appendChild(labelNombre);
    inputNombre.type = "text";
    inputNombre.placeholder = "Ej Carlos Ferrer";
    inputNombre.required = true;
    inputNombre.pattern = "[a-zA-Z ]+";
    inputNombre.oninvalid =
      "this.setCustomValidity('Solo puedes ingresar letras')";
    inputNombre.oninput = "this.setCustomValidity('')";
    formulario.appendChild(inputNombre);
    formulario.appendChild(document.createElement("br"));
    formulario.appendChild(document.createElement("br"));

    // Input Nota Matematicas
    var inputNotaMate = document.createElement("input");
    var labelNotaMate = document.createElement("label");
    labelNotaMate.textContent = `Ingrese la Nota de Matematicas: `;
    formulario.appendChild(labelNotaMate);
    inputNotaMate.type = "number";
    inputNotaMate.placeholder = "Ej: 20";
    inputNotaMate.required = true;
    inputNotaMate.min = 1;
    inputNotaMate.max = 20;
    formulario.appendChild(inputNotaMate);
    formulario.appendChild(document.createElement("br"));
    formulario.appendChild(document.createElement("br"));

    // Input Nota de Fisica
    var inputNotaFisica = document.createElement("input");
    var labelNotaFisica = document.createElement("label");
    labelNotaFisica.textContent = `Ingrese la Nota de Física: `;
    formulario.appendChild(labelNotaFisica);
    inputNotaFisica.type = "number";
    inputNotaFisica.placeholder = "Ej: 20";
    inputNotaFisica.required = true;
    inputNotaFisica.min = 1;
    inputNotaFisica.max = 20;
    formulario.appendChild(inputNotaFisica);
    formulario.appendChild(document.createElement("br"));
    formulario.appendChild(document.createElement("br"));

    // Input Nota de Programación
    var inputNotaProg = document.createElement("input");
    var labelNotaProg = document.createElement("label");
    labelNotaProg.textContent = `Ingrese la Nota de Programación: `;
    formulario.appendChild(labelNotaProg);
    inputNotaProg.type = "number";
    inputNotaProg.placeholder = "Ej: 20";
    inputNotaProg.required = true;
    inputNotaProg.min = 1;
    inputNotaProg.max = 20;
    formulario.appendChild(inputNotaProg);
    formulario.appendChild(document.createElement("br"));
    // formulario.appendChild(document.createElement("br"));

    formulariosGenerados.appendChild(formulario);

    // Agregar los valores de los inputs a los arreglos correspondientes

    // Valores del input cedula
    inputCedula.addEventListener("input", (e) => {
      cedulas[i] = e.target.value;
    });

    // Valores del input nombre
    inputNombre.addEventListener("input", (e) => {
      nombres[i] = e.target.value;
    });

    // Valores del input nota de matematicas
    inputNotaMate.addEventListener("input", (e) => {
      notasMatematicas[i] = parseInt(e.target.value);
    });

    // Valores del input nota de fisica
    inputNotaFisica.addEventListener("input", (e) => {
      notasFisica[i] = parseInt(e.target.value);
    });

    // Valores del input nota de programacion
    inputNotaProg.addEventListener("input", (e) => {
      notasProgramacion[i] = parseInt(e.target.value);
    });
  }

  // Enviamos los datos como argumento
  enviarDatosBtn.addEventListener("click", () => {
    const emptyFields = [];

    const validateNotes = (notes, subject) => {
      if (notes.length === 0) {
        emptyFields.push(`Notas de ${subject}`);
      } else {
        const invalidNotes = notes.filter((nota) => nota < 1 || nota > 20);
        if (invalidNotes.length > 0) {
          alert(`Las notas de ${subject} deben estar entre 1 y 20.`);
          return false;
        }
      }
      return true;
    };

    if (
      !validateNotes(notasMatematicas, "Matemáticas") ||
      !validateNotes(notasFisica, "Física") ||
      !validateNotes(notasProgramacion, "Programación")
    ) {
      return;
    }

    if (cedulas.length === 0) {
      emptyFields.push("Cédulas");
    }
    if (nombres.length === 0) {
      emptyFields.push("Nombres");
    }

    if (emptyFields.length > 0) {
      alert(`Los siguientes campos están vacíos: ${emptyFields.join(", ")}.`);
    } else {
      header.classList.remove("h2-header");
      realizarCalculos(
        cedulas,
        nombres,
        notasMatematicas,
        notasFisica,
        notasProgramacion
      );
    }
  });
};

// Funcion para calcular la nota maxima
const obtenerNotaMaxima = (notas) => {
  return Math.max(...notas);
};

// Funcion arrow que recibe los datos de los arreglos como parametro
const realizarCalculos = (
  cedula,
  nombre,
  notasMatematicas,
  notasFisica,
  notasProgramacion
) => {
  //Almacenamos todos los valores
  cedulasValores = cedula;
  nombreValores = nombre;
  notasMatematicaValores = notasMatematicas;
  notasFisicaValores = notasFisica;
  notasProgramacionValores = notasProgramacion;

  // Función para calcular el promedio de un arreglo de notas
  const calcularPromedio = (notas) => {
    const totalNotas = notas.length;
    const sumaNotas = notas.reduce((suma, nota) => suma + nota, 0);
    const promedio = sumaNotas / totalNotas;
    return promedio.toFixed(2); // Redondeamos el promedio a 2 decimales
  };

  // Llamamos a la función para obtener los promedios de cada materia
  const promedioMatematicas = calcularPromedio(notasMatematicas);
  const promedioFisica = calcularPromedio(notasFisica);
  const promedioProgramacion = calcularPromedio(notasProgramacion);

  document.getElementById("promedio-matematicas").innerHTML =
    "Promedio de Matemáticas: " + promedioMatematicas;
  document.getElementById("promedio-fisica").innerHTML =
    "Promedio de Física: " + promedioFisica;
  document.getElementById("promedio-programacion").innerHTML =
    "Promedio de Programación: " + promedioProgramacion;

  // Función para contar aprobados
  const contarAprobados = (notas) => {
    let aprobados = 0;
    for (let i = 0; i < notas.length; i++) {
      if (notas[i] >= 10) {
        aprobados++;
      }
    }
    return aprobados;
  };

  const aprobadosMatematicas = contarAprobados(notasMatematicas);
  const aprobadosFisica = contarAprobados(notasFisica);
  const aprobadosProgramacion = contarAprobados(notasProgramacion);

  document.getElementById("aprobados-matematicas").innerHTML =
    "Aprobados en Matemáticas: " + aprobadosMatematicas;
  document.getElementById("aprobados-fisica").innerHTML =
    "Aprobados en Física: " + aprobadosFisica;
  document.getElementById("aprobados-programacion").innerHTML =
    "Aprobados en Programación: " + aprobadosProgramacion;

  //Funcion para contar los aplazados
  const contarAplazados = (notas) => {
    let aplazados = 0;
    for (let i = 0; i < notas.length; i++) {
      if (notas[i] <= 9) {
        aplazados++;
      }
    }
    return aplazados;
  };

  const aplazadosMatematicas = contarAplazados(notasMatematicas);
  const aplazadosFisica = contarAplazados(notasFisica);
  const aplazadosProgramacion = contarAplazados(notasProgramacion);

  document.getElementById("aplazados-matematicas").innerHTML =
    "Aplazados en Matemáticas: " + aplazadosMatematicas;
  document.getElementById("aplazados-fisica").innerHTML =
    "Aplazados en Física: " + aplazadosFisica;
  document.getElementById("aplazados-programacion").innerHTML =
    "Aplazados en Programación: " + aplazadosProgramacion;

  //Funcion para los que aprobaron todas las materias
  const contarAprobadosTodasMaterias = (
    notasMatematicas,
    notasFisica,
    notasProgramacion
  ) => {
    let aprobadosTodasMaterias = 0;
    for (let i = 0; i < notasMatematicas.length; i++) {
      if (
        notasMatematicas[i] >= 10 &&
        notasFisica[i] >= 10 &&
        notasProgramacion[i] >= 10
      ) {
        aprobadosTodasMaterias++;
      }
    }
    return aprobadosTodasMaterias;
  };

  const aprobadosTodasMaterias = contarAprobadosTodasMaterias(
    notasMatematicas,
    notasFisica,
    notasProgramacion
  );

  document.getElementById("aprobados-todas-materias").innerHTML =
    "Aprobados en todas las materias: " + aprobadosTodasMaterias;

  // Funcion para contar los alumnos que aprobaron una sola materia
  const contarAprobadosUnaMateria = (
    notasMatematicas,
    notasFisica,
    notasProgramacion
  ) => {
    let aprobadosUnaMateria = 0;
    for (let i = 0; i < notasMatematicas.length; i++) {
      const aprobadas = [
        notasMatematicas[i] >= 10,
        notasFisica[i] >= 10,
        notasProgramacion[i] >= 10,
      ];
      const totalAprobadas = aprobadas.filter((aprobada) => aprobada).length;
      if (totalAprobadas === 1) {
        aprobadosUnaMateria++;
      }
    }
    return aprobadosUnaMateria;
  };

  const aprobadosUnaMateria = contarAprobadosUnaMateria(
    notasMatematicas,
    notasFisica,
    notasProgramacion
  );

  document.getElementById("aprobados-una-materia").innerHTML =
    "Aprobados en exactamente una materia: " + aprobadosUnaMateria;

  // Funcion para contar los alumnos que aprobaron 2 materias
  const contarAprobadosDosMaterias = (
    notasMatematicas,
    notasFisica,
    notasProgramacion
  ) => {
    let aprobadosDosMaterias = 0;
    for (let i = 0; i < notasMatematicas.length; i++) {
      const aprobadas = [
        notasMatematicas[i] >= 10,
        notasFisica[i] >= 10,
        notasProgramacion[i] >= 10,
      ];
      const totalAprobadas = aprobadas.filter((aprobada) => aprobada).length;
      if (totalAprobadas === 2) {
        aprobadosDosMaterias++;
      }
    }
    return aprobadosDosMaterias;
  };

  const aprobadosDosMaterias = contarAprobadosDosMaterias(
    notasMatematicas,
    notasFisica,
    notasProgramacion
  );
  document.getElementById("aprobados-dos-materias").innerHTML =
    "Aprobados en exactamente dos materias: " + aprobadosDosMaterias;

  // Las notas mas altas en cada materia

  const notaMaximaMatematicas = obtenerNotaMaxima(notasMatematicas);
  const notaMaximaFisica = obtenerNotaMaxima(notasFisica);
  const notaMaximaProgramacion = obtenerNotaMaxima(notasProgramacion);

  document.getElementById("nota-maxima-matematicas").innerHTML =
    "Nota máxima en Matemáticas: " + notaMaximaMatematicas;
  document.getElementById("nota-maxima-fisica").innerHTML =
    "Nota máxima en Fisica: " + notaMaximaFisica;
  document.getElementById("nota-maxima-programacion").innerHTML =
    "Nota máxima en Programacion: " + notaMaximaProgramacion;
};

reiniciarPagina = () => {
    location.reload();
}
