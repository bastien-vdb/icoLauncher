import { Fragment, useEffect, useRef, useState } from 'react'
import { ethers } from "ethers";
import abi from './abi/token';

export default function Modals(props) {

  const deactivateButton = useRef();

  async function connectWallet() {  

    if (window.ethereum) {
        
      const providerWallet = new ethers.providers.Web3Provider(window.ethereum);
      const account = await providerWallet.send("eth_requestAccounts",[]).then(async(res)=>{
        document.getElementById('connectedDiv').style.display = 'block';
        document.getElementById('connectedAddress').innerText = res[0].toString();
        providerWallet.getBalance(res[0]).then((res)=>{
            let balance = res/10**18;
            document.getElementById('connectedBalance').innerText = balance;
            deactivateButton.current.style.display = 'none';
        })
      })
      .then((res)=>{
        console.log(res);
        providerWallet.getBalance(res).then((res)=>{
            console.log(res);
        })
      })
    
      const signer = providerWallet.getSigner();
      const contract = new ethers.Contract('0x55D496e7d93565740625D25eec69230812c9e739', abi, signer);
      const options = {value: ethers.utils.parseEther("0.0015")}
      await contract.buyTKN(options).then((success)=>{
        if (success) {
            contract.totalSupply().then((success)=>console.log(success.toString()));
        }
      })
      
    }
    else {
        window.alert('Please install Metamask');
    }

  }

  return (
    <div ref={deactivateButton} style={{display:props.visible? 'block':'none'}} className="relative z-10" aria-labelledby="Wallet connect" role="dialog" aria-modal="true">
       
        <div onClick={()=>deactivateButton.current.style.display = 'none'} className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"></div>

            <div className="fixed top-[50%] -translate-y-1/2  min-w-32 min-h-32 left-[50%] -translate-x-1/2 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            
                            <div className="sm:flex sm:items-start">
                                <button onClick={()=>deactivateButton.current.style.display = 'none'} className='color-red absolute top-0 right-0 h-8 w-8'>
                                    <svg className='absolute inset-0' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">

                                    <img className='cursor-pointer hover:scale-150 duration-300 ease-in' onClick={()=>connectWallet()} src='./metamask-icon.png' alt='metamask img'/>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Connect your Metamask wallet</h3>
                                </div>
                                </div>
                            </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}