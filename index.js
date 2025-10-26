import { Receiver } from "./src/sennheiser.js";
import * as config from "./config.json" with {type: "json"};
import dgram from 'dgram';

console.log("Loaded config:", config);
const receivers = config.default.receivers.map(r => new Receiver(r.ip, r.name));
console.log(receivers);

const socket = dgram.createSocket('udp4');

socket.on('message' , (msg, rinfo) => {
    console.log(`Received message: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

function pollReceivers() {
    receivers.forEach(receiver => {
        console.log(`Polling receiver ${receiver.name} at IP ${receiver.ip}`);
        receiver.getBatteryState();
    });
}

pollReceivers();

socket.bind(53212);
//open udp listener to port 53212




