import { Receiver } from "./src/sennheiser.js";
import * as config from "./config.json" with {type: "json"};
import dgram from 'dgram';
import { BSS } from "./src/bss.js";

console.log("Loaded config:", config);
const receivers = config.default.receivers.map(r => new Receiver(r.ip, r.name));

const bss = new BSS(config.default.bss, receivers);

const socket = dgram.createSocket('udp4');

socket.on('message' , (msg, rinfo) => {
    let data = msg.toString().split('\r').forEach(e => {
        let row = e.split(' ');
        if (row[0] == 'Bat') {
            //find rinfo.ip in receivers.ip then add battery data to it
            let receiver = receivers.find(r => r.ip === rinfo.address);
            if (receiver) {
                receiver.setBattery(row[1]);
                console.log(`Receiver ${receiver.name} at IP ${receiver.ip} has battery state: ${row[1]}`);
            
        }
    }})
});

function pollReceivers() {
    receivers.forEach(receiver => {
        console.log(`Polling receiver ${receiver.name} at IP ${receiver.ip}`);
        receiver.getBatteryState();
    });
}

setInterval(pollReceivers,5000)

socket.bind(53212)