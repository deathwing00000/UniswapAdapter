//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "./interfaces/IWETH.sol";

contract Receiver {
    address public WethAddress;

    //bool shitFlag;

    uint256 public shitCount;

    constructor(address _WETH) {
        WethAddress = _WETH;
    }

    receive() external payable {
        require(shitCount < 1, "shit happens");
        shitCount++;
    }

    function deposit(address recipient, uint256 amount) external payable {
        IWETH(WethAddress).deposit{value: msg.value}(recipient, amount);
    }

    function withdraw(uint256 amount) external {
        IWETH(WethAddress).withdraw(amount);
    }
}
