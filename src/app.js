const Gpio = require('pigpio').Gpio
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http, { cors: { origin: '*' }})

const MICRO_SECONDS_PER_CM = 1e6 / 34321

const trigger = new Gpio(18, { mode: Gpio.OUTPUT })
const echo = new Gpio(15, { mode: Gpio.INPUT, alert: true })

trigger.digitalWrite(0)

app.get('/', (req, res) => {
	res.send('Server runnung...')
})

io.on('connection', socket => {
	console.log('New connection')

	const readTemperature = () => {
		let startTick;
	
		echo.on('alert', (level, tick) => {
			if (level == 1) {
				startTick = tick
			} else {
				const endTick = tick
				const diff = (endTick >> 0) - (startTick >> 0)
				const distance = diff / 2 / MICRO_SECONDS_PER_CM
				
				socket.emit('distance', { distance })
				console.log(distance)
			}
		})
	}

	readTemperature()
	setInterval(() => {
		trigger.trigger(10, 1)
	}, 1000)

	socket.on('add note', note => {
			
	})

	socket.on('turn on', data => {
		console.log('Turn on led')
		led.writeSync(1)
		socket.broadcast.emit('new note', data)
	})

	socket.on('turn off', data => {
		console.log('Turn off led')
		led.writeSync(0)
	})

})

http.listen(3000, () => {
	console.log('Server running...')
})