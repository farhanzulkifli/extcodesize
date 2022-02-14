// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface ITarget {
    function protected() external;
}

contract Failed {

    function pwn(address _target) public {
        ITarget(_target).protected();
    }
}
