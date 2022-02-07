const containerA = document.querySelector('.cards-container-a');
const cardQty = document.querySelector('#card-qty');
const btnDraw = document.querySelector('#draw');
const btnSort = document.querySelector('#sort');

const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

let palos = ["diamonds", "hearts", "clubs", "spades"];
let valores = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Q", "K", "J", "A" ];
let cartas = [];

//Iteramos en los arreglos de palos y valores para formar las 52 combinaciones
for (palo of palos) {
  for(valor of valores) {
    cartas.push({valor, palo});
  };
};

let cartasRandom = [];

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
  displayCardsA();
}

const displayCardsA = () => {
  containerA.innerHTML = '';
  cartasRandom.forEach( ({palo, valor}) => {
    let entity; 
    palo === 'diamonds' ? entity = 'diams' : entity = palo;
    containerA.innerHTML += 
    `
      <article class="card ${palo}">
        <span>&${entity};</span>
        <p class="card-num">${valor}</p>
        <span class="card-draw">&${entity};</span>
      </article>
    `
  })
}

btnDraw.addEventListener('click', () => {
  const qty = cardQty.value;
  if( qty < 4 || qty > 10) {
    return alert('Selecciona entre un rango de 4 - 10');
  }

  getRandomCards(qty);
  cardQty.value = ''
});


