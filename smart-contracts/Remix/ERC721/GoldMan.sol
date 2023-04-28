// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GoldenMan is ERC721, Ownable {
  using Counters for Counters.Counter;
  using Strings for uint256;
  string uri = "https://gateway.pinata.cloud/ipfs/QmaW5LWtgmAAd8W3Hb71QyAp9mhjMw1sgopuUBSRLXhuSD/";
  Counters.Counter private _tokenIdCounter;

  constructor() ERC721("GoldenMan", "GDM") {}

  function mint() public onlyOwner {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(msg.sender, tokenId);
  }

  function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721)
    returns (string memory)
  {
    return string(abi.encodePacked(uri, tokenId.toString(), ".json"));
  }
}