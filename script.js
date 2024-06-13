const numbers = document.querySelectorAll(".number")
const display = document.getElementById("display")
const operators = document.querySelectorAll(".operator")
const clear = document.getElementById("clear")

let count = {
    initCount: "",
    nums: []
}

let finished = false

let clicked = 0

numbers.forEach(number => {
    number.addEventListener("click", (e) => {
        if(finished) {
            count.initCount = ""
            count.nums = []
            clicked = 0
            finished = false
        }
        const num = e.target.id
        count.initCount = count.initCount + num
        updateDisplay(count.initCount)
    })
})

operators.forEach(operator => {
    operator.addEventListener("click", (e) => {
        const op = e.target
        if(op.id === "clear") return
        if(op.id !== "=") {
            removeActiveClass()
            op.classList.add("operator-active")
            
            clicked = clicked + 1
            count.nums.push(parseInt(count.initCount), op.id)
            count.initCount = ""
            updateDisplay(op.innerText)

        } else {
            addNumbers()
            finished = true
            removeActiveClass()
        }
    })
})

clear.addEventListener("click", () => {
    count.initCount = ""
    count.nums = []
    clicked = 0
    finished = false
    updateDisplay("")
})
        
function addNumbers() {
    count.nums.push(parseInt(count.initCount))
    let str = count.nums.toString()
    let newStr = str.split(",").join("")
    updateDisplay(eval(newStr))
}

function removeActiveClass() {
    operators.forEach(operator => {
        operator.classList.remove("operator-active")
    })
}

function updateDisplay(num) {
    return display.innerText = num
}