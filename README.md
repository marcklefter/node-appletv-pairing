# node-appletv-pairing
Device authentication with Apple TV in Node. 

## Overview
This library allows for pairing your host computer with an Apple TV (required since iOS 10.2). The pairing is performed
once and verified upon each subsequent session with the 
Apple TV.

Run it as follows:

    node index.js -a <Apple TV IP address>

If pairing has not been performed, you'll have the enter PIN code displayed by the Apple TV. The pairing information 
will be stored in the file `atv.json` in the project directory.

You may now enter the commands **play** for playing a sample video, **stop** to stop playback or **exit** to quit the
session.