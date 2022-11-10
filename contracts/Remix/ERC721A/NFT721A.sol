// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "./utils/ERC721A.sol";
import "./utils/NftEncode.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

error NftMintedAlready (string url, string message);
error NftTokenAccessDenied (uint256 tokenId, string message);

contract NFT721A is ERC721A, ERC2981, Ownable, NftEncode {
    uint256 MAX_MINTS = 5;
    uint256 MAX_SUPPLY = 8600;
    uint256 public mintRate = 0.001 ether;
    string public baseTokenURI;

    mapping(string => uint256) nftMinted;

    mapping(address => mapping(uint256 => Listing)) nftListings;

    constructor() ERC721A("NFT", "721A") {} 

    function mint(
        uint256 quantity, 
        bytes memory data
    ) external payable returns (uint[] memory) {
        // _safeMint's second argument now takes in a quantity, not a tokenId.
        require(quantity > 0, "Must mint more than 0 tokens");
        require(quantity + _numberMinted(msg.sender) <= MAX_MINTS, "Exceeded the limit");
        require(totalSupply() + quantity <= MAX_SUPPLY, "Not enough tokens left");
        uint[] memory tokenMinted = _safeMint(msg.sender, quantity, data);
        if (data.length != 1) _setTokenURI(tokenMinted, data);
        return tokenMinted;
    }

    function withdraw() external payable onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    } 

    function getMintRate() external view returns (uint256) {
        return mintRate;
    }

    function getMaxSupply() external view returns (uint256) {
        return MAX_SUPPLY;
    }

    function getTotalSupply() external view returns (uint256) {
        return totalSupply();
    }

    function getNftToken(string memory uri) external view returns (uint256) {
        return nftMinted[uri] - 1;
    }

    function getNftData(address owner, uint256 tokenId) external view returns (Listing memory nftData) {
        nftData = nftListings[owner][tokenId];
        return nftData;
    }
    
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();
        if (bytes(nftListings[msg.sender][tokenId].url).length != 0) {
            return nftListings[msg.sender][tokenId].url;
        } else {
            string memory baseURI = _baseURI();
            return bytes(baseURI).length != 0 ? string(abi.encodePacked(baseURI, _toString(tokenId))) : "";
        }
    }

    function _setBaseTokenURI(string memory _baseTokenURI) external onlyOwner{
        baseTokenURI = _baseTokenURI;
    }

    function _setTokenURI(
        uint[] memory tokenMinted, 
        bytes memory data
    ) public {
        Listing[] memory nftData = decode(data);
        for (uint i = 0; i < tokenMinted.length; i++) {
            uint256 tokenId = tokenMinted[i];
            if (ownerOf(tokenId) != msg.sender) {
                revert NftTokenAccessDenied(tokenId, "Receiver is not owner of token");
            }
            if (nftMinted[nftData[i].url] > 0) {
                revert NftMintedAlready(nftData[i].url, "NFT is already minted");
            }
            nftListings[msg.sender][tokenId] = nftData[i];
            nftMinted[nftData[i].url] = tokenId + 1;
        }
    }

    function _setMintRate(uint256 _mintRate) public onlyOwner {
        mintRate = _mintRate;
    }

    function _setMaxMints(uint256 _maxMints) public onlyOwner {
        MAX_MINTS = _maxMints;
    }

    function _setMaxSupply(uint256 _maxSupply) public onlyOwner {
        MAX_SUPPLY = _maxSupply;
    }

    function _setDefualtRoyalty(uint96 _royaltyFee) public onlyOwner {
        _setDefaultRoyalty(owner(), _royaltyFee);
    }

    function _setTokenRoyalty(
        uint256 _tokenId, 
        uint96 _royaltyFee
    ) public {
        require(ownerOf(_tokenId) == msg.sender, "Receiver is not owner of token");
        _setTokenRoyalty(_tokenId, msg.sender, _royaltyFee);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721A, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}