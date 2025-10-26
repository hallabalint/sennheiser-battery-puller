import dgram from 'dgram';

export class Receiver {
    constructor(IP, name) {
        this.ip = IP;
        this.name = name;
        this.battery = '?';
        this.invalidator = null;
    }

    resetBattery() {
        this.battery = '?';
    }
    setBattery(value) {
        this.battery = value;
        this.invalidator = setInterval(this.resetBattery, 60000);
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