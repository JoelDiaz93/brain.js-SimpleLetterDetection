const a = character(
  ".#####." +
    "#.....#" +
    "#.....#" +
    "#######" +
    "#.....#" +
    "#.....#" +
    "#.....#"
);
const b = character(
  "######." +
    "#.....#" +
    "#.....#" +
    "######." +
    "#.....#" +
    "#.....#" +
    "######."
);
const c = character(
  "#######" +
    "#......" +
    "#......" +
    "#......" +
    "#......" +
    "#......" +
    "#######"
);
const d = character(
  "######." +
    "#.....#" +
    "#.....#" +
    "#.....#" +
    "#.....#" +
    "#.....#" +
    "######."
);

/**
 * Learn the letters A through C.
 */
const net = new brain.NeuralNetwork();
net.train(
  [
    {
      input: a,
      output: {
        a: 1,
      },
    },
    {
      input: b,
      output: {
        b: 1,
      },
    },
    {
      input: c,
      output: {
        c: 1,
      },
    },
    {
      input: d,
      output: {
        d: 1,
      },
    },
  ],
  {
    log: (detail) => console.log(detail),
  }
);

/**
 * Predict the letter A, even with a pixel off.
 */
const result = brain.likely(
  character(
    ".#####." +
      "#.....#" +
      "#.....#" +
      "###.###" +
      "#.....#" +
      "#.....#" +
      "#.....#"
  ),
  net
);

console.log(result); // 'a'

/**
 * Turn the # into 1s and . into 0s. for whole string
 * @param string
 * @returns {Array}
 */
function character(string) {
  return string.trim().split("").map(integer);
}

/**
 * Return 0 or 1 for '#'
 * @param character
 * @returns {number}
 */
function integer(character) {
  if ("#" === character) return 1;
  return 0;
}

//Funcion que permite leer y detectar la letra que se ingreso en el textarea
function detectLetter() {
  //Guardamos el valor del textarea en letter, eliminando saltos en linea
  let letter = document
    .getElementById("letter")
    .value.replace(/\r?\n|\r/gm, "")
    .trim();
  //Eliminamos + de toda la cadena
  letter = letter.replace(/\+/gm, "").trim();
  //Eliminamos " de toda la cadena
  letter = letter.replace(/\"/gm, "").trim();
  //Eliminamos todos los espacios en blanco
  letter = letter.replace(/ /gm, "").trim();
  //Detectamos la letra que hemos colocado en el textarea
  let end = "La letra es: " + brain.likely(character(letter), net);
  console.log(end);
  //Enviamos el valor de la letra detectada
  document.getElementById("detect").innerHTML = end;
  return end;
}
