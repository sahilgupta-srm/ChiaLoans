import { Component } from '@angular/core';
import { EthcontractService } from './ethcontract.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Add Loan';
  accounts:any;
  id = '0';
  loanAmount ='0';
  totalAmount='0';
   interest='5';
  lenderAddress='';
   lenderShare;
   remarks='';
   viewAddress:boolean =true;
   viewHome:boolean =false;
   disableOtherComp:boolean=true;

  constructor( private ethcontractService: EthcontractService ){
 //   this.initAndDisplayAccount();
  }

clickedBack(){
this.viewAddress = !this.viewAddress;
this.viewHome = !this.viewHome;

}

disableOtherCompMethod(){
this.disableOtherComp=!this.disableOtherComp;

}


viewAddressDetail(){
this.viewAddress = !this.viewAddress;
this.viewHome = !this.viewHome;
 let that = this;
this.ethcontractService.getAllAssetDetails().then(function(addressInfo){
console.log("Working");
console.log(addressInfo);
//that.areaCode=addressInfo;
}).catch(function(error){

});
}
  
  addLoan(event){
    let that = this;
console.log(  this.id,
  this.loanAmount,
  this.totalAmount,
   this.interest,
  this.lenderAddress,
   this.lenderShare,
   this.remarks);
     var lenderAddressArray = [];
    var lenderShareArray = [];
    console.log(lenderAddressArray);
    this.ethcontractService.addLoan(this.id,
       this.loanAmount,
  this.totalAmount,
   this.interest,
  lenderAddressArray,
   lenderShareArray,
   this.remarks
    ).then(function(){
    console.log("Working");
      //that.initAndDisplayAccount();
    }).catch(function(error){
      console.log(error);
      //that.initAndDisplayAccount();
    });
  }
  
  fetchDetails(event)
  {
let that=this;
console.log(this.id);
var amount;
this.ethcontractService.getLoanAmount(this.id).then(function(value)
{
console.log(value);
that.loanAmount=value;
that.totalAmount=value*5;
}).then(function(){


});

 
  }
}
