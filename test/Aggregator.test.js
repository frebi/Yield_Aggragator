const Aggregator = artifacts.require("./Aggregator")
const daiABI = require("../mint-dai/dai-abi.json")
const cDAI_ABI = require("../src/helpers/cDai-abi.json")
const AAVE_ABI = require("../src/helpers/aaveLendingPool-abi.json")
const getAPY = require("../src/helpers/calculateAPY")

require('chai')
    .use(require('chai-as-promised'))
    .should()

const DAI = '0x6b175474e89094c44da98b954eedeac495271d0f' // ERC20 DAI Address
const cDAI = '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643' // Compound's cDAI Address
const aaveLendingPool = '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9' // Aave's Lending Pool Contract

const EVM_REVERT = 'VM Exception while processing transaction: revert'

contract('Aggregator', ([deployer, user2]) =>{

    const daiContract = new web3.eth.Contract(daiABI, DAI)
    const cDAI_contract = new web3.eth.Contract(cDAI_ABI, cDAI)
    const aaveLendingPool_contract = new web3.eth.Contract(AAVE_ABI, aaveLendingPool)

    let aggregator

    beforeEach(async () => {
        //fetching contract
        aggregator = await Aggregator.new()
    })

    describe('deployment', () => {
        it('title test', async () => {
            const result = await aggregator.name()
            result.should.equal("Yield Aggregator")
        })
    })

    describe('exchange rates', async () => {

        it('compound rate', async () => {
            const result = await getAPY.getCompoundAPY(cDAI_contract)
            console.log(result.toString())
            result.should.not.equal(0)
        })

        it('aave rate', async () => {
            const result = await getAPY.getAaveAPY(aaveLendingPool_contract)
            console.log(result.toString())
            result.should.not.equal(0)
        })
    })

    describe('deposits', async () => {

        let amount = 10
        let amountInWei = web3.utils.toWei(amount.toString(), 'ether')
        let compAPY, aaveAPY
        let result

        describe('success', async () => {
            
            beforeEach(async () => {

                compAPY = await getAPY.getCompoundAPY(cDAI_contract)
                aaveAPY = await getAPY.getAaveAPY(aaveLendingPool_contract)

                //approve
                await daiContract.methods.approve(aggregator.address, amountInWei).send({from: deployer})

                //deposit
                result = await aggregator.deposit(amountInWei, compAPY, aaveAPY, {from: deployer})
            })

            it('tracks the dai amount', async () => {
                //check dai balance in smart contract
                let balance
                balance = await aggregator.amountDeposited.call()
                balance.toString().should.equal(amountInWei.toString())
            })

            it('tracks where dai is stored', async () => {
                result = await aggregator.balanceWhere.call()
                console.log(result)
            })

            it('emits deposit event', async () => {
                const log = result.logs[0]
                log.event.should.equal('Deposit')
            })
        })

        describe('failure', async () => {
            /*
            it('fails when transfer is not approved', async () => {
                await aggregator.deposit(amountInWei, compAPY, aaveAPY, {from: deployer}).should.be.rejectedWith(EVM_REVERT)
            })

            it('fails when amount is 0', async () => {
                await aggregator.deposit(0, compAPY, aaveAPY, {from: deployer}).should.be.rejectedWith(EVM_REVERT)
            })
            */
        })

    })
    
})