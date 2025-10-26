import dgram from 'dgram';

export class Receiver {
    constructor(IP, name) {
        this.ip = IP;
        this.name = name;
        this.battery = "";
    }
    getBatteryState() {
        //send udp to port 53212 command to get battery state Push 0 100 0<CR>
        
        const server = dgram.createSocket('udp4');
        server.send('Push 0 100 0', 53212, this.ip, (err) => {
           
        });
         server.on('message', (msg, rinfo) => {
                console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
            });
    }

}


/* Sennheiser port 53212 UDP
subscribe command : Push 60 2000 3\r

https://github.com/bitfocus/companion-module-sennheiser-evolutionwireless/blob/main/src/config.ts

*/