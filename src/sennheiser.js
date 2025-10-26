import dgram from 'dgram';
import { EventEmitter } from 'node:events';

export class Receiver {
    constructor(IP, name) {
        this.ip = IP;
        this.name = name;
        this.battery = '?';
        this.invalidator = null; 
        this.batteryChanged = new EventEmitter();
    }

    resetBattery() {
        this.battery = '?';
        clearInterval(this.invalidator);
        this.invalidator = null;
        this.batteryChanged.emit(this.battery);
    }
    setBattery(value) {
        this.battery = value;
        clearInterval(this.invalidator);
        this.invalidator = setInterval(this.resetBattery, 60000);
        this.batteryChanged.emit(change);
    }
    getBatteryState() {
        const server = dgram.createSocket('udp4');
        server.send('Push 0 100 0\r', 53212, this.ip, (err) => {
            console.log(err);
            
        });
        server.close();

    }
}

/* Sennheiser port 53212 UDP
subscribe command : Push 60 2000 3\r

https://github.com/bitfocus/companion-module-sennheiser-evolutionwireless/blob/main/src/config.ts

*/