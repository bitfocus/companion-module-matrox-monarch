# companion-module-matrox-monarch

A [BitFocus Companion](https://bitfocus.io/companion/) module for interacting
with Matrox Monarch stream encoder/recorder devices.

This module supports the following devices:

- Matrox Monarch HD
- Matrox Monarch HDX
- Matrox Monarch LCS
- Datavideo NVS-30

## Supported Actions

- Start encoders/recorders
- Stop encoders/recorders
- LCS: Set Dynamic Output option

## Variables & Polling

This module supports polling the GetStatus endpoint, and save the response to module-variables. Polling can be set to various options.

## Development

### Mock Monarch

> This mocking stub may not apply to all the different Monarch models.

To enable basic testing without an actual device, there is a basic HTTP server
that mocks out some of the device API. Right now it just responds to every
request with a sample response taken from the device after a "stop encoder"
call. We can add to this in the future to respond appropriately to different
calls.

It uses the device defaults for auth (HTTP basic auth: `admin`/`admin`) and
listens on port 80. Start it (after installing dev dependencies) like so:

```
node mock-monarch.js
```

And you'll see:

```bash
$ node mock-monarch.js
Mock Monarch is listening on 80
Received request: /Monarch/syncconnect/sdk.aspx?command=StartEncoder1
```

### Output of the GetStatus Endpoint

These are the different kind of output that the GetStatus command returns, based on the selected device model

```
HD
RECORD: READY, STREAM:RTMP,READY, NAME:DEVICE1
RECORD: ON, STREAM:RTSP,READY, NAME:DEVICE2
RECORD: READY, STREAM:DISABLED,DISABLED, NAME:DEVICE4

HDX
ENC1:RECORD,READY, ENC2:RTMP,READY, NAME:DEVICE1
ENC1:RECORD,READY, ENC2:NONE,DISABLED, NAME:DEVICE3
ENC1:RECORD,ON, ENC2:RTSP,READY, NAME:DEVICE2

LCS
ENC1:RECORD,READY,ENC2:RTMP,READY,FILETRANSFER:ON,NAME:DEVICE1
ENC1:RECORD,ON,ENC2:RTSP,READY,FILETRANSFER:OFF,NAME:DEVICE2
ENC1:RECORD,READY, ENC2:NONE,DISABLED,FILETRANSFER:OFF,NAME:DEVICE3

NVS-30
RECORD:READY,STREAM:RTMP,READY,NAME:NVS-30
RECORD:READY,STREAM:RTMP,ON,NAME:NVS-30
RECORD:ON,STREAM:RTMP,ON,NAME:NVS-30
RECORD:READY,STREAM:RTMP,ON,NAME:NVS-30
```
