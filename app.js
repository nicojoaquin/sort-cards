const containerA = document.querySelector('.cards-container-a');
const containerB = document.querySelector('.cards-container-b');
const cardQty = document.querySelector('#card-qty');
const btnDraw = document.querySelector('#draw');
const btnSort = document.querySelector('#sort');

const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

let palos = ["diamonds", "hearts", "clubs", "spades"];
let valores = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Q", "K", "J", "A" ];
let cartas = [];

for (palo of palos) {
  for(valor of valores) {
    cartas.push({valor, palo});
  };
};

let cartasRandom = [];

//Agregamos n cantidad de cartas random al array(n es lo que escribe el usuario en el input)
//Si la carta ya existe en el array, volvemos a llamar la funcion hasta que no exista y se agregue
const getRandomCards = (n) => {
  cartasRandom = [];
  for (let i = 0; i < n; i++) {
    const cartaRandom = cartas[getRandomNum(0, cartas.length)]
    const existe = cartasRandom.find( carta => 
      carta.valor === cartaRandom.valor
      &&
      carta.palo === cartaRandom.palo
    )
    if(existe) {
      return getRandomCards(n)
    };
    cartasRandom.push(cartaRandom)
  }
  displayCards(cartasRandom, containerA);
}

//Listamos las cartas recorriendo el array 
const displayCards = (array, contenedor) => {
  containerB.innerHTML = ''
  contenedor.innerHTML = '';
  array.forEach( ({palo, valor}) => {
    let entity; 
    palo === 'diamonds' ? entity = 'diams' : entity = palo;
    contenedor.innerHTML += 
    `
      <article class="card ${palo}">
        <span>&${entity};</span>
        <p class="card-num">${valor}</p>
        <span class="card-draw">&${entity};</span>
      </article>
    `
  })
}

//Verificamos que el rango que eligio el usuario este entre 4 y 10
//Si esta todo bien obtenemos la cantidad de cartas elegidas
btnDraw.addEventListener('click', () => {
  const qty = cardQty.value;
  if( qty < 4 || qty > 10) {
    return alert('Selecciona entre un rango de 4 - 10');
  }

  getRandomCards(qty);
  cardQty.value = ''
});


const sort  = (arr) => {
  
  let bubbleSortedCards = []

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {  
      if(arr[j].valor > arr[j + 1].valor || ["Q", "A", "J", "K"].includes(arr[j].valor)) {
        const num = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] =  num;
      };
    };
  };
  bubbleSortedCards.push(...arr)
  return bubbleSortedCards
}

btnSort.addEventListener('click', () => {
  const cartasSorted = sort(cartasRandom)
  displayCards(cartasSorted, containerB)
});