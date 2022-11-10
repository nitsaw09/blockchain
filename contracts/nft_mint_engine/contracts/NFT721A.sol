// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT721A is ERC721A, Ownable {
    uint256 MAX_MINTS = 10;
    uint256 MAX_SUPPLY = 8999;
    uint256 public mintRate = 0.001 ether;

    string public baseTokenURI;

    constructor(string memory _name, string memory _symbol) ERC721A(_name, _symbol) {}

    function mint(uint256 quantity) external payable {
        // _safeMint's second argument now takes in a quantity, not a tokenId.
        require(quantity + _numberMinted(msg.sender) <= MAX_MINTS, "Exceeded the limit");
        require(totalSupply() + quantity <= MAX_SUPPLY, "Not enough tokens left");
        require(msg.value >= (mintRate * quantity), "Not enough ether sent");
        _safeMint(msg.sender, quantity);
    }

    function withdraw() external payable onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function setTokenUri(string memory _baseTokenURI) external onlyOwner{
        baseTokenURI = _baseTokenURI;
    }
	
    function maxSupply() external view returns (unit256) {
        return MAX_SUPPLY;
    }
    
    function setMaxSupply(uint256 _maxSupply) public onlyOwner {
        MAX_SUPPLY = _maxSupply;
    }

    function setMintRate(uint256 _mintRate) public onlyOwner {
        mintRate = _mintRate;
    }
}