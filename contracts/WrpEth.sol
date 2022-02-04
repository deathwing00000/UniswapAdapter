//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WrpEth is ERC20, Ownable {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function deposit(address account, uint256 amount) external payable {
        require(msg.value >= amount, "WrpEth: Not enough eth for deposit.");
        _mint(account, amount);

        //change return
        if (msg.value > amount) {
            payable(msg.sender).call{value: msg.value - amount}("");
            //require(success, "WrpEth: Change returns failed.");
        }
    }

    function withdraw(uint256 amount) public {
        /*require(
            balanceOf(msg.sender) >= amount,
            "WrpEth: Withdraw amount exceeds balance amount."
        );*/
        _burn(msg.sender, amount);
        payable(msg.sender).call{value: amount}("");
        //require(success, "WrpEth: Withdraw failed.");
    }

    function transfer(address recipient, uint256 amount)
        public
        override
        returns (bool)
    {
        return super.transfer(recipient, amount);
    }

    function transferFrom(
        address spender,
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        if (spender != msg.sender) {
            require(
                allowance(spender, msg.sender) >= amount,
                "WrpEth: Amount excceeds allowance."
            );
            uint256 newBalance = allowance(spender, msg.sender) - amount;
            approve(spender, newBalance);
            return super.transferFrom(spender, recipient, amount);
        }

        return super.transfer(recipient, amount);

        /*bool success;
        if (spender != msg.sender) {
            success = super.transferFrom(spender, recipient, amount);
            if (success) {
                uint256 newBalance = allowance(spender, msg.sender) - amount;
                approve(spender, newBalance);
            }
        } else {
            success = super.transfer(recipient, amount);
        }
        return success;*/
    }
}
