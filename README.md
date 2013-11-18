# BeagleBone Demo for Pi Masters Meetup

This project contains the source code and schematics for the
BeagleBone demo at the Pi Masters meetup. It shows how to
integrate a simple circuit of LEDs and a push button switch
with BoneScript and make it accessible via a web page. This
is a simplified and somewhat modified version of Roland Groeneveld's
BoneScript-SocketIO demo that can be found at
https://github.com/lgxlogic/BoneScript-SocketIO. His version
has additional functionality that may be of interest.

# Installing

See the fritzing folder for pictures of the schematic and a
breadboard view of the wiring. The Fritzing file is included.

This demo requires Socket.IO to be installed on the BeagleBone.
To install it, log into the BeagleBone and run:

    $ cd /var/lib/cloud9
    $ npm install socket.io

Next, install the source code from this project onto the BeagleBone.
The easiest way is probably using git by running the following:

    $ cd /var/lib/cloud9
    $ git clone https://github.com/fhunleth/pimasters-bbb-demo.git

# Running

To run, load up the Cloud9 IDE and open pimasters-bbb-demo/server.js.
Click the "run" button. Open up a browser and go to
http://beaglebone:8080/. It takes a few seconds for the web page
to load and render.
