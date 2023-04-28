// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./utils/ERC721A.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract AvatarX is ERC721A, ERC2981, AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    uint256 public maxMints = 2;
    uint256 public maxSupply = 8600;
    uint256 public mintRate = 0.001 ether;
    uint public mintDiscount = 50;

    string public baseTokenURI;
    
    bool public mintEnabled = false;
    bool public mintDiscountEnabled = false;

    using SafeMath for uint256;
    
    mapping(address => bool) public whitelistAddresses;

    event Mint(address indexed to, uint256 quantity, uint256 value);
    event SetBaseTokenURI(address indexed from, string value);
    event SetMintRate(address indexed from, uint256 value);
    event SetMaxMints(address indexed from, uint256 value);
    event SetMaxSupply(address indexed from, uint256 value);
    event SetDefualtRoyalty(address indexed from, uint256 value);
    event SetTokenRoyalty(address indexed from, uint256 tokenId, uint256 value);
    event AddWhitelistAddresses(address indexed from, address[] indexed addresses);
    event RemoveWhitelistAddresses(address indexed from, address[] indexed addresses);
    event EnableMint(address indexed from, bool value);
    event SetMintDiscount(address indexed from, uint96 value);
    event EnableMintDiscount(address indexed from, bool value);

    constructor() ERC721A("Neptunian X", "Neptunian X") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
    } 

    /**
     * @notice mint the nft if it is enable, only maxMints are allowed per address
     * @param _quantity: number of nft to mint
     */
    function mint(uint256 _quantity) external payable {
        require(mintEnabled, "Mint is disabled");
        require(_quantity > 0, "Must mint more than 0 tokens");
        require(_quantity + _numberMinted(msg.sender) <= maxMints, "Exceeded the limit");
        require(totalSupply() + _quantity <= maxSupply, "Not enough tokens left");
        uint mintValue = getPrice(msg.sender) * _quantity;
        require(msg.value >= mintValue, "Not enough ether send");
        uint mintQty = _quantity + (_quantity / 5); // give away nft for minting nfts in ratio of 5
        _safeMint(msg.sender,  mintQty);
        emit Mint(msg.sender, mintQty, mintValue);
    }

    /**
     * @notice get the base token uri
    */
    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    /**
     * @notice withdraw the contract eth balance, modify only by the admin
     * @param _amount: amount to waithdraw
     */
    function withdraw(uint256 _amount) external payable onlyRole(ADMIN_ROLE) {
        require(address(this).balance >= _amount, "Address: insufficient balance");
        // solhint-disable-next-line avoid-low-level-calls, avoid-call-value
        (bool success, ) = payable(msg.sender).call{ value: _amount }("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }
    
    /**
     * @notice set the base url of the nft, only by the admin
     * @param _baseTokenURI: base url of nft
     */
    function setBaseTokenURI(string calldata _baseTokenURI) external onlyRole(ADMIN_ROLE) {
        baseTokenURI = _baseTokenURI;
        emit SetBaseTokenURI(msg.sender, _baseTokenURI);
    }

    /**
     * @notice set base price of the nft, modify only by the admin
     * @param _mintRate: base price of nft
     */
    function setMintRate(uint256 _mintRate) external onlyRole(ADMIN_ROLE) {
        require(_mintRate > 0 && _mintRate <= 10 ether, "Mint rate must be greater than 0 and less than or equal to 10 ether");
        mintRate = _mintRate;
        emit SetMintRate(msg.sender, _mintRate);
    }

    /**
     * @notice set max mints allowed per address, modify only by the admin
     * @param _maxMints: maximum mints
     */
    function setMaxMints(uint256 _maxMints) external onlyRole(ADMIN_ROLE) {
        require(_maxMints > 0 && _maxMints <= maxSupply, "Max mints must be graeter than 0 and less than or equal to max supply");
        maxMints = _maxMints;
        emit SetMaxMints(msg.sender, _maxMints);
    }

    /**
     * @notice set max supply of nft, modify only by the admin
     * @param _maxSupply: maximum nft supply
     */
    function setMaxSupply(uint256 _maxSupply) external onlyRole(ADMIN_ROLE) {
        require(_maxSupply > 0 && _maxSupply <= 100000, "Max supply must be greater than 0 and less than or equal to 100000");
        maxSupply = _maxSupply;
        emit SetMaxSupply(msg.sender, _maxSupply);
    }

    /**
     * @notice set mint discount for whitelist addresses, modify only by the admin
     * @param _mintDiscount: mint discount
     */
    function setMintDiscount(uint96 _mintDiscount) external onlyRole(ADMIN_ROLE) {
        mintDiscount = _mintDiscount;
        emit SetMintDiscount(msg.sender, _mintDiscount);
    }

    /**
     * @notice set default rolyatee fee per nft, modify only by the admin
     * @param _royaltyFee: default royalty fee
     */
    function setDefualtRoyalty(uint96 _royaltyFee) external onlyRole(ADMIN_ROLE) {
        _setDefaultRoyalty(msg.sender, _royaltyFee);
        emit SetDefualtRoyalty(msg.sender, _royaltyFee);
    }

    /**
     * @notice set rolyatee fee for specific nft, modify only by the nft owner
     * @param _tokenId: tokenId of nft
     * @param _royaltyFee: royalty fee for nft
     */
    function setTokenRoyalty(
        uint256 _tokenId, 
        uint96 _royaltyFee
    ) external {
        require(ownerOf(_tokenId) == msg.sender, "Receiver is not owner of token");
        _setTokenRoyalty(_tokenId, msg.sender, _royaltyFee);
        emit SetTokenRoyalty(msg.sender, _tokenId, _royaltyFee);
    }

    /**
     * @notice add whitelist address to whitelist address list, modify only by the admin
     * @param _addresses: add addresses to whitelist address
     */
    function addWhitelistAddresses(address[] calldata _addresses) external onlyRole(ADMIN_ROLE) {
        uint len = _addresses.length;
        for (uint i = 0; i < len; i++) {
            whitelistAddresses[_addresses[i]] = true;
        }
        emit AddWhitelistAddresses(msg.sender, _addresses);
    }

    /**
     * @notice add whitelist address to whitelist address list, modify only by the admin
     * @param _addresses: remove the whitelist addresses
     */
    function removeWhitelistAddresses(address[] calldata _addresses) external onlyRole(ADMIN_ROLE) {
        uint len = _addresses.length;
        for (uint i = 0; i < len; i++) {
            whitelistAddresses[_addresses[i]] = false;
        }
        emit RemoveWhitelistAddresses(msg.sender, _addresses);
    }

    /**
     * @notice get the base price of nft based on per address
     * @param _address: address of user
     */
    function getPrice(address _address) public view returns(uint) {
        if (whitelistAddresses[_address] && mintDiscountEnabled) {
            return mintRate.div(100).mul(mintDiscount);
        }
        return mintRate;
    }

    /**
     * @notice enable or disable nft mint, modify only by the admin
     * @param _mintEnabled: enable(true) or disable(false) nft mint
     */
    function enableMint(bool _mintEnabled) external onlyRole(ADMIN_ROLE) {
        mintEnabled = _mintEnabled;
        emit EnableMint(msg.sender, _mintEnabled);
    }

    /**
     * @notice enable or disable nft mint disacount, modify only by the admin
     * @param _mintDiscountEnabled: enable(true) or disable(false) nft mint discount
     */
    function enableMintDiscount(bool _mintDiscountEnabled) external onlyRole(ADMIN_ROLE) {
        mintDiscountEnabled = _mintDiscountEnabled;
        emit EnableMintDiscount(msg.sender, _mintDiscountEnabled);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721A)
        returns (string memory)
    {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();
        string memory baseURI = _baseURI();
        return bytes(baseURI).length != 0 ? string(abi.encodePacked(baseURI, _toString(tokenId))) : "";
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721A, ERC2981, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}