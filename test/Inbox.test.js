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
const web3 = new Web3(ganache.provider())

beforeEach(() => {
    // Get a list of all accounts
    // going to return a promise since as with everything web3 is async

    web3.eth.getAccounts()
        .then(fetchedAccounts => {
            console.log(fetchedAccounts)
        })
    // Use one of those accounts to deploy the contract

})

describe('Inbox', () => {
    it('deploys a contract', () => {})
})

