

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cryptocurrency } from "../../Redux/state/Action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CryptocurrencySelector = () => {

  //state Variables
  const dispatch = useDispatch();
  const selectedCurrency = useSelector((state) => state.currentCryptocurrency);
  const [isOpen, setIsOpen] = useState(false);
  const [cryptoCurrencies, setCryptoCurrencies] = useState([]);

  //Function to fetch data
  async function getCryptoCurrencies() {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"        //fetch data from the api
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cryptocurrencies");
      }
      const data = await response.json();
      setCryptoCurrencies(data);
    } catch (error) {
      toast.warning("Maximum API calling is reached ");         // Display toast notification on API failure
    }
  }

  useEffect(() => {
    getCryptoCurrencies();
  }, []);

  //function for toogling the type
  const toggling = () => {
    setIsOpen((prev) => !prev);
  };

  const selectCurrency = (currency) => {
    dispatch(cryptocurrency(currency));
    setIsOpen(false);
  };

  return (
    <div className="max-sm:w-10/12 w-5/12 max-lg:w-6/12 max-sm:h-6 h-10 flex rounded-md border hover:text-blue-700 hover:ring-2 ring-white/60 ">
      <div className="w-full h-full items-center relative flex rounded-md bg-sky-400 text-white shadow-sm">
        <div onClick={toggling} className="w-full rounded-l-md px-4 max-sm:px-2 py-2 font-medium max-sm:text-xs max-md:text-sm lg:text-base cursor-pointer">
          {`${selectedCurrency}`}
        </div>
        <div onClick={toggling} className="h-full relative">
          <button type="button" className="flex h-full items-center justify-center rounded-r-md border-1  px-2 hover:bg-sky-400">
            {!isOpen && <img src="./images/dropdown.svg" alt="" />}
            {isOpen && <img src="./images/dropup.svg" alt="" />}
          </button>
        </div>

        {isOpen && (
          <div className="min-w-[200px] max-h-[250px] absolute max-sm:top-2 top-7 right-0 z-10 mt-4 origin-top-right rounded-md border  bg-sky-400 shadow-lg overflow-y-scroll">
            <div>
              {cryptoCurrencies.map((currency, i) => (
                <div key={i} onClick={() => selectCurrency(currency.name)} className="flex rounded-lg items-center hover:bg-sky-600 cursor-pointer gap-1 px-4 py-2 max-sm:text-xs text-base text-white no-underline">
                  {currency.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptocurrencySelector;
