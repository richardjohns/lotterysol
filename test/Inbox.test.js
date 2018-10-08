const assert = require('assert')
const ganache = require('ganache-cli')
// Web3 - for gaining programmatic access to eth network.
// whenever we're importing in Web3, we capitalise as we're always importing in a constructor function 
// to make instances of the Web3 function (ie lower case 'web3') in order to connect with different 
// instances of the eth network.

// whenever we create an instance of web3 we have to set up configuration of the instance including a provider.
// The provider is a communication layer eg has methods allowing sending/receiving of request from 
// local network eg serves as a means of communication between web3 instance and ganache (or some other eth network).

// v0.x.x version only uses callbacks for async code - Hard to keep organised.
// V1.x.x version supports promises + async/await syntax.
// almost all documentation out there currently written with callbacks.
// gain access to a contract, call a function on a contract or send money - all are async actions
const Web3 = require('web3')
// creates unlocked accounts (ie can send tx without worrying about public/private keys or security) for us for testing
// const web3 = new Web3(ganache.provider())

// 2 extra lines due to bug
const provider = ganache.provider()
const web3 = new Web3(provider)

const { interface, bytecode } = require('../compile')

let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    // going to return a promise since as with everything web3 is async. But refactored with async/await.

    web3.eth.getAccounts()
        accounts = await web3.eth.getAccounts()
        // .then(fetchedAccounts => {
        //   console.log(fetchedAccounts)
        // })

    // Use one of those accounts to deploy the contract

    // JSON.parse(interface) is the ABI. We parsed in order to send the Contract constructor a js object.
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        // Creates an object. Arguments are the data expected by the fns within the contract.
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        // deploys the object created above to the network. Comment out and apply address test to counter test below.
        .send({ from: accounts[0], gas: '1000000' })

        // added due to bug
        inbox.setProvider(provider)
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        // console.log(accounts)
        // console.log(inbox)
        // if an address is present, it's likely the contract was deployed.
        assert.ok(inbox.options.address)

    })
})

