import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';

declare let require: any;
declare let window: any;

let tokenAbi = require('../../build/contracts/SmartLoanBeta.json');
@Injectable({
  providedIn: 'root'
})



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

 getAllAssetDetails() {
 let that = this;
    return new Promise((resolve, reject) => {
       let paymentContract = TruffleContract(tokenAbi);
	   web3.eth.defaultAccount=web3.eth.accounts[0];
      paymentContract.setProvider(that.web3Provider);
      paymentContract.deployed().then(function(instance) {
return instance.getAssetOwnershipDetails(1);
})
.then(function(addressInfo){
 if(addressInfo) {
            return resolve({addressInfo});
          }
        }).catch(function(error){
          console.log(error);

          return reject("Error in transferEther service call");
        });
      });
  }
  
  getLoanAmount(id) {
 let that=this;
  return new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(that.web3Provider);

      paymentContract.deployed().then(function(instance) {
         return instance.getLoanAmount(id);
		  
        }).then(function(amount){
		return amount.toNumber();
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
	 
	
  

  addLoan(
   id,loanAmount,totalAmount,interest,lenderAddressArray,lenderShareArray,remarks
  ) {
    let that = this;
console.log(lenderAddressArray);
console.log(lenderShareArray);
    return new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(that.web3Provider);

      paymentContract.deployed().then(function(instance) {
          return instance.addLoan(
      id,loanAmount,totalAmount,"",0,interest,{from: window.web3.eth.accounts[0]}
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
}
