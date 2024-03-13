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

contract RealEstatePrices
{
struct RPSkull{
    string date;
    string areacode;
    uint price;

  }
  mapping (string => RPSkull)  reprices;
  function getPrice(string _areacode) public view returns(uint){}
 function setPrice(string _date,string _areacode,uint _price) public {}
}

contract SmartLoanBeta {

  struct Skull {
    uint id;
    address ls_addr;
    uint256 coll_id;//collateral id or asset id
    uint256 loan_amt;
    uint256 tot_amt;
    uint256 Interest;
    address lenderaddress;
    uint256 lendersshare;
	string tdate;
  }

  RealEstateBeta rebeta;
  RealEstatePrices reprices;

  function SmartLoanBeta(address _t,address _r) public {
    rebeta = RealEstateBeta(_t);
   reprices= RealEstatePrices(_r);
  }

  mapping (uint => Skull) public loans;
  uint loansCounter;

  function getCountOfLoans() public view returns(uint) {
    return(loansCounter);
  }

  function addLoan(uint coll_id,uint256 loan_amt,uint256 tot_amt,address lenderaddress,uint lendersshare,uint256 interest) public{
    loansCounter++;
    loans[loansCounter] = Skull(
      loansCounter,
      msg.sender,
      coll_id,
      loan_amt,
      tot_amt,
      interest,
      lenderaddress,
      lendersshare,
	  ""
    );
  }

  function addLender(uint loanid,uint share,uint amount,string date) public {
   Skull storage loan = loans[loanid];
loan.lenderaddress = msg.sender;
loan.lendersshare=share;
loan.tdate=date;
  }
  
  

  
  function getLoanAmount(uint assetid) public view returns (uint)
  {
 string memory areacode=rebeta.getAssetareacode(assetid);
  uint sqft=rebeta.getAssetsqft(assetid);
  uint price=(reprices.getPrice(areacode))/100000;
  uint amount=price*sqft;
  return amount;
  
  
  }
  
}
