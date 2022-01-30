const fs = require('fs')
const readline = require('readline')

const access = fs.createReadStream('./access.log', 'utf8')
const requests1 = fs.createWriteStream('./requests_IP41.log')
const requests2 = fs.createWriteStream('./requests_IP111.log')

readline.createInterface({
    input: access,
    terminal: false,
}).on('line', (line) => {
    if (line.includes("89.123.1.41")) {
        requests1.write(line + "\n")
    }
    else if (line.includes("34.48.240.111")) {
        requests2.write(line + "\n")
    }
})