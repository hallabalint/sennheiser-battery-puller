import { Receiver } from "./src/sennheiser.js";
import * as config from "./config.json" with {type: "json"};
import dgram from 'dgram';

console.log("Loaded config:", config);
const receivers = config.default.receivers.map(r => new Receiver(r.ip, r.name));
console.log(receivers);

const scoket = dgram.createSocket('udp4');

Socket.on('message' , (msg, rinfo) => {
    console.log(`Received message: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

scoket.bind(53212);
//open udp listener to port 53212


receivers.forEach(element => {
    element.getBatteryState();
});

