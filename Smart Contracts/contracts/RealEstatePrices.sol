pragma solidity ^0.4.18;




contract RealEstatePrices {

  struct RPSkull{
    string date;
    string areacode;
    uint price;

  }

   mapping  (string => RPSkull)   reprices;
 uint counter;

 
 

  function setPrice(string _date,string _areacode,uint _price)  public returns(uint){
  reprices[_areacode]=RPSkull(_date,_areacode,_price);
  counter++;
  return counter;
  }

  function getPrice(string _areacode) public view returns(uint){
    return (reprices[_areacode].price);
}



}
