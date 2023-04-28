// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {

    event BatchTransfer(address indexed from, address[] indexed addresses, uint256[] values);
    constructor(string memory _name, string memory _symbol, uint256 _initialSupply) 
    ERC20(_name, _symbol) {
        _mint(msg.sender, _initialSupply);
    }

    /**
     * @notice batch transfer of tokens from sender to multiple receiver
     * @param _to: receiver addresses
     * @param _value: token amounts to tranfer to multiple receiver addresses
     */
    function batchTransfer(address[] calldata _to, uint256[] calldata _value) public {
        require(_to.length == _value.length, "Receivers and amounts are different length");
        for (uint256 i = 0; i < _to.length; i++) {
            require(balanceOf(msg.sender) >= _value[i], "Insufficient token balance");
            require(transferFrom(msg.sender, _to[i], _value[i]));
            emit BatchTransfer(msg.sender, _to, _value);
        }
    }
}