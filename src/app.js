const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http, { cors: { origin: '*' }})

const Gpio = require('onoff').Gpio

const led = new Gpio(14, 'out')

app.get('/', (req, res) => {
	res.send('Server runnung...')
})

io.on('connection', socket => {
	console.log('New connection')

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

process.on('SIGINT', () => {
	led.writreSync(0)
	led.unexport()
})
