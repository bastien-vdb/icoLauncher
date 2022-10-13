import logo from './logo.svg';
import './App.css';
import Buttons from './components/Buttons';
import { ethers } from "ethers";
import abi from './abi/token';
import { useEffect, useState, useRef } from 'react';

function App() {

  const [nameTKN, setNameTKN] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [pourcentage, setPourcentage] = useState(null);

  const progressBarIndicator = useRef();
  let cssPourcentage;

  /*WEB Connection*/
  const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/97c0878953c249c8bce26055b5e0ee94");
  const contract = new ethers.Contract( "0xe59De8B98EdCa548fe863EBa341c68f04A673505" , abi , provider );
  const hardCap = 1000;

  async function listenToEvent() {
    contract.on("Transfer", ()=>{
      getInfoTKN();
    })
  }

  listenToEvent();

  async function getInfoTKN() {
    const getNameTKN = await contract.name();
    setNameTKN(getNameTKN);

    let getSupplied = await contract.totalSupply();
       setRemaining(1000-getSupplied);

    let getPourcentage = Math.floor(100*(getSupplied/hardCap));
    setPourcentage(getPourcentage);
  }

  useEffect(()=>{
    const pourcentCss = pourcentage+'%';
    progressBarIndicator.current.style.height = pourcentCss;
    console.log('useeffect')
  },[pourcentage]);
  
  getInfoTKN();

  return (
    <div>
      <header id="menuHeader" className='flex items-center justify-around' style={{backgroundColor:'pink'}}>
        <img className='h-32 p-6' src="./image/logo-desktop-header.svg" alt="Big Eyes logo"/>
        <div id="mobileBouton" className='flex flex-col md:flex-row md:items-center my-2'>
          <button className='px-10 py-3 bg-white rounded-full py-4 font-bold my-4 md:m-2'>Buy Now</button>
          <button className='px-10 py-3 border border-white text-white font-normal  border-4 rounded-full font-bold'>French</button>
        </div>
      </header>

      <div id='bloc1' className='flex justify-center items-center flex-col w-full p-4 lg:px-48' style={{backgroundColor:'pink'}}>
          <div id='sousbloc1' className='flex items-center justify-center bg-cover h-screen w-full border border-y-8 border-x-4 border-white' style={{backgroundImage:'url(./image/imagefondBlock1.png)', borderRadius:'100px'}}/>       
            <div className='p-0.5 m-6 w-full flex flex-col justify-center items-center md:absolute md:w-10/12 md:h-3/5 lg:w-5/12' style={{boxShadow:'#00000059 0 5px 15px', backgroundColor:'#fffef5', borderRadius:'100px'}}>
              <img src="./image/presale.png" style={{width:'12em'}}/>
              <h1>100% Secure Zone</h1>
              <div className='text-center p-3'>
                <p className='my-3'>Big Eyes is the ultimate memecoin platform, and it couldn't be easier to get your hands on the token in our presale.</p>
                <p className='my-3'>Contract code fully audited by Solidity Finance and shown to be 100% secure. Team fully verified by CoinSniper to ensure anti-rug and complete project security.</p>
                <p className='my-3'>You can buy direct using USDT, ETH or BNB. After the public sale ends, you'll claim your purchased Big Eyes using the claim page.</p>
                <div id='divButton' className='flex items-center flex-col justify-center my-10 md:flex-row'>
                  <Buttons txt='Buy'/>
                  <Buttons txt='How to buy'/>
                  <Buttons txt='Talk to us'/>
                </div>
              </div>
            </div>
          </div>

      <div id='bloc2' className='w-full flex flex-col justify-center items-center lg:px-44' style={{backgroundColor:'pink'}}>
        <div className='w-full p-4' id='sousbloc1'>
          <div style={{height:'3.75rem', backgroundColor:'#a6e8fe', borderTopLeftRadius:'100px', borderTopRightRadius:'100px', border:'2px solid black'}}>
            <div style={{padding:'1em', marginLeft:'2em', display:'flex'}}>
              <div className='h-6 w-6 bg-red-400 border-2 border-black border rounded-full mr-2'></div>
              <div className='h-6 w-6 bg-yellow-200 border-2 border-black border rounded-full mr-2'></div>
              <div className='h-6 w-6 bg-green-500 border-2 border-black border rounded-full'></div>
            </div>
          </div>
          <div className='p-10 shadow-xl' style={{backgroundColor:'rgb(255, 254, 245)', borderBottom:'2px solid black', borderLeft:'2px solid black', borderRight:'2px solid black', borderBottomLeftRadius:'50px', borderBottomRightRadius:'50px'}}>
            <div className='flex flex-col items-center justify-center xl:flex-row xl:justify-around xl:mx-20'>

              <div className='lg:border-r-2 lg:border-black lg:p-10 w-full h-full'>
                <h1>Stage 5 has started!</h1>
                <p className='text-center text-gray-400 text-lg'>1 USDT = 4117.65 Big Eyes</p>
                <div className='border border-gray-300 border-2 rounded-lg mt-8 flex flex-col justify-between items-center p-8 px-12 sm:p-20 sm:px-32'>
                  <p className='text-red-400 text-xl font-bold'>{remaining? remaining : "wait"}</p>
                  <p className='text-red-400 text-lg font-bold text-center'>{nameTKN? nameTKN: "wait"} remaining</p>
                  <p className='text-sm'>Until 1 USDT = 4117.65 Big Eyes</p>
                  <Buttons txt='Connect Wallet'/>
                  <p className='text-gray-500'>offer code?</p>
                </div>
              </div>

              <div className='w-full h-full lg:p-12'>
                <div className='flex items-center justify-between p-16'>
                  <img className='w-36' src="./image/lucky-cat.png" alt="cat"/>
                  <div id='progressBar' className='relative  bg-gray-200 w-1 h-48' style={{boxSizing:'border-box'}}>
                    {/* <div ref={progressBarIndicator} id='progressBarIndicator' className='absolute top-0 left-0 rounded-full bg-red-300 border-gray-400 border-2 w-6 h-6'  style={{transform: 'translate(-40%, -50%)'}}></div> */}
                    <div ref={progressBarIndicator} id='progressBar2' className='w-1 h-0 bg-green-500'></div>
                    <h1 className='translate-x-4 translate-y-10'>{pourcentage? pourcentage+'%' : 'wait'}</h1>
                    {/* style={{transform:'translateY(100%), translateX(50%)'}} */}
                  </div>
                </div>
                <p className='text-sm text-gray-400 font-bold'>USDT Raised: $6,136,028.61 / $6,450,000.00</p>
                <div id='loader' className='bg-sky-200 w-fit p-4 h-12 rounded-lg border border-gray-500 border-2 flex justify-center items-center'>
                  <div className='bg-white w-fit h-10 rounded-lg border border-gray-500 border-2 flex items-center overflow-hidden -translate-x-4'>
                    <div className='bg-red-200 h-6 w-6 border border-gray-500 border-2 rounded-full m-0.5'></div>
                    <div className='bg-red-200 h-6 w-6 border border-gray-500 border-2 rounded-full m-0.5'></div>
                    <div className='bg-red-200 h-6 w-6 border border-gray-500 border-2 rounded-full m-0.5'></div>
                    <div className='bg-red-200 h-6 w-6 border border-gray-500 border-2 rounded-full m-0.5 hidden sm:block'></div>
                    <div className='bg-red-200 h-6 w-6 border border-gray-500 border-2 rounded-full m-0.5 hidden sm:block'></div>
                    <div className='bg-red-200 h-6 w-6 border border-gray-500 border-2 rounded-full m-0.5 hidden sm:block'></div>
                    <div className='bg-red-200 h-6 w-6 border border-gray-500 border-2 rounded-full m-0.5 hidden md:block'></div>
                    <div className='bg-red-200 h-6 w-6 border border-gray-500 border-2 rounded-full m-0.5 hidden md:block'></div>
                    <div className='bg-red-200 h-6 w-6 border border-gray-500 border-2 rounded-full m-0.5 animate-pulse'></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div id='bloc3' className='bg-cyan-100 w-full flex flex-col justify-center items-center p-8'>
        <div className='p-1 xs:p-4 sm:p-10 shadow-xl mt-10 rounded-xl shadow-2xl' style={{backgroundColor:'rgb(255, 254, 245)', borderRadius:'50px'}}>
          <img className='w-32 sm:w-64' style={{transform:'translate(40%, -70%)'}} src="./image/plants1.png" alt='flowerLight'/>

          <div className='lg:flex border-b border-gray-300 border-b-3'>
            <div className='flex flex-col'>
              <h1>How to buy Big Eyes</h1>
              <p className='text-red-400 text-xl font-bold flex items-center my-4x  '>
              <svg className='mr-2' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7.5" cy="7.5" r="7.5" fill="#F17B87"/>
                <path d="M4.40987 7.44648C4.87703 7.33262 5.12948 6.84183 4.97374 6.35028C4.81799 5.85872 4.31303 5.55254 3.84587 5.6664C3.37871 5.78026 3.12626 6.27104 3.282 6.7626C3.43774 7.25415 3.94271 7.56034 4.40987 7.44648Z" fill="white"/>
                <path d="M6.11042 6.58647C6.65803 6.55617 7.06835 6.06438 7.02689 5.48804C6.98543 4.91169 6.50789 4.46903 5.96029 4.49933C5.41268 4.52964 5.00236 5.02142 5.04382 5.59777C5.08528 6.17411 5.56281 6.61677 6.11042 6.58647Z" fill="white"/>
                <path d="M9.37445 5.56194C9.43378 4.9868 9.03888 4.4854 8.49241 4.44203C7.94595 4.39867 7.45485 4.82976 7.39552 5.4049C7.33618 5.98004 7.73108 6.48144 8.27755 6.52481C8.82402 6.56817 9.31512 6.13708 9.37445 5.56194Z" fill="white"/>
                <path d="M11.2065 6.54204C11.3287 6.04325 11.0436 5.56646 10.5695 5.4771C10.0955 5.38774 9.61211 5.71965 9.48987 6.21844C9.36764 6.71723 9.65284 7.19402 10.1269 7.28338C10.6009 7.37274 11.0843 7.04083 11.2065 6.54204Z" fill="white"/>
                <path d="M10.0615 8.41201C10.0135 7.72687 9.35307 7.20633 8.58748 7.24961C8.04852 7.28036 7.60112 7.58221 7.39982 7.99739C7.17384 7.52925 6.63813 7.21544 6.03683 7.24961C5.27125 7.29289 4.69008 7.88349 4.73813 8.56862C4.73553 8.94736 5.28293 9.50264 5.75436 10.0186L6.83358 11.1992C7.12449 11.5176 7.67709 11.5193 7.9706 11.2027C8.30047 10.8461 8.69527 10.4196 8.92709 10.1639C9.38099 9.66438 10.0622 9.04361 10.0622 8.41201H10.0615Z" fill="white"/>
              </svg>
                Step 1/3</p>
                <p>To begin, make sure you have a MetaMask wallet installed on your browser, or use one of the wallets supported by Wallet Connect (we recommend Trust Wallet).</p>
                <p>Purchasing on a desktop browser will give you a smoother purchasing experience. For this we recommend Metamask.</p>
                <p>If you are purchasing on mobile, we recommend using Trust Wallet and connecting through the in built browser.</p>
            </div>
            <img className='md:w-fit' src="./image/cat_room_2.png" alt="catPC"/>
          </div>

          <div className='my-10'>
            <p className='text-red-400 text-xl font-bold flex items-center'>
            <svg className='mr-2' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7.5" cy="7.5" r="7.5" fill="#F17B87"/>
              <path d="M4.40987 7.44648C4.87703 7.33262 5.12948 6.84183 4.97374 6.35028C4.81799 5.85872 4.31303 5.55254 3.84587 5.6664C3.37871 5.78026 3.12626 6.27104 3.282 6.7626C3.43774 7.25415 3.94271 7.56034 4.40987 7.44648Z" fill="white"/>
              <path d="M6.11042 6.58647C6.65803 6.55617 7.06835 6.06438 7.02689 5.48804C6.98543 4.91169 6.50789 4.46903 5.96029 4.49933C5.41268 4.52964 5.00236 5.02142 5.04382 5.59777C5.08528 6.17411 5.56281 6.61677 6.11042 6.58647Z" fill="white"/>
              <path d="M9.37445 5.56194C9.43378 4.9868 9.03888 4.4854 8.49241 4.44203C7.94595 4.39867 7.45485 4.82976 7.39552 5.4049C7.33618 5.98004 7.73108 6.48144 8.27755 6.52481C8.82402 6.56817 9.31512 6.13708 9.37445 5.56194Z" fill="white"/>
              <path d="M11.2065 6.54204C11.3287 6.04325 11.0436 5.56646 10.5695 5.4771C10.0955 5.38774 9.61211 5.71965 9.48987 6.21844C9.36764 6.71723 9.65284 7.19402 10.1269 7.28338C10.6009 7.37274 11.0843 7.04083 11.2065 6.54204Z" fill="white"/>
              <path d="M10.0615 8.41201C10.0135 7.72687 9.35307 7.20633 8.58748 7.24961C8.04852 7.28036 7.60112 7.58221 7.39982 7.99739C7.17384 7.52925 6.63813 7.21544 6.03683 7.24961C5.27125 7.29289 4.69008 7.88349 4.73813 8.56862C4.73553 8.94736 5.28293 9.50264 5.75436 10.0186L6.83358 11.1992C7.12449 11.5176 7.67709 11.5193 7.9706 11.2027C8.30047 10.8461 8.69527 10.4196 8.92709 10.1639C9.38099 9.66438 10.0622 9.04361 10.0622 8.41201H10.0615Z" fill="white"/>
            </svg>
              Step 2/3</p>
            <p>Once you have your preferred wallet provider ready, click “Connect Wallet” and select the appropriate option. For mobile wallet apps you will need to select “Wallet Connect”.</p>
            <p>You will then have 3 options:</p>
          </div>
          
          <div className='border-b border-gray-400 border-b-2 lg:flex lg:justify-center'>
            <div id='sousbloc1' className='border border-1 border-gray-400 rounded-2xl my-8 flex flex-col justify-center items-center lg:w-96 lg:m-2'>
              <img className='h-48' src='./image/Wallet_coins1.png' alt='wallet'/>
              
              <p className='text-red-400 text-xl font-bold'>Buy ETH or BNB with card</p>
              <p className='p-2 text-center'>Visit</p>
              <p className='p-2 text-center'>
              <a className='text-red-400' href="https://www.moonpay.com/buy"> moonpay.com/buy </a>
                this will allow you to purchase ETH or BNB that will be sent to your wallet.
                You will then be able to use this ETH or BNB to purchase Big Eyes.
                <br/>Visit<br/>
                <a className='text-red-400' href="https://www.moonpay.com/buy"> moonpay.com/buy </a>
                 to begin and follow the on screen steps.
                We recommend purchasing a minimum of $20 worth of ETH or $5 worth of BNB to cover the minimum Big Eyes purchase.
              </p>
            </div>

            <div id='sousbloc2' className='border border-1 border-gray-400 rounded-2xl my-8 flex flex-col justify-center items-center lg:w-96 lg:m-2'>
              <img className='h-48' src='./image/Pawdiamond1.png' alt='wallet'/>
              
              <p className='text-red-400 text-xl font-bold'>Buy ETH or BNB with card</p>
              <p className='p-8 text-center'>Visit
                Once you have sufficient ETH or BNB in your wallet (if you do not have ETH, USDT or BNB, please read option 1 first), you can now swap your ETH or BNB for Big Eyes. Type in the amount of Big Eyes you wish to purchase ($15 minimum ) and then click “Buy with ETH” or “Buy with BNB”. Your wallet provider will ask you to confirm the transaction and will also show you the cost of gas.
              </p>
            </div>

            <div id='sousbloc3' className='border border-1 border-gray-400 rounded-2xl my-8 flex flex-col justify-center items-center lg:w-96 lg:m-2'>
              <img className='h-48' src='./image/phone1.png' alt='wallet'/>
              
              <p className='text-red-400 text-xl font-bold'>Buy Big Eyes with USDT</p>
              <p className='p-8 text-center'>
                Please ensure you have at least $20 of USDT in your wallet before commencing the transaction. Type in the amount of Big Eyes you wish to purchase ($15 minimum). Click “Convert USDT”. You will then be asked to approve the purchase TWICE. The first approval is for the USDT contract and the second is for the transaction amount. Please ensure you go through both approval steps in order to complete the transaction.
              </p>
            </div>
          </div>

          <div className='border-b border-gray-400 border-b-2 flex flex-col justify-center items-center'>
            <p className='text-red-400 text-xl font-bold flex items-center my-10'>
              <svg className='mr-2' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7.5" cy="7.5" r="7.5" fill="#F17B87"/>
                <path d="M4.40987 7.44648C4.87703 7.33262 5.12948 6.84183 4.97374 6.35028C4.81799 5.85872 4.31303 5.55254 3.84587 5.6664C3.37871 5.78026 3.12626 6.27104 3.282 6.7626C3.43774 7.25415 3.94271 7.56034 4.40987 7.44648Z" fill="white"/>
                <path d="M6.11042 6.58647C6.65803 6.55617 7.06835 6.06438 7.02689 5.48804C6.98543 4.91169 6.50789 4.46903 5.96029 4.49933C5.41268 4.52964 5.00236 5.02142 5.04382 5.59777C5.08528 6.17411 5.56281 6.61677 6.11042 6.58647Z" fill="white"/>
                <path d="M9.37445 5.56194C9.43378 4.9868 9.03888 4.4854 8.49241 4.44203C7.94595 4.39867 7.45485 4.82976 7.39552 5.4049C7.33618 5.98004 7.73108 6.48144 8.27755 6.52481C8.82402 6.56817 9.31512 6.13708 9.37445 5.56194Z" fill="white"/>
                <path d="M11.2065 6.54204C11.3287 6.04325 11.0436 5.56646 10.5695 5.4771C10.0955 5.38774 9.61211 5.71965 9.48987 6.21844C9.36764 6.71723 9.65284 7.19402 10.1269 7.28338C10.6009 7.37274 11.0843 7.04083 11.2065 6.54204Z" fill="white"/>
                <path d="M10.0615 8.41201C10.0135 7.72687 9.35307 7.20633 8.58748 7.24961C8.04852 7.28036 7.60112 7.58221 7.39982 7.99739C7.17384 7.52925 6.63813 7.21544 6.03683 7.24961C5.27125 7.29289 4.69008 7.88349 4.73813 8.56862C4.73553 8.94736 5.28293 9.50264 5.75436 10.0186L6.83358 11.1992C7.12449 11.5176 7.67709 11.5193 7.9706 11.2027C8.30047 10.8461 8.69527 10.4196 8.92709 10.1639C9.38099 9.66438 10.0622 9.04361 10.0622 8.41201H10.0615Z" fill="white"/>
              </svg>
                Step 3/3
            </p>
            <p className='my-10'>
              Once the presale has concluded, you will be able to claim your Big Eyes tokens.
              We will release details closer to the time, however you will need to visit the main site:
              <span className='text-red-400'>https://bigeyes.space/</span> and click on the pink ‘claim’ button.
            </p>
            <Buttons txt='Buy now'/>
            <img className='h-48 my-10' src="./image/cat_room_3-1.png" alt="cat_room_3-1"/>
          </div>

          <div id="BigeyesContract">
            <h1>Big Eyes Contract</h1>
            <p className='text-red-400 font-bold my-6 text-center'>Use the contract information below to add Big Eyes to your wallet.</p>

            <div id='Address_field' className='my-10 border-b-2'>
              
              <div id='field1' className='flex justify-center items-center'>
                <div className='my-6 border-b-4 border-red-300'>
                  <p className='text-xl'>Address</p>
                  <input size='1' className='text-gray-400 bg-transparent' readOnly value="0xc8De43Bfe33FF496Fa14c270D9CB29Bda196B9B5"/>
                </div>
                <button className='ml-6 bg-red-200 px-10 py-4 rounded-full font-bold text-white flex items-center justify-between'>
                  Copy   
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                  </svg>
                </button>
              </div>

              <div id='field2' className='flex justify-center items-center'>
                <div className='my-6 border-b-4 border-red-300'>
                  <p className='text-xl'>Decimals</p>
                  <input size='1' className='text-gray-400 bg-transparent' readOnly value="18"/>
                </div>
                <button className='ml-6 bg-red-200 px-10 py-4 rounded-full font-bold text-white flex items-center justify-between'>
                  Copy   
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                  </svg>
                </button>
              </div>

              <div id='field3' className='flex justify-center items-center'>
                <div className='my-6 border-b-4 border-red-300'>
                  <p className='text-xl'>Token Symbol</p>
                  <input size='1' className='text-gray-400 bg-transparent' readOnly value="BIG"/>
                </div>
                <button className='ml-6 bg-red-200 px-10 py-4 rounded-full font-bold text-white flex items-center justify-between'>
                  Copy   
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div id='100%secure' className='flex flex-col items-center border-b-2 my-6'>
            <h1>100% Secure</h1>
            <p className='text-center my-10'>
            Contract fully audited by Solidity Finance and shown to be 100% secure.
            Team fully verified by CoinSniper to ensure anti-rug and complete project security.
            </p>
            <Buttons txt='Buy now'/>
            <div className='flex justify-center my-10'>
              <img className='h-20' src='./image/solidify-logo.png' alt='solidify logo'/>
              <img className='h-20' src='./image/coinsniper-logo.png' alt='coinsniper logo'/>
            </div>
          </div>
      
          <div id="TalkToUs" className='p-2 '>
            <h1>Talk to us</h1>
            <p className='text-red-400 font-bold my-6'>Leave your details below and we’ll contact you to discuss purchasing Big Eyes.</p>

            <div id='Address_field' className='my-10 p-6'>
              
              <div id='field1' className='flex justify-between'>
                <p className='border-b-4 border-red-300 flex flex-col w-full'>
                  <span className='text-xl font-bold my-2'>First name</span>
                  <input className='text-gray-400 bg-transparent' placeholder='Enter first name'/>
                </p>
              </div>

              <div id='field2' className='flex justify-between my-10'>
                <p className='border-b-4 border-red-300 flex flex-col w-full'>
                  <span className='text-xl font-bold my-2'>Last name</span>
                  <input className='text-gray-400 bg-transparent' placeholder='Enter last name'/>
                </p>
              </div>
          
              <div className='flex flex-wrap'>
                <div id='field3' className='flex justify-between mr-4'>
                  <p className='border-b-4 border-red-300 flex flex-col w-full'>
                    <span className='text-xl font-bold my-2'>Country Code</span>
                    <input className='text-gray-400 bg-transparent' placeholder='Code'/>
                  </p>
                </div>
                <div id='field4' className='flex justify-between'>
                  <p className='border-b-4 border-red-300 flex flex-col w-full'>
                    <span className='text-xl font-bold my-2'>Contact number</span>
                    <input className='text-gray-400 bg-transparent' placeholder='Enter contact number'/>
                  </p>
                </div>
              </div>

              <div id='field5' className='flex justify-between my-10'>
                <p className='border-b-4 border-red-300 flex flex-col w-full'>
                  <span className='text-xl font-bold my-2'>Best time to contact</span>
                  <input className='text-gray-400 bg-transparent' placeholder='Select a time to contact'/>
                </p>
              </div>

              <div id='field6' className='flex justify-between my-10'>
                <p className='border-b-4 border-red-300 flex flex-col w-full'>
                  <span className='text-xl font-bold my-2'>Investment budget</span>
                  <input className='text-gray-400 bg-transparent' placeholder='Enter investment budget'/>
                </p>
              </div>
              <Buttons txt='Submit'/>
              <div className='flex mt-10'>
                <input className='mr-6' type="checkbox"/>
                <span>By submitting this form you agree to our <b>Terms</b> and <b>Privacy Policy</b></span>
              </div>
            </div>

          </div>

        </div>
      </div>
 
      <footer id='bloc4' className='bg-white flex flex-col' style={{backgroundColor:'#fffef5'}}>
        <img className='h-32 my-6' src="./image/logo-desktop-header.svg" alt="Big Eyes logo"/>
        <div className='flex justify-evenly'>
          <ul className='my-6'>
            <li className='font-bold'>About us</li>
            <li>Tokenomics</li>
            <li>Roadmap</li>
            <li>Charity</li>
          </ul>
          <ul className='my-6'>
            <li className='font-bold'>Documents</li>
            <li>Whitepaper</li>
            <li>Audit</li>
          </ul>
        </div>
        <div className='flex justify-evenly'>
          <ul className='my-6'>
            <li className='font-bold'>Coming Soon</li>
            <li>NFT</li>
            <li>Influencers</li>
          </ul>
          <ul className='my-6'>
            <li className='font-bold'>Social</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>telegram</li>
            <li>Linktree</li>
          </ul>
        </div>
        <div id='blocText' className=''></div>
      </footer>

    </div>
  );
}

export default App;