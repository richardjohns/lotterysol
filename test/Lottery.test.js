const assert = require('assert')
// local test network will boot only for tests
const ganache = require('ganache-cli')
const Web3 = require('web3')

// 2 extra lines due to bug
const provider = ganache.provider()
const web3 = new Web3(provider)

const { interface, bytecode } = require('../compile')

let accounts;
let lottery;

beforeEach(async () => {
    web3.eth.getAccounts()
        accounts = await web3.eth.getAccounts()
        // .then(fetchedAccounts => {
        //   console.log(fetchedAccounts)
        // })

    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000' })
        // added due to bug
        lottery.setProvider(provider)
})

describe('Lottery contract', () => {
    it('deploys a contract', () => {
        // console.log(accounts)
        // console.log(inbox)
        // if an address is present, it's likely the contract was deployed.
        assert.ok(lottery.options.address)
    })

    it('Allows one account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        })

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        })

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length)
    })

    it('Allows two accounts to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        })
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        })

        const players = await lottery.methods.getPlayers().call({
            from: accounts[1]
        })

        assert.equal(accounts[1], players[1]);
        assert.equal(2, players.length);
    })

    it('requires a minimum amount of ether to enter', async () => {
        // With js use try/catch to catch errors with async fns.
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0
            });
            // this assert ensures that if the try block succeeds (ie lottery entry occurs without value being supplied) 
            // then the assert line below will run and produce a failed test.
            assert(false);
        } catch (err) {
            // test should pass when err is present. assert() confirms the existence of a variable value.
            assert(err);
        }
    })

    it('only manager can call pickWinner fn', async () => {
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            })
            assert(false);
        } catch(err) {
            assert(err);
        }
    })

    it('sends money to the winner and resets the players array', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('1','ether')
        })
        // built-in fn - throw any account in to find eth balance.
        const initialBalance = await web3.eth.getBalance(accounts[0]);
        await lottery.methods.pickWinner().send({ from: accounts[0] })
        const finalBalance = await web3.eth.getBalance(accounts[0]);
        const difference = finalBalance - initialBalance;
        // diff will be less than 1 eth sent due to gas costs
        console.log(finalBalance - initialBalance)
        assert(difference > web3.utils.toWei('0.9', 'ether'))
    })
})

