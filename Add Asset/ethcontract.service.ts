import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';

declare let require: any;
declare let window: any;

let tokenAbi = require('../../build/contracts/RealEstateBeta.json');
let tokenAbi1 = require('../../build/contracts/SmartLoanBeta.json');
let tokenAbi2 = require('../../build/contracts/Repayments.json');



export class EthcontractService {
  private web3Provider: null;
  private contracts: {};


  constructor() {
    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = window.web3.currentProvider;
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }

    window.web3 = new Web3(this.web3Provider);
  }

 getAllAssetDetails(address) {
 let that = this;
    return new Promise((resolve, reject) => {
       let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(that.web3Provider);
      paymentContract.deployed().then(function(instance) {
return instance.assets(address);
})
.then(function(addressInfo){

  console.log(addressInfo[1].toNumber());
  
 // return (addressInfo[1].toNumber());
 if(addressInfo) {
         return resolve(addressInfo);
      }
        }).catch(function(error){
          console.log(error);

          return reject("Error in transferEther service call");
        });
      });
  }
  
  
  getAllLoanDetails(address) {
 let that = this;
    return new Promise((resolve, reject) => {
       let paymentContract = TruffleContract(tokenAbi1);
      paymentContract.setProvider(that.web3Provider);
      paymentContract.deployed().then(function(instance) {
return instance.loans(address);
})
.then(function(addressInfo){

  console.log(addressInfo[1]);
  
 // return (addressInfo[1].toNumber());
 if(addressInfo) {
         return resolve(addressInfo);
      }
        }).catch(function(error){
          console.log(error);

          return reject("Error in transferEther service call");
        });
      });
  }
  
  
  
  getAssetOwnershipDetails(address) {
 let that = this;
    return new Promise((resolve, reject) => {
       let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(that.web3Provider);
      paymentContract.deployed().then(function(instance) {
return instance.getAssetOwnershipDetails(address);
})
.then(function(ownerInfo){
console.log(ownerInfo);
 if(ownerInfo) {
            return resolve(ownerInfo);
          }
        }).catch(function(error){
          console.log(error);

          return reject("Error in transferEther service call");
        });
      });
  }

  addAsset(
    regNo,areaCode,sqft,owner,remarks,  ownerShare, documenthash
  ) {
    let that = this;
console.log(owner);
console.log(ownerShare);
    return new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(that.web3Provider);

      paymentContract.deployed().then(function(instance) {
          return instance.addAsset(
    // 123456,400052,264,"dummy desc",["0x6330A553Fc93768F612722BB8c2eC78aC90B3bbc","0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef"],[50,50],"dummyhash",{from: window.web3.eth.accounts[0]}
     regNo, areaCode, sqft, remarks,  owner,ownerShare, "dummyhash",{from: window.web3.eth.accounts[0]}
     );
        }).then(function(status) {
          if(status) {
            return resolve({status:true});
          }
        }).catch(function(error){
          console.log(error);

          return reject("Error in transferEther service call");
        });
    });
  }
  
  
  
  transfer(lender,owner,amount)
  {
  let that=this;
  
var value=web3.eth.sendTransaction({from: lender, to: owner, value: web3.toWei(amount, "ether"), gas: "313282"}
, function(err, transactionHash) {
  if (!err)
    console.log(transactionHash); 
})
;
}

  updateOwner(id,desc,lenderarray,ownershare,dochash,lender,owner,amount)
  {
  let that=this;
return new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(that.web3Provider);
console.log("testing"+id,desc,lender,ownershare,dochash);
      paymentContract.deployed().then(function(instance) {
console.log("What is going yaar",id,lenderarray,ownershare);
var value=web3.eth.sendTransaction({from: lender, to: owner, value: web3.toWei(amount, "ether"), gas: "313282"}
, function(err, transactionHash) {
  if (!err)
    console.log(transactionHash); 
});
          return instance.updateAsset(id,desc,lenderarray,ownershare,dochash,{from: lender});
        }).then(function(status) {
          if(status) {
            return resolve({status:true});
          }
        }).catch(function(error){
          console.log(error);

          return reject("Error in transferEther service call");
        });
    });
}



 addrepayments(regNoView,loanid,amount,lenderaddress,ownerShareView,transferdate,duedate,today)
  {
  let that=this;
  
return new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(tokenAbi2);
      paymentContract.setProvider(that.web3Provider);
      paymentContract.deployed().then(function(instance) {

          return instance.addRepayment(regNoView,loanid,amount,lenderaddress,ownerShareView,transferdate,duedate,today,{from: window.web3.eth.accounts[0]});
        }).then(function(status) {
          if(status) {
            return resolve({status:true});
          }
        }).catch(function(error){
          console.log(error);

          return reject("Error in transferEther service call");
        });
    });
}




hasDefaulted(id)
  {
  let that=this;
  console.log("inside has defaulted",id);
return new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(tokenAbi2);
      paymentContract.setProvider(that.web3Provider);
      paymentContract.deployed().then(function(instance) {

          return instance.hasdefaulted(id);
        }).then(function(status) {
          if(status) {
            return resolve(status);
          }
        }).catch(function(error){
          console.log(error);

          return reject("Error in transferEther service call");
        });
    });
}









}
