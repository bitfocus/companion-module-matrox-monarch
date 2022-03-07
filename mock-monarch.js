const express = require('express')
const expressBasicAuth = require('express-basic-auth')
const app = express()
const port = 80

const apiPath = '/Monarch/syncconnect/sdk.aspx'
const sampleResponse = `
  <Light>False</Light>
  <ErrorMessage></ErrorMessage>
  <encoder1>False,RTMP</encoder1>
  <encoder2>False,RTMP</encoder2>
  <width>1920</width>
  <height>1080</height>
  <frameRate>60</frameRate>
  <frameRateM>59.94</frameRateM>
  <scanMode>False</scanMode>
  <videoInput>SDI</videoInput>
  <audioRate>48 kHz</audioRate>
  <audioInput>SDI</audioInput>
  <audioPresent>True</audioPresent>
  <fanFault>False</fanFault>
  <tempFault>False</tempFault>
  <CCDigitalPresent>False</CCDigitalPresent>
  <CCAnalogPresent>False</CCAnalogPresent>
`

// Set up HTTP basic auth
app.use(
	expressBasicAuth({
		users: { admin: 'admin' },
	})
)

// Route API command path
app.get(apiPath, (request, response) => {
	console.log(`Received request: ${request.originalUrl}`)
	response.send(sampleResponse)
})

// Start server
app.listen(port, (err) => {
	if (err) {
		return console.log('something bad happened', err)
	}

	console.log(`Mock Monarch is listening on ${port}`)
})
