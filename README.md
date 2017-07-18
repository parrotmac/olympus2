# Olympus2

### A CAN BUS to Socket.io utility written in Node

 * Currently only supports emitting/reading from CAN BUS
 * Designed for use with a CAN to UART adapter
 * Fairly useless by itself
 * Designed to be used with [Coyote](https://github.com/parrotmac/coyote)
 * Data can be displayed with a project I might ~~release~~ rewrite soon.


### Wishlist/Roadmap
(In no particular order)

 * 2-way communication (inject frames onto bus)
 * Filtering
 * HTTP API for exposing metadata (known CAN IDs on bus, baudrate, etc.)

Here's how you use this thing! :+1:

```bash
$ node app.js --help

  Usage: app [options]


  Options:

    -V, --version          output the version number
    -t, --tcp-port         TCP port to start server on
    -p, --port <address>   Serial Port Path/Name
    -b, --baud [baudrate]  Baudrate to open port at [baudrate]
    -d, --demo             Generates super fake n̶e̶w̶s̶ data
    -h, --help             output usage information

```

*Note: `--port` is required if `--demo` isn't specified.*



### License: MIT

```markdown
Copyright (c) 2017 Isaac Parker

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
