const ethers = require ('ethers');
const abi = require ('../abi/token.json');
const express = require ('express');
const { useState } = require('react');

const PORT = process.env.PORT || 3001;

const app = express();

function main() {
    const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/97c0878953c249c8bce26055b5e0ee94");
    const contract = new ethers.Contract("0xe59De8B98EdCa548fe863EBa341c68f04A673505", abi, provider);

    let mco;

    contract.totalSupply().then((result)=>{
        console.log(result.toString());
        mco = result.toString();
    })



    app.get("/api", (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        res.json({ message: mco });
      });      

    app.listen(PORT, ()=>{
        console.log('Server start listening on PORT: '+PORT);
    });
}
main();