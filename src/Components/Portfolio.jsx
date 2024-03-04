import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Portfolio = () => {
  //state variables
  const [topCryptos, setTopCryptos] = useState([]);
  const selectedCurrency = useSelector((state) => state.currentCurrency);
  const [totalVal, setTotalVal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"      ///Fetch data from the api 
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const topCryptoCurrencies = await response.json();
        setTopCryptos(topCryptoCurrencies.slice(1, 4));
      } catch (error) {
        toast.error("Maximum API Calling Exceeded.");                 //Display the notification when error occur in API
      }
    };

    fetchData();
  }, [selectedCurrency]);

  useEffect(() => {
    const calculateTotalValue = () => {
      let val = 0;
      topCryptos.forEach((crypto) => {
        val += parseInt(crypto.current_price);
      });
      setTotalVal(val);
    };

    calculateTotalValue();
  }, [topCryptos]);

  return (
    <div className="bg-opacity-30 lg:mt-8 lg:w-1/2 flex max-sm:flex-col p-2 lg:h-64 h-fit text-white shadow-sm transition ease-in-out hover:ring-4 ring-white/60  rounded-md bg-sky-600 ">
      <div className="w-3/12 max-sm:w-full max-sm:gap-1 flex flex-col items-start justify-between pt-2 pl-2 ">
        <p className="max-sm:text-base text-xl align-middle font-semibold">
          Portfolio
        </p>
        <div className="flex flex-col">
          {topCryptos.map((crypto, i) => {
            return (
              <div key={i} className="flex items-center gap-1">
                <img src={crypto.image} alt="logo" className="w-4 h-4" />
                <p className="font-medium text-base max-sm:text-sm">
                  {crypto.name}:
                </p>
                <p className="text-base max-sm:text-sm">
                  {crypto.current_price}
                </p>
              </div>
            );
          })}
        </div>
        <p className="text-white align-middle max-sm:text-base text-xl">
          Total value{" "}
          <span className="text-white font-semibold">{totalVal}</span>
        </p>
      </div>
      <div className="w-9/12 max-sm:w-full h-full">
        <Pie
          data={{
            labels: topCryptos.map((crypto) => crypto.name),
            datasets: [
              {
                label: "Value",
                data: topCryptos.map((crypto) => crypto.total_volume),
                backgroundColor: ["#FF6361", "#2984C3", "#39C05E"],
                borderColor: ["#FF6361", "#2984C3", "#39C05E"],
              },
            ],
          }} 
          options={{
            plugins: {
              legend: {
                labels: {
                  color: 'black' // Set label color to black
                }
              }
            }
          }}

        />
      </div>
    </div>
  );
};

export default Portfolio;
