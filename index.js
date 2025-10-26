import { Receiver } from "./src/sennheiser.js";
import * as config from "./config.json" with {type: "json"};
import dgram from 'dgram';

console.log("Loaded config:", config);
const receivers = config.default.receivers.map(r => new Receiver(r.ip, r.name));
console.log(receivers);

const socket = dgram.createSocket('udp4');

socket.on('message' , (msg, rinfo) => {
    let data = msg.toString().split('\r').forEach(e => {
        let row = e.slice(' ');
        if (row[0] == 'Bat') {
            //find rinfo.ip in receivers.ip then add battery data to it
            let receiver = receivers.find(r => r.ip === rinfo.address);
            if (receiver) {
                receiver.battery = row[1];
                console.log(`Receiver ${receiver.name} at IP ${receiver.ip} has battery state: ${row[1]}`);
            
        }
    }})
    console.log(receivers);
});

function pollReceivers() {
    receivers.forEach(receiver => {
        console.log(`Polling receiver ${receiver.name} at IP ${receiver.ip}`);
        receiver.getBatteryState();
    });
}

setInterval(pollReceivers,5000)

socket.bind(53212);
//open udp listener to port 53212




