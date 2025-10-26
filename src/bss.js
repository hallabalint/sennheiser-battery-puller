import net from 'net';

export class BSS {
    constructor(config, receivers) {
        this.ip = config.ip;
        this.receivers = receivers;
        this.mapping = config.mapping;

        this.mapping.forEach(element => {
            let receiver = receivers.find(r => r.name === element.name);
            if (receiver) {
                receiver.batteryChanged.on('change', () => {
                    this.sendBatteryToBSS(element.commands[receiver.battery] || '');
                });
            }
        });
    }

     sendBatteryToBSS(command) {
        const client = new net.Socket();
        client.connect(1023, this.ip, function() {
            console.log('Connected to BSS');
            const hex = (command || '')
            const payload = Buffer.from(hex, 'hex');
            const buf = Buffer.concat([payload, Buffer.from([0x0D])]); 
            client.write(buf, (err) => {
                if (err) console.error('BSS write error:', err);
                client.end();
            });
        });

    }
}