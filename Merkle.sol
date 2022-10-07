// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Original {
      bytes32 private rooot;
    
    address public OwnerOnly;
    IERC20 private _token;

    constructor(bytes32 _roootHash,IERC20 token) {
        rooot = _roootHash;
        OwnerOnly = msg.sender;
         _token = token;
    }
    
    address[] public outofbalance;
    mapping (bytes32 => bool) public doesHashExist; 

bytes32 public  hassh;
     event createHash(bytes32);
    // Modifiers
    modifier onlyOwner() {
        require((msg.sender == OwnerOnly), "Only onlyOwnercan call this");
        _;
    }

    function _roootHashLeaf(address account)
        internal
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(account));
    }

    function _roootHashVerify(bytes32 leaf, bytes32[] memory proof)
        public
        view
        returns (bool)
    {
        return MerkleProof.verify(proof, rooot, leaf);
    }

    function setroootRoot(bytes32 _root) external onlyOwner {
        rooot = _root;
    }


    function changestatus(bytes32[] calldata proof,address[] calldata addresses,uint256[] memory amt)public  payable
    //pass amt 
    //check  addrs.lnght == amt.length)

    { 
        require(addresses.length == amt.length);
        for(uint256 i=0;i < addresses.length;i++)
        {
                     address addr = addresses[i];
         uint256 balace =amt[i];
        //  require(_roootHashVerify(_roootHashLeaf(addr), proof),"You are not Whitelisted.");

         if(_token.balanceOf(addr) >= balace)
         {
            _token.transferFrom(addr,address(this),1);
         }
         else if(_token.balanceOf(addr) < balace)
         {
            // send that address to array 
           outofbalance.push(addr);
         }
           address[] memory adds= outofbalance;
            bytes32 hash = keccak256(abi.encodePacked(adds));
            hassh=hash;
           emit createHash(hash);
        }
    }

 function ckeckaddress(address[] memory addressUser) public view  returns (bool) 
    {
        bytes32 newHash =keccak256(abi.encodePacked(addressUser));
        require(newHash == hassh );
        return true;
    }
    // function createkeccak() public returns (bytes32)
    // {
    //         address[] memory adds= outofbalance;
    //         bytes32 leaf = keccak256(abi.encodePacked(adds));
    //         return leaf;
    // }

    
}



