const path = require('path')
const fs = require('fs')
const solc = require('solc')

// dirname always refers to the current working directory ie home to inbox folder
const inboxPath = path.resolve(__dirname, 'contracts','Inbox.sol')
const source = fs.readFileSync(inboxPath, 'utf8')

// console.log(solc.compile(source,1))
// run with node compile.js

// only export parts of object needed so we don't need to destructure out later.
module.exports = solc.compile(source,1).contracts[':Inbox']