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
