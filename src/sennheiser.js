import dgram from 'dgram';

export class Receiver {
    constructor(IP, name) {
        this.ip = IP;
        this.name = name;
        this.battery = "";
    }
    getBatteryState() {
        const server = dgram.createSocket('udp4');
        server.send('Push 0 100 0\r', 53212, this.ip, (err) => {
        });


        
         
    }

}


/* Sennheiser port 53212 UDP
subscribe command : Push 60 2000 3\r

https://github.com/bitfocus/companion-module-sennheiser-evolutionwireless/blob/main/src/config.ts

*/