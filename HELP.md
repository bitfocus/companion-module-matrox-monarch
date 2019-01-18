# Supported Actions

- Start encoders/recorders
- Stop encoders/recorders

# Presets

There are several preset command buttons available for starting/stopping one or
both encoder channels.

# Notes

- Each encoder channel can be configured to either stream or record, so
  starting/stopping from Companion will do whatever the channel is already
  configured to do.

- This doesn't yet do any status checking, so you will need to verify by other
  means that the encoder actually started. For example, if it's configured to
  record but there is no storage attached, it will fail to start but this
  module won't inform you. We hope to fix this soon. :) Until then, be very
  careful.
