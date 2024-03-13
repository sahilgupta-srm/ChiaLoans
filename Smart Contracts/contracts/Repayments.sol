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

  function getCountofAssets() public view returns(uint){}
  function addAsset(uint regno,string areacode,uint sqft,string desc,address owner,uint ownershare,string documenthash) public{}
  function updateAsset(uint assetId,string desc,address owner,uint ownershare,string documenthash) public {}
  function getAssetOwnershipDetails(uint assetid) public view returns(address,uint){}
  function getAssetareacode(uint assetid) public view returns(string){}
function getAssetsqft(uint assetid) public view returns(uint){}
}




contract Repayments {
  struct RepaySkull{
    uint assetid;
    uint loanid;
	uint amount;
		address lender;
    address seeker;
  string transferdate;
  string duedate;
  string currentdate;
  bool hasdefaulted;
  bool hasrepayed;
  }
  
   RealEstateBeta rebeta;

  function Repayments(address _t) public {
    rebeta = RealEstateBeta(_t);
  }
  
  mapping (uint => RepaySkull) public repayments;
 

  function addRepayment(uint assetid,uint loanid,uint amount,address lender,address seeker,string transferdate,string duedate,string currentdate) public{
 
  repayments[assetid] = RepaySkull(
    assetid,
    loanid,
	amount,
    lender,
    seeker,
    transferdate,
    duedate,
    currentdate,
	false,
	false
    );
  }
  
  function updatecurrentdate(uint assetid,string currentdate) public 
  {
  RepaySkull storage repayment=repayments[assetid];
  repayment.currentdate=currentdate;
  string memory a= repayment.currentdate;
  string memory b= repayment.duedate;
if((keccak256(a) == keccak256(b)) && !repayment.hasrepayed)  
{
repayment.hasdefaulted=true;

}
  }
  
  function hasdefaulted(uint assetid) public view returns(bool)
 {
   RepaySkull storage repayment=repayments[assetid];
return repayment.hasdefaulted;
 
 } 
 
 
 function updaterepayed(uint assetid) public   returns(bool)
 {
   RepaySkull storage repayment=repayments[assetid];
address  owner=repayment.seeker;
 repayment.hasrepayed=true;
rebeta.updateAsset(assetid,"",owner,100,"");
 } 
 
  
  
  
}



