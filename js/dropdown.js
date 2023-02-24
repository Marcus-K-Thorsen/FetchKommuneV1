console.log("Jeg er i dropdown.js")

const fruits = []
fruits.push({"id": 1, "name": "æble", "style": "fruit"})
fruits.push({"id": 2, "name": "pære", "style": "fruit"})
fruits.push({"id": 3, "name": "peanut", "style": "nut"})
fruits.push({"id": 4, "name": "appelsin", "style": "fruit"})

console.log(fruits)

const pbFillDropDown = document.getElementById("pbFillDropDown")
const ddFruits = document.getElementById("ddFruits")

function addFruitToDropDown(item) {
    console.log(item)
    const el = document.createElement("option")
    el.textContent = item.name
    el.className = item.style
    ddFruits.appendChild(el)
    //el.value = item.id , puts primary key in value
    el.value = item // puts object in value
}

function fillDropDown() {
    fruits.forEach(addFruitToDropDown)
}

function selectFruit() {
    const selindex = ddFruits.selectedIndex
    const selectedFruit = ddFruits.options[selindex]
    console.log(selindex)
    console.log(selectedFruit)
    console.log(selectedFruit.value)
}

pbFillDropDown.addEventListener('click', fillDropDown)
ddFruits.addEventListener('change', selectFruit)