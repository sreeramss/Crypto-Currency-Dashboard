import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cryptocurrency } from "../Redux/state/Action";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Coinsearch = () => {
  //state varaibles
  const [content, setContent] = useState([]);
  const [searchCurrency, setSearchCurrency] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchValues, setSearchValue] = useState([]);
  const dispatch = useDispatch();
//function to fetch the data
  useEffect(() => {
    const fetchCryptocurrencyData = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en");
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setContent(data);
      } catch (error) {
        toast.error("Failed to fetch cryptocurrency data");        // Display toast notification on API failure
      }
    };
    fetchCryptocurrencyData();
  }, []);

  useEffect(() => {
    const checkSearchDetails = () => {
      if (searchCurrency.length === 0) {
        setIsOpen(false);
        setSearchValue([]);
        return;
      }

      const filteredCurrencies = content.filter(currency =>
        currency.name.toLowerCase().startsWith(searchCurrency.toLowerCase())
      );
      setSearchValue(filteredCurrencies.map(currency => currency.name));
    };

    checkSearchDetails();
  }, [searchCurrency, content]);

  return (
    <div className="transition ease-in-out mx-7 hover:ring-4 ring-white/60 relative lg:w-11/12 bg-sky-400 h-12 lg:h-14 flex items-center px-6 shadow-sm  rounded-md outline outline-3 outline-white/60">
      <img className="max-lg:w-6 " src="./images/searchicon.svg" alt="SearchImage"/>
      <input
        value={searchCurrency}
        onChange={(e) => {
          setIsOpen(true);
          setSearchValue([]);
          setSearchCurrency(e.target.value);
        }}
        type="text"
        className=" placeholder:text-white text-base lg:text-lg text-white font-medium h-full focus:outline-none w-full pl-2 ml-1 bg-sky-400 text-white  "
        placeholder="Search by coin"
      />
      {isOpen && (
        <div className="absolute w-full top-11 max-sm:top-9 right-0 z-10 mt-4 origin-top-right rounded-md border border-white-100 bg-sky-400 shadow-lg">
          <div>
            {searchValues.map((currency, i) => {
              return (
                <div key={i} onClick={() => {
                    dispatch(cryptocurrency(currency));
                    setIsOpen(false);
                    setSearchCurrency(currency);
                  }}
                  className="block rounded-lg px-4 py-2 max-sm:text-xs text-base text-white no-underline hover:bg-sky-600 cursor-pointer "
                >
                  {currency}
                </div>
              );
            })}
            {searchValues.length === 0 && (
              <div className="block rounded-lg px-4 py-2 max-sm:text-xs text-base text-white no-underline cursor-pointer ">
                No Result
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Coinsearch;
