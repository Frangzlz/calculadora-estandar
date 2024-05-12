const botones = document.querySelectorAll(".btn")
const display = document.getElementById("display")

let valorAntiguo = ""
let idAntiguo = "none"

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    if (boton.id === "c") {
      display.value = "0"
      return
    }

    if (boton.id === "ce") {
      if (display.value.length === 1 || display.value === valorAntiguo) {
        display.value = "0"
      } else {
        display.value = display.value.slice(0, -1)
      }
      return
    }

    if (boton.classList.contains("operador") && display.value == "0") {
      if (boton.id === "restar") {
        display.value = boton.textContent
        return
      }
      display.value = "0"
      return
    }

    if (boton.id === "sumar" || boton.id === "restar") {
      if (display.value.endsWith("+")) {
        return
      }
      if (display.value.endsWith("-")) {
        return
      }
    }
 
    if (boton.id === "multiplicar" || boton.id === "division") {
      if (boton.id === idAntiguo) return

      if (boton.id === "multiplicar" && idAntiguo === "division" && display.value.endsWith("÷")) {
        let valorDisplay = display.value.slice(0, -1)
        valorDisplay += "x"
        display.value = valorDisplay
        idAntiguo = "multiplicar"
        return
      }

      if (boton.id === "division" && idAntiguo === "multiplicar" && display.value.endsWith("x")) {
        let valorDisplay = display.value.slice(0, -1)
        valorDisplay += "÷"
        display.value = valorDisplay
        idAntiguo = "division"
        return
      }

      idAntiguo = boton.id
    }

    if (boton.id !== idAntiguo) {
      idAntiguo = "none"
    }

    try {
      if (boton.classList.contains("igual")) {
        let valorDisplay = display.value.split("")
  
        for (let i = 0; i < valorDisplay.length; i++) {
          if (valorDisplay[i] === "÷") { // Cambiamos el "÷" por "/", para que eval() lo lea
            valorDisplay[i] = "/"
          }
  
          if (valorDisplay[i] === "x") { // Cambiamos el "x" por "*", para que eval() lo lea
            valorDisplay[i] = "*"
          }
        }
  
        const valorDisplayFinal = valorDisplay.join('')
        display.value = eval(valorDisplayFinal)
  
        valorAntiguo = display.value // Guardamos el valor
        idAntiguo = "none" 
        return
      }
    } catch(e) {
      display.value = "Error"
      return
    }

    if (display.value === "0" || display.value === valorAntiguo || display.value === "Error") {
      if (boton.classList.contains("operador")) {
        display.value = "0"
        idAntiguo = "none"
        return
      }
      if (boton.textContent === ".") {
        if (display.value !== "0") {
          display.value = "0."
          return
        }
        display.value += boton.textContent
        return
      }
      display.value = boton.textContent
    } else {
      display.value += boton.textContent
    }
  })
})
