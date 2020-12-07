const PORT = process.env.PORT || 4000
const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/html' })
	fs.readFile('index.php', (error, data) => {
		if (error)
		{
			res.writeHead(404)
			res.write('Error: File Not Found')
		} else {
			res.write(data)
		}
		res.end()
	})
})

server.listen(PORT, (error) => {
	if (error)
	{
		console.log('Something went wrong', error)
	} else {
		console.log('Server is listening on port ' + PORT)
	}
})
