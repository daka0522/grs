const operatorRef = document.querySelector('#operator-value')
const quantRef = document.querySelector('#quant-value')
const fixedNumberRef = document.querySelector('#fixed-number')
const generatedListRef = document.querySelector('#generatedList')

const getBtn = document.querySelector('#get-btn')

getBtn.addEventListener('click', () => {
  // let result = goldenRatioSeries(operator, quant)
  let operator = operatorRef.value
  let quant = quantRef.valueAsNumber
  let fixedNumber = fixedNumberRef.valueAsNumber

  let itemArray
  switch (operator) {
    case '*':
      // console.log(new goldenRatioSeries(quant).multiply().map(x => x.toFixed(fixedNumber)));
      itemArray = new goldenRatioSeries(quant).multiply().map(x => x.toFixed(fixedNumber))
      save(itemArray)
      itemArray.forEach(e => addList(e))
      break;
    case '/':
      // console.log(new goldenRatioSeries(quant).divine().map(x => x.toFixed(fixedNumber)));
      itemArray = new goldenRatioSeries(quant).divine().map(x => x.toFixed(fixedNumber))
      save(itemArray)
      itemArray.forEach(e => addList(e))
      // break;
    case '+':
      // console.log(new goldenRatioSeries(quant).add().map(x => x.toFixed(fixedNumber)));
      itemArray = new goldenRatioSeries(quant).add().map(x => x.toFixed(fixedNumber))
      save(itemArray)
      itemArray.forEach(e => addList(e))
      break;
    case '-':
      // console.log(new goldenRatioSeries(quant).subtract().map(x => x.toFixed(fixedNumber)));
      itemArray = new goldenRatioSeries(quant).subtract().map(x => x.toFixed(fixedNumber))
      save(itemArray)
      itemArray.forEach(e => addList(e))
      break;
  }
})

// constructor
function goldenRatioSeries(list = 1) {
  let value = 1
  let golden_ratio = 1.618

  this.multiply = () => {
    let cont = []
    for (i = 1; i <= list; i++) {
      cont.push(value *= golden_ratio)
    }
    return cont
  }
  this.divine = () => {
    let cont = []
    for (i = 1; i <= list; i++) {
      cont.push(value /= golden_ratio)
    }
    return cont
  }
  this.add = () => {
    let cont = []
    for (i = 1; i <= list; i++) {
      cont.push(value += golden_ratio)
    }
    return cont
  }
  this.subtract = () => {
    let cont = []
    for (i = 1; i <= list; i++) {
      cont.push(value -= golden_ratio)
    }
    return cont
  }
}

function addList(item) {

  let li = document.createElement('li')
  li.textContent = item
  generatedListRef.appendChild(li)
}

function save(itemArray) {
  // Sync with storage
  chrome.storage.sync.set( {generatedList: itemArray}, () => {
  })

  // and remove childs 
  while (generatedListRef.firstElementChild) {
    generatedListRef.firstElementChild.remove()
  }
}

function load() {
  chrome.storage.sync.get('generatedList', (result) => {
    console.log('S from load', result['generatedList']);
    result['generatedList'].forEach(e => addList(e))
  })
}

function init() {
  load()
}

init()