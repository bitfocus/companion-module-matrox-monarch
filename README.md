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
