const socket = io()

const urlParams = new URLSearchParams(window.location.search)
const portParam = urlParams.get('port')

socket.emit('connectPort', portParam)

const buttonStart = document.getElementById('button-start')
const buttonPause = document.getElementById('button-pause')
const buttonReset = document.getElementById('button-reset')

const countShort = document.getElementById('count-short')
const countMedium = document.getElementById('count-medium')
const countTall = document.getElementById('count-tall')

buttonStart.addEventListener('click', (e) => {
  socket.emit('controlButton', '1')
})

buttonPause.addEventListener('click', (e) => {
  socket.emit('controlButton', '0')
})

buttonReset.addEventListener('click', (e) => {
  socket.emit('controlButton', '2')
  countShort.innerHTML = 0
  countMedium.innerHTML = 0
  countTall.innerHTML = 0
})

socket.on('fromSerial', (line) => {
  let trimLine = line.trim()
  if (trimLine === 's') {
    let currentValue = Number(countShort.textContent)
    currentValue += 1
    countShort.innerHTML = currentValue
  } else if (trimLine === 'm') {
    let currentValue = Number(countMedium.textContent)
    currentValue += 1
    countMedium.innerHTML = currentValue
  } else if (trimLine === 't') {
    let currentValue = Number(countTall.textContent)
    currentValue += 1
    countTall.innerHTML = currentValue
  }
})
