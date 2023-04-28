// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {
    constructor(string memory _name, string memory _symbol, uint256 _initialSupply) 
    ERC20(_name, _symbol) {
        _mint(msg.sender, _initialSupply);
    }

    function supplyToken(uint256 amount) public onlyOwner {
        _mint(msg.sender, amount);
    }

    function batchTransfer(address[] calldata _to, uint256[] calldata _value) public {
        require(_to.length == _value.length, "Receivers and amounts are different length");
        unit receiverLength = _to.length;
        for (uint i = 0; i < receiverLength; i++) {
            require(balanceOf(msg.sender) >= _value[i], "Insufficient token balance");
            require(transferFrom(msg.sender, _to[i], _value[i]));
        }
    }
}