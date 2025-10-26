import net from 'net';

export class BSS {
    constructor(config, receivers) {
        this.ip = config.ip;
        this.receivers = receivers;
        this.mapping = config.mapping;

        //subscribing
        this.mapping.forEach(element => {
            let receiver = this.receivers.find(r => r.name === element.name);
            if (receiver) {
                receiver.batteryChanged.on((value) => {
                    this.sendBatteryToBSS(element.value);
                });
            }
        });
    }

    sendBatteryToBSS(command) {
       //send command to BSS TCP 1023 thend disconnect

        const client = new net.Socket();
        client.connect(1023, this.ip, function() {
            console.log('Connected to BSS');
            client.write(command + '\r');
        });
        client.destroy();

    }
}