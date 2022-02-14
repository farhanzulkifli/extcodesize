// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Target {

    event Log(string message);

    function isContract(address account) public view returns (bool) {
        uint size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }

    bool public pwned = false;

    function protected() external {
        require(!isContract(msg.sender), "No contracts allowed!");
        pwned = true;
        emit Log("I got pwned!");
    }
}