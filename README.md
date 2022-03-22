
Decentralized app:
- Depositing DAI
- Comparing APY between Compound and Aave and automatically depositing the funds to the protocol with the highest one
- Rebalancing funds to redirect the deposit to the highest APY
- Withdrawing funds

Requirements:
- Ganache-cli
- Infura.io 
- Metamask
- Truffle
- NodeJS

Steps:

- 1: Start Ganache-cli using $ ganache-cli -—chain.hardfork istanbul -f https://mainnet.infura.io/v3/PROJECT_ID -u 0x9759A6Ac90977b93B58547b4A71c78317f391A28 -p 7545
Note: 
    - You need to specify “--chain.hardfork istanbul” or "--hardfork istanbul" if you are using gasPrice = 0 for minting DAI… Refer to dai.js file. If you want to use the default london hardfork, specifying gasfee different from 0, just omit “—-chain.hardfork istanbul”. Reference https://github.com/trufflesuite/ganache/issues/1968
    - Ganache command and dai.js file need to have the same sender address (0x9759A6Ac90977b93B58547b4A71c78317f391A28 address will be forked to mint DAI into our testing account)
- 2: Import the 1st private key listed in MetaMask so you can interact with the frontend
- 3: $ truffle migrate --reset
- 4: $ node ./mint-dai/dai.js
- 5: In a separate CMD prompt/terminal run: $ npm start 
