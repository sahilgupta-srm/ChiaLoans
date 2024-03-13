import { Component } from '@angular/core';
import { EthcontractService } from './ethcontract.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Repay Loan';
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
 
 this.ethcontractService.hasDefaulted(this.address).then(function(status){
 if(status)
 {
    alert("Asset up for auction!");
	}
    }).catch(function(error){
      console.log(error);
    });
 
 
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
//that.ownerView=ownerInfo[0][0];
//that.ownerShareView=ownerInfo[1][0].toNumber();
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
      ownerArray,
      this.remarks, 
      ownerShareArray,
      this.documenthash
    ).then(function(){
    console.log("Working");
    }).catch(function(error){
      console.log(error);
    });
  }
  
  
  
  repay(event){
 let that = this;
this.ethcontractService.updaterepayed(this.regNoView,this.lenderaddress,this.ownerView,this.amountpayable)
.then(function(){
    console.log("Working");
    }).catch(function(error){
      console.log(error);
    });
	

	
	
}



}





