import { Component } from '@angular/core';
import { EthcontractService } from './ethcontract.service';
import { Hero } from './hero'; 
import { HEROES } from './mock-heroes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
   heroes = HEROES;
 
  selectedHero: Hero;
  displayDetail:false;
  assetId;
  principal;
  amount;
  
 payable='0';
 count=0;
 constructor( private ethcontractService: EthcontractService ){
 //   this.initAndDisplayAccount();
  }
 
  ngOnInit() {
 
let that=this;
//var count=0;



this.ethcontractService.getLoanCount().then(
function(value)
{
console.log("hello",value);
that.count=value;
});

console.log("hello++++",that.count);

//this.ethcontractService.viewOpenLoans(4).then(function(value)
//{
 
//that.heroes[0].assetid=value[2];
//that.heroes[0].principal=value[3];
//that.heroes[0].amount=value[4];

//});







}
  
 
  onSelect(hero: Hero): void {
  let that =this;
  that.displayDetail=true;
  console.log("Working++++"+ that.count);
  
 // this.ethcontractService.viewOpenLoans(that.count).then(function(value)
this.ethcontractService.viewOpenLoans(1).then(function(value)

{
 console.log(value[2],value[3],value[4], value[2].toNumber(), value[3].toNumber(), value[4].toNumber());
that.assetId=value[2].toNumber();
that.principal=value[3].toNumber();
that.amount=value[4].toNumber();

});
    this.selectedHero = hero;

  }
  
  calculate(event)
  {
  let that=this;
 this.payable=(this.principal*this.share)/100;
 this.roi=(this.amount*this.share)/100;
  }
   fetchLoanids(event)
  {
let that=this;
console.log(this.id);
var amount;
this.ethcontractService.viewOpenLoans().then(function(value)
{
console.log(value);
}).then(function(){


});

 
  }
  
    
   fetchshare(event)
  {
let that=this;
console.log(this.id);
var amount;
this.ethcontractService.viewOpenLoans().then(function(value)
{
console.log(value);
}).then(function(){
});
}

addlenders(event)
  {
let that=this;
console.log(this.assetId);
console.log( this.payable);
//this.ethcontractService.addLender(this.assetId,this.share,this.payable,this.date).then(function(value)
this.ethcontractService.addLender(1,this.share,this.payable,this.date).then(function(value)
{
console.log(value);
that.loanAmount=value;
that.totalAmount=value*5;
}).then(function(){


});
 
  }
  
  }
