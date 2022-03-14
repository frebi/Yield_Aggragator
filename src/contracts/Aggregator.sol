pragma solidity ^0.5.16;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

//interface for ERC20 DAI contract
interface DAI{
    function approve(address, uint256) external returns (bool);
    function transfer(address, uint256) external returns (bool);
    function transferFrom(address, address, uint256) external returns (bool);
    function balanceOf(address) external view returns (uint256);
}

//Interface for Compound's DAI contract
interface cDAI{
    function mint(uint256) external returns (uint256);
    function redeem(uint256) external returns (uint256);
    function supplyRatePerBlock() external view returns (uint256);
    function balanceOf(address) external view returns (uint256);
}

interface aDAI{
    function balanceOf(address) external view returns (uint256);
}

//Interface for Aave's lending pool contract
interface AaveLendingPool{
    function deposit(
        address asset,
        uint256 amount,
        address to
    ) external;

    function withdraw(
        address asset,
        uint256 amount,
        address to
    ) external;

    //Returns global information on any asset "reserve" pool 
    function getReserveData(address asset)
        external
        returns (
            uint256 configuration,
            uint128 liquidityIndex,
            uint128 variableBorrowIndex,
            uint128 currentLiquidityRate,
            uint128 currentVariableBorrowRate,
            uint128 currentStableBorrowRate,
            uint40 lastUpdateTimestamp,
            address aTokenAddress,
            address stableDebtTokenAddress,
            address variableDebtTokenAddress,
            address interestRateStrategyAddress,
            uint8 id
        );
}

contract Aggregator{

    using SafeMath for uint256;

    string public name = "Yield Aggregator";
    address public owner;
    address public locationOfFunds; //Keep track of where the user balance is stored
    uint256 public amountDeposited;

    //mainnet address for DAI, Compound and Aave (it could change over the time)
    DAI dai = DAI(0x6B175474E89094C44Da98b954EedeAC495271d0F);
    cDAI cDai = cDAI(0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643);
    aDAI aDai = aDAI(0x028171bCA77440897B824Ca71D1c56caC55b68A3);
    AaveLendingPool aaveLendingPool = AaveLendingPool(0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9);
    
    //Events
    event Deposit(address owner, uint256 amount, address depositTo);
    event Withdraw(address owner, uint256 amount, address withdrawFrom);
    event Rebalance(address owner, uint256 amount, address depositTo);

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    constructor() public{
        owner = msg.sender;
    }


    //Functions

    public deposit(uint256 _amount, uint256 _compAPY, uint256 _aaveAPY){

    }

    public withdraw() public onlyOwner{

    }

    public rebalance(uint256 _compAPY, _aaveAPY) public onlyOwner{

    }
}