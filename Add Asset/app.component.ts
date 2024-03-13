import { Component } from '@angular/core';
import { EthcontractService } from './ethcontract.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Asset Details';
  accounts:any;
  regNo = '0';
  areaCode ='0';
  sqft='0';
  owner='';
  remarks='';
  status='Approved';
  lent='N';
   ownerShare;
   documenthash;
   address;
   regNoView;
   areaCodeView;
   sqftView;
   remarksView;
   ownerView;
   ownerShareView;
   viewAddress:boolean =true;
   viewHome:boolean =false;
   disableOtherComp:boolean=true;
   lender="N";

  constructor( private ethcontractService: EthcontractService ){
  }

clickedBack(){
this.viewAddress = !this.viewAddress;
this.viewHome = !this.viewHome;

}

disableOtherCompMethod(){
this.disableOtherComp=!this.disableOtherComp;

}


viewAddressDetail(event){
console.log(this.address);
this.viewAddress = !this.viewAddress;
this.viewHome = !this.viewHome;
 let that = this;
this.ethcontractService.getAllAssetDetails(this.address).then(function(addressInfo){
console.log("Working");
console.log(addressInfo);
console.log("logging"+addressInfo[0].toNumber());
console.log(addressInfo[1].toNumber());
that.regNoView=addressInfo[1].toNumber();
that.areaCodeView=addressInfo[2];
that.sqftView=addressInfo[3];
that.remarksView=addressInfo[4];
that.ownerView=addressInfo[5];
that.ownerShareView=addressInfo[6];
}).catch(function(error){

});

this.ethcontractService.getAssetOwnershipDetails(this.address).then(function(ownerInfo){
console.log("Working");
console.log(ownerInfo);
console.log(ownerInfo.length);
console.log(ownerInfo[1][0].toNumber());
//that.ownerView=ownerInfo[0];
//that.ownerShareView=ownerInfo[1].toNumber();
}).catch(function(error){

});

this.ethcontractService.getAllLoanDetails(this.address).then(function(addressInfo){
console.log("Working");
if(addressInfo[0]!=0)
{
that.loanid=addressInfo[0];
that.lender="Y";
that.lendershare=100;
that.lenderaddress=addressInfo[6];
that.loanamount=addressInfo[3];
that.amountpayable=addressInfo[4];
that.transferdate=addressInfo[8];
that.duedate='2019-09-06';
}
}).catch(function(error){
});


this.ethcontractService.hasDefaulted(this.address).then(function(status){
console.log("Inside has defaulted");
console.log("status",status);
if(status)
{
that.status='Defaulted';

}
else
{
that.status='Approved';
}

}).catch(function(error){

});

}
  
  addAsset(event){
    let that = this;
console.log( this.regNo,
      this.areaCode,
      this.sqft,
      this.owner,
       this.ownerShare,
      this.remarks);
     var ownerArray = this.owner.split();
    var ownerShareArray = this.ownerShare.split();
    console.log(ownerArray);
    this.ethcontractService.addAsset(
      this.regNo,
      this.areaCode,
      this.sqft,
      this.owner,
      this.remarks, 
      this.ownerShare,
      this.documenthash
    ).then(function(){
    console.log("Working");
    }).catch(function(error){
      console.log(error);
    });
  }
  
  
  
  transfer(event){

 let that = this;
that.lent='Y';
//var ownerarray=[this.lenderaddress];
//var ownersharearray=[this.ownerShareView];
this.ethcontractService.updateOwner(this.regNoView,this.remarksView,this.lenderaddress,this.ownerShareView,"",this.lenderaddress,this.ownerView,this.loanamount).then(function(addressInfo){
console.log("Inside update owner");
}).catch(function(error){
});


let that = this;
	var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = yyyy + '-' + mm + '-' + dd;

console.log(today);

this.ethcontractService.addrepayments(this.regNoView,this.loanid,this.amountpayable,this.lenderaddress,this.ownerView,this.transferdate,this.duedate,today).then(function(addressInfo){
console.log("Inside addrepayments");
}).catch(function(error){

});

}



}





