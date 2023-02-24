console.log("Jeg er i fetchmedlog.js")
const urlKommuner = "https://api.dataforsyningen.dk/kommuner"

function fetchKommuner() {
    console.log("2222 fetch kommune")
    return fetch(urlKommuner).then((response) => {
        console.log("44444 start på json")
        response.json()
    })

}

function actionFetch() {
    console.log("11111 action fetch")
    const kommuner = fetchKommuner()
    console.log("3333 done fetch kommuner")
    console.log(kommuner)
}

const pbFetchKommuner = document.getElementById("pbFetchKommuner")
pbFetchKommuner.addEventListener('click', actionFetch)