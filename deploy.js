const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const mnemonic = require('./keys')
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
    mnemonic,
    'https://rinkeby.infura.io/v3/e03afb307804401ab0173c2b24cdfc88'
)

// Will give us an instance of web3 to interact with the test network using the ether deposited
// into the account via Rinkby faucet
const web3 = new Web3(provider)

// arbitrarily creating a function just so can use aync/await syntax
const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    console.log('Attempting to deploy from account', accounts[0])
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0]})
    // below is the address that the contract was deployed to on the Rinkby network
    console.log(interface)
    console.log('Contract deployed to: ', result.options.address)
}
deploy()