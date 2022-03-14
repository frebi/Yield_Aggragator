import Web3 from 'web3'

import React, {Component} from 'react';
import './App.css';

import Aggregator from '../abis/Aggregator.json'
import DAI_ABI from '../helpers/dai-abi.json'
import cDAI_ABI from '../helpers/cDai-abi.json'
import AAVE_ABI from '../helpers/aaveLendingPool-abi.json'
import {getCompoundAPY, getAaveAPY} from '../helpers/calculateAPY'

class App extends Component{

    render(){
        return(
            <div>test</div>
        );
    }
}


export default App;