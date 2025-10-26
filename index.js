import { Receiver } from "./src/sennheiser.js";
import * as config from "./config.json" with {type: "json"};

console.log("Loaded config:", config);
const receivers = config.default.receivers.map(r => new Receiver(r.ip, r.name));
console.log(receivers);

receivers[0].getBatteryState();