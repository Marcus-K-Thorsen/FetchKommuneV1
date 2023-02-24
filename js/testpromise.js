console.log("Start test promise")

function returnPromise() {
    return new Promise(function (resolve, reject) {
        resolve("start of new Promise")
    })
}

function test() {
    return returnPromise().then((value) => {
        console.log("1st then, inside test():" + value)
        return "Hello"
    }).then((value) => {
        console.log("2nd then, inside test():" + value)
        return "World"
    })
}

test().then((value) => {
    console.log("3rd then; Test er færdig vi fortsætter " + value)
})

console.log("Slut med test")