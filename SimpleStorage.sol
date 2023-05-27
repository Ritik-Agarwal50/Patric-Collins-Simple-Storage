// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract SimpleStorage {
    uint256 favoriteNumber;
    struct People {
        uint256 favoriteNumber;
        string name;
    }

    mapping(string => uint256) public nameTOFavoriteNumber;
    //mapping(uint256 => string) public nameTOFavoriteName;

    People[] public people;

    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        nameTOFavoriteNumber[_name] = _favoriteNumber;
        //nameTOFavoriteName[_favoriteNumber] = _name;
    }
}
