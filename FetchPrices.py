import time
from web3 import Web3, HTTPProvider,TestRPCProvider
import json,sys,os
import requests
import pandas as pd


web3 = Web3(HTTPProvider('http://localhost:7545'))
abi=""

with open('C:\\Users\\riyal samant\\Downloads\\code repository\\contract_abi1.json', 'r') as abi_definition:
    abi = json.load(abi_definition)

contract_address = '0x308dd68e55736854eb2728ea920a3e8590603b2e'
web3.eth.defaultAccount=web3.eth.accounts[0];
contract = web3.eth.contract(web3.toChecksumAddress(contract_address),abi=abi)
file='C:\\Users\\riyal samant\\Downloads\\demo_zip.xlsx'

df = pd.read_excel(open(file,'rb'))
for index,row in df.iterrows():
    zip=row['Zipcode']
    date=str(row['Date'])
    price=row['Price']
    contract.transact().setPrice(date,zip,price)
    print ("Added:",zip,price)
    time.sleep(10)
    print(contract.call().getPrice(zip))



#print(contract.transact().setPrice('30-5-2018','Z10462',177000))
#time.sleep(5)
#print(contract.call().getPrice('Z10462'))
