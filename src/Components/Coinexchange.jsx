import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CoinExchange() {
  // State variables for exchange rates data, selected coins, amount, exchange result, and error handling
  const [exchangeData, setExchangeData] = useState({});
  const [sellCoin, setSellCoin] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [buyCoin, setBuyCoin] = useState('');
  const [exchangeResult, setExchangeResult] = useState('');
  const [isSellOpen, setIsSellOpen] = useState(false);
  const [isBuyOpen, setIsBuyOpen] = useState(false);

  // Fetch exchange rates when the component mounts
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/exchange_rates');
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }
        const data = await response.json();
        setExchangeData(data);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        toast.error("Failed to fetch cryptocurrency data");
      }
    };
    
    fetchExchangeRates();
  }, []);

  // Handle the exchange process
  const handleClick = () => {
    const amount = parseFloat(sellAmount);
    
    // Checking if the selected currencies are valid
    if (!sellCoin || !buyCoin) {
      toast.error("Please select currencies to sell and buy");
      return;
    }
    const sellRate = parseFloat(exchangeData.rates[sellCoin]?.value);
    const buyRate = parseFloat(exchangeData.rates[buyCoin]?.value);

  
    // Checking if both sell and buy rates are available
    if (isNaN(sellRate) || isNaN(buyRate)) {
      toast.error("Exchange rate data not available");
      return;
    }
  
    // Calculating exchanged amount
    const exchangedAmount = (amount * buyRate) / sellRate;
    setExchangeResult(`${exchangedAmount.toFixed(2)} ${buyCoin}`);
  };
  

  // Function to toggle sell dropdown open/close
  const togglingSell = () => {
    setIsSellOpen((prev) => !prev);
  };

  // Function to toggle Buy dropdown open/close
  const togglingBuy = () => {
    setIsBuyOpen((prev) => !prev);
  };

  return (
    <div className="lg:mt-8 lg:w-1/2 h-64 max-sm:px-3 px-8 py-3 bg-sky-600 bg-opacity-30  shadow-sm transition ease-in-out hover:ring-4 ring-white/60 rounded-md">
      <p className="max-sm:text-lg text-xl font-semibold text-white">
        Exchange Currencies
      </p>
      {/* Sell section */}
      <div className="flex items-start justify-between m-4">
        <div className="w-1/2 flex items-center max-sm:gap-1 gap-3">
          <p className="text-white font-medium max-sm:text-sm">Sell</p>
          <div className="w-10/12 max-sm:h-10 h-12 flex rounded-md border ">
            <div className="w-full h-full items-center relative flex rounded-md bg-sky-400 text-white shadow-sm  hover:ring-2 ring-white/60">
              <div onClick={togglingSell} className="w-full rounded-l-md px-4 max-sm:px-2 font-medium max-sm:text-xs max-md:text-sm lg:text-base cursor-pointer">{sellCoin || "Currency"}</div>
              <div onClick={togglingSell} className="h-full relative">
                <button type="button" className="flex h-full items-center justify-center rounded-r-md ">
                  {!isSellOpen && (
                    <img src="images/dropdown.svg" alt="" />
                  )}
                  {isSellOpen && (
                    <img src="images/dropup.svg" alt="" />
                  )}
                </button>
              </div>
              {isSellOpen && (
                <div className="max-sm:h-[95px] max-sm:w-[90px] w-[145px] h-[140px] absolute max-sm:top-6 top-9 right-0 z-10 mt-4 origin-top-right rounded-md border border-gray-100 bg-sky-400 shadow-lg overflow-y-scroll">
                  <div>
                    {Object.keys(exchangeData.rates || {}).map((coinName, index) =>{
                      const coinData=exchangeData.rates[coinName];
                      ;
                      return(
                        <div
                          key={index}
                          onClick={() => {setSellCoin(coinName); setIsSellOpen(false);}}
                          className="block rounded-lg px-4 py-2 max-sm:text-xs text-base text-white no-underline hover:bg-sky-600 cursor-pointer"
                        >
                          {coinData.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Input for entering the amount to sell */}
        <div className="w-1/2 flex items-center justify-center">
          <input
          className='max-sm:h-10 h-12 w-10/12 max-sm:px-2 px-4 text-lg max-sm:text-xs text-gray-500 border-2 border-gray-300 rounded-lg focus:outline-blue-500 font-medium focus:text-blue-600 cursor-pointer'
            type="number"
            placeholder="Amount"
            value={sellAmount}
            onChange={(e) => setSellAmount(e.target.value)}
          />
        </div>
      </div>

      {/* Buy section */}
      <div className="flex m-4 ">
        <div className="w-1/2 flex items-center max-sm:gap-1 gap-3">
          <p className="text-white font-medium max-sm:text-sm">Buy</p>
          <div className="w-10/12 max-sm:h-10 h-12 flex rounded-md border ">
            <div className="w-full h-full items-center relative flex rounded-md bg-sky-400 text-white shadow-sm hover:ring-2 ring-white/60">
              <div onClick={togglingBuy} className="w-full rounded-l-md px-4 max-sm:px-2 font-medium max-sm:text-xs max-md:text-sm lg:text-base cursor-pointer">
                {buyCoin || "Currency"}
              </div>
              <div onClick={togglingBuy} className="h-full relative">
                <button type="button" className="flex h-full items-center justify-center rounded-r-md border-1 border-gray-10 px-2 ">
                  {!isBuyOpen && (
                    <img src="images/dropdown.svg" alt="" />
                  )}
                  {isBuyOpen && <img src="images/dropup.svg" alt="" />}
                </button>
              </div>
              {isBuyOpen && (
                <div className="max-sm:h-[95px] max-sm:w-[90px] w-[145px] h-[140px] absolute max-sm:top-6 top-9 right-0 z-10 mt-4 origin-top-right rounded-md border border-gray-100 bg-sky-400 shadow-lg overflow-y-scroll">
                  <div>
                  {Object.keys(exchangeData.rates || {}).map((coinName, index) =>{
                      const coinData=exchangeData.rates[coinName];
                      return(
                        <div
                          key={index}
                          onClick={() => {setBuyCoin(coinName); setIsBuyOpen(false);}}
                          className="block rounded-lg px-4 py-2 max-sm:text-xs text-base text-white no-underline hover:bg-sky-600 cursor-pointer"
                        >
                          {coinData.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <p className="text-green-500 font-bold max-sm:text-sm">{exchangeResult}</p>
        </div>
      </div>

      {/* Exchange button */}
      <div className="flex items-center justify-center">
        <button
          onClick={handleClick}
          className="text-white font-medium max-sm:px-4 max-sm:py-2 px-6 py-3 rounded-lg max-sm:text-sm bg-black/60 hover:bg-black/80 cursor-pointer"
        >
          Exchange
        </button>
      </div>
    </div>
  );
}

export default CoinExchange;
