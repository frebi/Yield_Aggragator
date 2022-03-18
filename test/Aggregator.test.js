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
})