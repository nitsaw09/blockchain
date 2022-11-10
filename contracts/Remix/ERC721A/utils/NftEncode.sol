// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract NftEncode {
    struct Listing {
        string url;
        uint256 minprice;
    }

    function encode(Listing[] calldata data) external pure returns (bytes memory) {
        return (abi.encode(data));
    }

    function decode(bytes memory data) external pure returns (Listing[] memory listing) {
        listing = abi.decode(data, (Listing[]));        
        return listing;    
    }
}