# node-appletv-pairing
Device authentication with Apple TV in Node. 

## Overview
This library allows for pairing your host computer with an Apple TV (required since iOS 10.2). The pairing is performed
once and verified upon each subsequent session with the 
Apple TV.

Run it as follows:

    node index.js -a <Apple TV IP address>

If pairing has not been performed, you'll have to enter the PIN code displayed by the Apple TV. The pairing information 
will be stored in the file `atv.json` in the project directory.

You may now enter the following commands:

- **play** play a sample video 
- **stop** stop playback 
- **exit** quit the session
