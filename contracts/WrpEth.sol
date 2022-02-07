//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WrpEth is ERC20, Ownable {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    /**
     * Function that deposits ETH to a contract and minting WETH tokens to {account}
     * @param account account that will recieve tokens.
     * @param amount amount of tokens that we mint.
     */
    function deposit(address account, uint256 amount) external payable {
        require(msg.value >= amount, "WrpEth: Not enough eth for deposit.");
        _mint(account, amount);

        //change return
        if (msg.value > amount) {
            (bool success, ) = payable(msg.sender).call{
                value: msg.value - amount
            }("");
            require(success, "WrpEth: Change returns failed.");
        }
    }

    function withdraw(uint256 amount) public {
        /*require(
            balanceOf(msg.sender) >= amount,
            "WrpEth: Withdraw amount exceeds balance amount."
        );*/
        _burn(msg.sender, amount);
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "WrpEth: Withdraw failed.");
    }

    /**
     * Function that transfers tokens from caller of the function account to {recipient}
     * @param recipient address at which we transferring.
     * @param amount amount of tokens that we want to transfer.
     */
    function transfer(address recipient, uint256 amount)
        public
        override
        returns (bool)
    {
        return super.transfer(recipient, amount);
    }

    /**
     * Function that transfers WETH tokens from {from} account to {recipient}
     * @param from account from which we want to transfer.
     * @param recipient address at which we transfering.
     * @param amount amount of tokens that we want to transfer.
     */
    function transferFrom(
        address from,
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        if (from != msg.sender) {
            require(
                allowance(from, msg.sender) >= amount,
                "WrpEth: Amount excceeds allowance."
            );
            uint256 newBalance = allowance(from, msg.sender) - amount;
            approve(from, newBalance);
            return super.transferFrom(from, recipient, amount);
        }

        return super.transfer(recipient, amount);

        /*bool success;
        if (from != msg.sender) {
            success = super.transferFrom(from, recipient, amount);
            if (success) {
                uint256 newBalance = allowance(from, msg.sender) - amount;
                approve(from, newBalance);
            }
        } else {
            success = super.transfer(recipient, amount);
        }
        return success;*/
    }
}
