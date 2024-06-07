
const { writeFileSync } = require('fs');
const { networkInterfaces } = require('os');
const nets = networkInterfaces();

const nonLocalhostNet = 
    Object.keys(nets)
        .map(name => nets[name])
        .flat()
        .find(address => address.family == 'IPv4' && address.address !== '127.0.0.1')

writeFileSync("./.env.development.local", "EXPO_PUBLIC_BASE_URL=http://"+ nonLocalhostNet?.address + ":3000\n")
