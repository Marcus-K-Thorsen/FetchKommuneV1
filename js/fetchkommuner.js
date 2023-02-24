console.log("Jeg er i fetchkommuner.js")

const sov = (ms) => {
    return new Promise(dummyFunction => setTimeout(dummyFunction, ms))
}

const urlKommuner = "https://api.dataforsyningen.dk/kommuner"

function fetchKommuner(url) {
    console.log("fetcher fra url: " + url)
    return fetch(url).then((response) => response.json())
}

let firstKommune = true

function addKommuneToDropDown(kom) {

    const optionElement = document.createElement("option")
    optionElement.textContent = kom.navn
    optionElement.value = kom.kode
    optionElement.kommune = kom
    ddKommuner.appendChild(optionElement)

    if (firstKommune) {
        console.log("TESTER HER")
        console.log(optionElement.kommune)
        firstKommune = false
    }
}

async function fillKommunerToDropDown() {
    await sov(10000).then( async (value) => {
        const kommuner = await fetchKommuner(urlKommuner)
        console.log(kommuner)
        kommuner.forEach(kom => addKommuneToDropDown(kom))
        console.log("It was a succes to fill the dropdown menu with kommuner: " + value)
    }).catch(error => {
        console.log("It was a fail to fill the dropdown menu with kommuner: " + error)
    })

}

function selectKommune() {
    const selectedKommuneIndex = ddKommuner.selectedIndex
    const selectedKommune = ddKommuner.options[selectedKommuneIndex].kommune
    console.log(selectedKommune)
    const atag = document.createElement("a")
    atag.href = selectedKommune.href
    console.log(selectedKommune.href)
    atag.innerHTML = "<br>" + selectedKommune.navn + "<br>"
    divtags.appendChild(atag)
}


const pbFetchKommuner = document.getElementById("pbFetchKommuner")
pbFetchKommuner.addEventListener('click', fillKommunerToDropDown)

const ddKommuner = document.getElementById("ddKommuner")
ddKommuner.addEventListener('change', selectKommune)

const divtags = document.getElementById("divtags")