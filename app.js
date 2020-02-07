const operatorRef = document.querySelector('#operator-value')
const listRef = document.querySelector('#list-value')
const fixedNumberRef = document.querySelector('#fixed-number')
const generatedListRef = document.querySelector('#generatedList')

const getBtn = document.querySelector('#get-btn')

getBtn.addEventListener('click', () => {
  // let result = goldenRatioSeries(operator, list)
  let operator = operatorRef.value
  let list = listRef.valueAsNumber
  let fixedNumber = fixedNumberRef.valueAsNumber

  let result = new Operator(operator, list)
  result = result.map( x => x.toFixed(fixedNumber))

  // Then save
  save(result)
  result.forEach(e => addList(e))
})

class Operator {
  constructor(operator, list=1) {
    this.value = 1
    this.golden_ratio = 1.618
    this.list = list 
    this.operator = operator 

    if (this.operator) {
      return this.excute(this.operator)
    }
  }

  excute(operator) {
    let value = this.value 
    let result 
    let numbers = new Array
    for (let i=1; i<=this.list; i++) {
      switch(operator) {
        case '*': result = value *= this.golden_ratio; break;
        case '/': result = value /= this.golden_ratio; break;
        case '+': result = value += this.golden_ratio; break;
        case '-': result = value -= this.golden_ratio; break;
        default: console.error('Your given operator is not supported. Available now: *, /, +, -')
      }
      numbers.push(result)
    }
    return numbers
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

