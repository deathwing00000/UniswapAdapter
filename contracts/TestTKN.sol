//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestTKN is ERC20, Ownable {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    /**
    function that mints some amount of TKN to address
    @param _account address where we want to mint tokens
    @param _amount amount of TKN we want to mint
    */
    function mint(address _account, uint256 _amount) external onlyOwner {
        _mint(_account, _amount);
    }
}
