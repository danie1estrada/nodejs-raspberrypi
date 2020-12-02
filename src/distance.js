const Gpio = require('onoff').Gpio

const trigger = new Gpio(18, 'out')
const echo = new Gpio(15, 'in')

setInterval(() => {
	
}, 1000)

process.on('SIGINT', () => {
	trigger.unexport()
	echo.unexport()
})
