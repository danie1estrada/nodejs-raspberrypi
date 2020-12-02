console.log('Aaah x2'))
const Gpio = require('pigpio').Gpio

const MICRO_SECONDS_PER_CM = 1e6 / 34321

const trigger = new Gpio(18, { mode: Gpio.OUTPUT })
const echo = new Gpio(15, { mode: Gpio.INPUT, alert: true })

trigger.digitalWrite(0)

const readTemperature = () => {
	let startTick;

	echo.on('alert', (level, tick) => {
		console.log('Aaah)
		if (level == 1) {
			startTick = tick
		} else {
			const endTick = tick
			const diff = (endTick >> 0) - (startTick >> 0)
			console.log(diff / 2 / MICROSECONDS_PER_CM)
		}
	})
}

console.log('Aaaah x2')
readTemperature()

setInterval(() => {
	trigger.trigger(10, 1)
}, 1000)


