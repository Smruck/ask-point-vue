// const fs = require('fs')

// module.exports = {
//     devServer: {
//       https: {
//       key: fs.readFileSync('./src/certs/askpoint-key.pem'),
//       cert: fs.readFileSync('./src/certs/askpoint.pem'),
//     },
//     proxy: 'http://localhost:8080/'
//   }
// }

module.exports = {
    devServer: {
    
        host: 'localhost'
    }
};