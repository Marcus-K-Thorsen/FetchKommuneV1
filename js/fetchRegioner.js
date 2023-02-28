console.log("Jeg er inde i fetchRegioner.js")

const urlRegioner = "https://api.dataforsyningen.dk/regioner"
const urlKommuner = "https://api.dataforsyningen.dk/kommuner"

function fetchURL(url) {
    console.log("Fetcher fra url: " + url)
    return fetch(url).then((response) => response.json())
}

function addRegionToDropDown(region) {
    const optionElement = document.createElement("option")
    optionElement.region = region
    optionElement.textContent = region.navn
    optionElement.value = region.kode
    ddRegioner.appendChild(optionElement)
}


async function fillRegionerToDropDown() {
    console.log("udfører: fillRegionerToDropDown() og fylder drop down med regioner")
    if (ddRegioner.options.length > 0) {
        console.log("Der er: " + ddRegioner.options.length + ", altså flere end 0 regioner i drop down, så resetter page")
        resetPage()
    } else {
        console.log("Der var 0 regioner, så henter alle regioner")
        const regioner = await fetchURL(urlRegioner)
        console.log("Har hentet regioner:")
        console.log(regioner)
        regioner.forEach(region => addRegionToDropDown(region))
        console.log("Har added alle regioner til drop down, via forEach(region => addRegionToDropDown(region))")
        pbFetchRegioner.innerText = "Fjern Regioner"
        console.log("Ændrede den indre tekst i knappen: pbFetchRegioner til at være Fjern Regioner")
    }

}

function addKommuneToRegionsDropDown(kommune, region) {
    if (isKommuneInRegion(kommune, region)) {
        const kommuneOptionElement = document.createElement("option")
        kommuneOptionElement.kommune = kommune
        kommuneOptionElement.textContent = kommune.navn
        kommuneOptionElement.value = kommune.kode
        if (document.getElementById("ddKommuner") !== null) {
            document.getElementById("ddKommuner").appendChild(kommuneOptionElement)

        } else {
            console.log("Det var ikke muligt for addKommuneToDropDown(kommune) and finde et element med ID'et: ddKommuner")
        }
    }

}

async function fillKommunerToDropDown(region) {
    console.log("udfører: fillKommunerToDropDown(region) og fylder drop down med kommuner, som tilhører en valgt region")
    const ddKommuner = document.getElementById("ddKommuner")
    if (ddKommuner !== null) {
        console.log("Drop Down menuen med ID'et: ddKommuner eksisterer da det ikke giver null når vi henter det via dets ID")
        const kommuner = await fetchURL(urlKommuner)
        console.log("Har brugt fetchURL(urlKommuner) til at hente alle kommuner:")
        console.log(kommuner)
        if (ddKommuner.options.length === 0) {
            console.log("Der var 0 kommuner i ddKommuner drop down menuen allerede, så vil lægge hver kommune i DD'en der tilhører den valgte region:")
            console.log(region)
            kommuner.forEach(kommune => addKommuneToRegionsDropDown(kommune, region))
            console.log("Har nu lagt alle de tilhørende kommuner til den valgte region i drop down menuen: ddKommuner")
        } else {
            console.log("Der er: " + ddKommuner.options.length + ", altså flere end 0, så sætter den indre HTML i ddKommuner drop down menu til at være = \"\" - Dette burde fjerne alle options for kommuner")
            ddKommuner.innerHTML = ""
            console.log("Genkalder metoden, som vi allerede er i, fillKommunerToDropDown(region), for den valgte region:")
            console.log(region)
            await fillKommunerToDropDown(region)
            console.log("Har nu genfyldt drop down menuen for kommuner til den valgte region:")
            console.log(region)
        }

    } else {
        console.log("document.getElementById(\"ddKommuner\") var null, async function fillKommunerToDropDown(region) blev ikke udført for den valgte region:")
        console.log(region)
    }

}

function isKommuneInRegion(kommune, region) {
    return kommune.region.kode === region.kode
}

function resetPage() {
    console.log("Metoden resetPage() kaldes og vil:")
    pbFetchRegioner.innerText = "Hent Regioner"
    console.log("1. ændre knappen pbFetchRegioner.innerText til at være: Hent Regioner")
    const regions = ddRegioner.options
    console.log("2. finder en liste af alle de options af regioner der er i drop down menuen ddRegioner:")
    console.log(regions)
    const amountOfRegions = regions.length
    console.log("3. finder antallet af regioner der er i drop down menuen, amountOfRegions: " + amountOfRegions)

    console.log("4. laver et for loop, hvor vi går fra amountOfRegion - 1 til 0 og kalder:")
    console.log("4.1 const region = regions.item(i)")
    console.log("4.2 ddRegioner.removeChild(region)")
    for(let i = amountOfRegions - 1; i >= 0; i--) {
        const region = regions.item(i)
        ddRegioner.removeChild(region)
    }
    console.log("5. Har fjernet alle regioner i ddRegioner drop down menuen og vil nu sætte: tableOfSelectedRegion.innerHTML = \"\"")
    tableOfSelectedRegion.innerHTML = ""
    console.log("6. Sætter den indre HTML i table for kommuner til at være intet: tableOfSelectedKommune.innerHTML = \"\"")
    tableOfSelectedKommune.innerHTML = ""
    console.log("Færdig med at resette page")
}

async function selectRegion() {
    tableOfSelectedKommune.innerHTML = ""
    console.log("Funktionen selectRegion() blev kaldt:")
    const selectedRegionIndex = ddRegioner.selectedIndex
    console.log("1. finder det valgte regions index via ddRegioner.selectedIndex:")
    console.log(selectedRegionIndex)
    const selectedRegion = ddRegioner.options[selectedRegionIndex].region
    console.log("2. finder den valgte region via ddRegioner.options[selectedRegionIndex].region:")
    console.log(selectedRegion)
    console.log("3. kalder metoden createRegionElement(selectedRegion)")
    await createRegionElement(selectedRegion)
    console.log("Er færdig med at lave et region element til et table af data og selectRegion() er ovre")
}

function selectKommune() {
    console.log("Funktionen selectKommune() blev kaldt:")
    const ddKommuner = document.getElementById("ddKommuner")
    console.log("1. finder drop down elementet via document.getElementById(\"ddKommuner\"):")
    console.log(ddKommuner)
    if (ddKommuner !== null) {
        console.log("2. laver en if og ddKommuner var ikke null")
        const selectedKommuneIndex = ddKommuner.selectedIndex
        console.log("3. finder det valgte kommunes index via ddKommuner.selectedIndex:")
        console.log(selectedKommuneIndex)
        const selectedKommune = ddKommuner.options[selectedKommuneIndex].kommune
        console.log("4. finder den valgte kommune via ddKommuner.options[selectedKommuneIndex].kommune:")
        console.log(selectedKommune)
        console.log("5. kalder metoden createKommuneElement(selectedKommune)")
        createKommuneElement(selectedKommune)
        console.log("Er færdig med at lave et kommune element til table af data og selectKommune() er ovre")
    } else {
        console.log("ddKommuner var null og det slutter selectKommune()")
    }

}

async function createRegionElement(region) {
    console.log("Metoden createRegionElement(region) er blevet kaldt for region:")
    console.log(region)
    console.log("1. Laver en let regionTable variable og sætter den ikke til noget")
    let regionTable
    console.log("2. Laver en const htmlTable variable og sætter den til at være:")
    const htmlTable =
        `<tr>` +
            `<th>Navn:</th>` +
            `<th>Kode:</th>` +
            `<th>href:</th>` +
            `<th>Kommuner:</th>` +
        `</tr>` +
        `<tr>` +
            `<td>${region.navn}</td>` +
            `<td>${region.kode}</td>` +
            `<td><a href="${region.href}">JSON link</a></td>` +
            `<td><select id="ddKommuner"></select></td>` +
        `</tr>`;
    console.log(htmlTable)
    console.log("3. Laver en if statement: if (document.getElementById(\"regionTable\") === null)")
    if (document.getElementById("regionTable") === null) {
        console.log("3.1 Der er ikke et element med ID'et regionTable og derfor laver vi et table element via regionTable = document.createElement(\"table\"):")
        regionTable = document.createElement("table")
        console.log(regionTable)
        console.log("3.2 Giver det nye element et id via regionTable.id = ")
        regionTable.id = "regionTable"
        console.log(regionTable.id)
        console.log("3.3 Sætter html kode ind i det nye element via regionTable.innerHTML = htmlTable")
        regionTable.innerHTML = htmlTable
    } else {
        console.log("3.1 Der var et element med ID'et regionTable og derfor finder vi det element via document.getElementById(\"regionTable\"):")
        regionTable = document.getElementById("regionTable")
        console.log(regionTable)
        console.log("3.2 Og så sætter vi den indre html via regionTable.innerHTML = htmlTable")
        regionTable.innerHTML = htmlTable
    }

    console.log("4. Vi appender regionTable til tableOfSelectedRegion via: tableOfSelectedRegion.appendChild(regionTable)")
    console.log("4.1 Pre appending tableOfSelectedRegion:")
    console.log(tableOfSelectedRegion)
    console.log("4.2 Pre appending regionTable:")
    console.log(regionTable)
    tableOfSelectedRegion.appendChild(regionTable)
    console.log("4.3 pro appending tableOfSelectedRegion:")
    console.log(tableOfSelectedRegion)
    console.log("4.4 Pro appending regionTable:")
    console.log(regionTable)
    console.log("5. giver kommune drop down menuen evnen til at vise den valgte kommune via: document.getElementById(\"ddKommuner\").addEventListener('change', selectKommune)")
    document.getElementById("ddKommuner").addEventListener('change', selectKommune)
    console.log("6. Kalder await fillKommunerToDropDown(region) med region:")
    console.log(region)
    await fillKommunerToDropDown(region)
    console.log("Har nu fyldt kommuner i regions tables drop down menu og metoden createRegionElement(region) er ovre")
}

function createKommuneElement(kommune) {
    console.log("Metoden createKommuneElement(kommune) er blevet kaldt for kommune:")
    console.log(kommune)
    console.log("1. Finder drop down menu elementet ddKommuner via document.getElementById(\"ddKommuner\")")
    const ddKommuner = document.getElementById("ddKommuner")
    console.log("2. Laver en if statement: if (ddKommuner !== null)")
    if (ddKommuner !== null) {
        console.log("3. der eksisterer en ddKommuner:")
        console.log(ddKommuner)
        console.log("4. Laver en let kommuneTable variable og sætter den ikke til at være noget")
        let kommuneTable
        console.log("5. Laver en const htmlTable og sætter den til at være:")
        const htmlTable =
            `<tr>` +
            `<th>Navn:</th>` +
            `<th>Kode:</th>` +
            `<th>href:</th>` +
            `<th>Region Kode:</th>` +
            `</tr>` +
            `<tr>` +
            `<td>${kommune.navn}</td>` +
            `<td>${kommune.kode}</td>` +
            `<td><a href="${kommune.href}">JSON link</a></td>` +
            `<td>${kommune.region.kode}</td>` +
            `</tr>`;
        console.log(htmlTable)
        console.log("6. laver en if statement: if (document.getElementById(\"kommuneTable\") === null)")
        if (document.getElementById("kommuneTable") === null) {
            console.log("6.1 der er ikke noget element med ID'et kommuneTable, så skaber et via kommuneTable = document.createElement(\"table\"):")
            kommuneTable = document.createElement("table")
            console.log(kommuneTable)
            console.log("6.2 giver det nye element et id via kommuneTable.id = ")
            kommuneTable.id = "kommuneTable"
            console.log(kommuneTable.id)
            console.log("6.3 sætter den indre html i det nye element via kommuneTable.innerHTML = htmlTable")
            kommuneTable.innerHTML = htmlTable
        } else {
            console.log("6.1 der eksisterer et element med ID'et kommuneTable, finder det via dets ID kommuneTable = document.getElementById(\"kommuneTable\"):")
            kommuneTable = document.getElementById("kommuneTable")
            console.log(kommuneTable)
            console.log("6.2 sætter den indre html til det fundne element via kommuneTable.innerHTML = htmlTable")
            kommuneTable.innerHTML = htmlTable
        }

        console.log("7. Vi appender kommuneTable til tableOfSelectedKommune via: tableOfSelectedKommune.appendChild(kommuneTable)")
        console.log("7.1 Pre appending tableOfSelectedKommune:")
        console.log(tableOfSelectedKommune)
        console.log("7.2 Pre appending kommuneTable:")
        console.log(kommuneTable)
        tableOfSelectedKommune.appendChild(kommuneTable)
        console.log("7.3 Pro appending tableOfSelectedKommune:")
        console.log(tableOfSelectedKommune)
        console.log("7.4 Pro appending kommuneTable:")
        console.log(kommuneTable)
        console.log("Nu er table af den valgte kommune sat til dokumentet og metoden createKommuneElement(kommune) er ovre")
    } else {
        console.log("Der er intet element med ID'et ddKommuner og metoden createKommuneElement(kommune) er ovre med det samme")
    }
}




const pbFetchRegioner = document.getElementById("pbFetchRegioner")
pbFetchRegioner.addEventListener('click', fillRegionerToDropDown)

const ddRegioner = document.getElementById("ddRegioner")
ddRegioner.addEventListener('change', selectRegion)


const tableOfSelectedRegion = document.getElementById("tableOfSelectedRegion")
const tableOfSelectedKommune = document.getElementById("tableOfSelectedKommune")