# companion-module-matrox-monarch

A [BitFocus Companion](https://bitfocus.io/companion/) module for interacting
with Matrox Monarch H.264 stream encoder/recorder devices.

## Supported Actions

- Start encoders/recorders
- Stop encoders/recorders

## To-Do

- Parse API response and log whether encoder successfully started/stopped, or
  better yet, update the UI.

- Realtime feedback of encoder status (stopped, running), via polling the
  status API. Unfortunately polling is the only option; this is how the Monarch
  device's stock web interface works too.

## Development

### Mock Monarch

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

RECORD: READY, STREAM:RTMP,READY, NAME:DEVICE1
RECORD: ON, STREAM:RTSP,READY, NAME:DEVICE2
RECORD: READY, STREAM:DISABLED,DISABLED, NAME:DEVICE4

ENC1:RECORD,READY, ENC2:RTMP,READY, NAME:DEVICE1
ENC1:RECORD,READY, ENC2:NONE,DISABLED, NAME:DEVICE3
ENC1:RECORD,ON, ENC2:RTSP,READY, NAME:DEVICE2

ENC1:RECORD,READY,ENC2:RTMP,READY,FILETRANSFER:ON,NAME:DEVICE1
ENC1:RECORD,ON,ENC2:RTSP,READY,FILETRANSFER:OFF,NAME:DEVICE2
ENC1:RECORD,READY, ENC2:NONE,DISABLED,FILETRANSFER:OFF,NAME:DEVICE3

NVS-30
RECORD:READY,STREAM:RTMP,READY,NAME:NVS-30
RECORD:READY,STREAM:RTMP,ON,NAME:NVS-30
RECORD:ON,STREAM:RTMP,ON,NAME:NVS-30
RECORD:READY,STREAM:RTMP,ON,NAME:NVS-30

Request is soms 2 seconden, en 1 keertje 9 seconden...
