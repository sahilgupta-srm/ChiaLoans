pragma solidity ^0.4.18;

contract RealEstateBeta {

  struct RESkull{
    uint id;//asset id
    uint regno;
    string areacode;
    uint sqft;
    string desc;
    address owner;
    uint ownershare;
    string documenthash;
  }
  struct DefaulterOwnership{
      uint id;
      uint assetid;
      address ownerplus;
      uint ownerplusshare;
      address ownerminus;
      uint ownerminusshare;
  }

  mapping (uint => RESkull) public assets;
  mapping (uint => DefaulterOwnership) public defaulters;
  uint defaultercounter;
  uint aCounter;

  function getCountofAssets() public view returns(uint){
    return (aCounter);
  }

  function addAsset(uint regno,string areacode,uint sqft,string desc,address owner,uint ownershare,string documenthash) public{
  aCounter++;
  assets[aCounter] = RESkull(
    aCounter,
    regno,
    areacode,
    sqft,
    desc,
    owner,
    ownershare,
    documenthash
    );
  }



  function updateAsset(uint assetId,string desc,address owner,uint ownershare,string documenthash) public {
    RESkull storage asset = assets[assetId];
    asset.desc = desc;
    asset.owner = owner;
    asset.ownershare = ownershare;
    asset.documenthash = documenthash;
  }

  

  /*for the given asset id it will return the asset owner and sharepercent array*/
  function getAssetOwnershipDetails(uint assetid) public view returns(address,uint){
    return (assets[assetid].owner,assets[assetid].ownershare);
  }
  
  function getAssetareacode(uint assetid) public view returns(string){
    return (assets[assetid].areacode);
  }
  function getAssetsqft(uint assetid) public view returns(uint){
    return (assets[assetid].sqft);
  }
}
