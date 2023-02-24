
const sov = (ms) => {
    return new Promise(dummyFunction => setTimeout(dummyFunction, ms))
}



async function doSomethingAsync() {
    console.log("1111 før sov")
    await sov(2000)
    console.log("2222 færdig med at sove")
}

console.log("start 1")
doSomethingAsync();
console.log("slut 555")