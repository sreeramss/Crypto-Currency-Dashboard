import React, { useState } from "react";
import Cryptocurrencytype from "./Cryptocurrencytype.jsx";
import Charttype from "./Charttype.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Charts } from "./Charts.jsx";
import { numberOfDays } from "../../Redux/state/Action";

const Maindiv = () => {
  //state variables
  const dispatch = useDispatch();
  const selectedCryptocurrency = useSelector(
    (state) => state.currentCryptocurrency
  );
  const selectedCurrency = useSelector((state) => state.currentCurrency);
  const [daysStyle, setDaysStyle] = useState({
    one: false,
    week: false,
    month: false,
    six_months: false,
    year: true,
  });

  const mystyle = ` max-sm:text-xs px-4 py-2 max-lg:px-3 max-sm:rounded-lg rounded-xl bg-sky-500  max-sm:p-1 max-sm:border border-2 hover:ring-2 ring-white/60 cursor-pointer text-whiteva naie  backdrop-blur-md`;
  return (
    <div className="bg-sky-600 bg-opacity-40 lg:mt-8 mt-4 p-1 w-full h-96  shadow-sm transition ease-in-out hover:ring-4 ring-white/60  rounded-md text-white">
      <div className="h-1/6 pt-2">
        <div className="max-sm:h-[68px] pb-1 flex">
          <div className="lg:w-2/12 h-full"></div>
          <div className="w-6/12 lg:w-5/12 h-full flex justify-evenly items-center lg:font-medium">
            <div
              className={`${mystyle} ${
                daysStyle["one"] ? "border-4 border-black/30 text-white" : ""
              }`}
              onClick={() => { dispatch(numberOfDays(1));            //Time frame of one day     
                setDaysStyle({
                  one: true,
                  week: false,
                  month: false,
                  six_months: false,
                  year: false,
                });
              }}
            >
              1D
            </div>
            <div
              className={`${mystyle} ${
                daysStyle["week"] ? "border-4 border-black/30 text-white" : ""
              }`}
              onClick={() => { dispatch(numberOfDays(7));            // Time frame of 7 days 
                setDaysStyle({
                  one: false,
                  week: true,
                  month: false,
                  six_months: false,
                  year: false,
                });
              }}
            >
              1W
            </div>
            <div
              className={`${mystyle} ${
                daysStyle["month"] ? "border-4 border-black/30 text-white" : ""
              }`}
              onClick={() => { dispatch(numberOfDays(30));           //Time frame of 30 days 
                setDaysStyle({
                  one: false,
                  week: false,
                  month: true,
                  six_months: false,
                  year: false,
                });
              }}
            >
              1M
            </div>
            <div
              className={`${mystyle} ${
                daysStyle["six_months"] ? "border-4 border-black/30 text-white" : ""
              }`}
              onClick={() => { dispatch(numberOfDays(180));            //Time frame of 180 days 
                setDaysStyle({
                  one: false,
                  week: false,
                  month: false,
                  six_months: true,
                  year: false,
                });
              }}
            >
              6M
            </div>
            <div
              className={`${mystyle} ${
                daysStyle["year"] ? "border-4 border-black/30 text-white" : ""
              }`} 
              onClick={() => { dispatch(numberOfDays(365));            //Time frame of 365 days
                setDaysStyle({ 
                  one: false,
                  week: false,
                  month: false,
                  six_months: false,
                  year: true,
                });
              }}
            >
              1Y
            </div>
          </div>
          <div className="w-6/12 h-full flex max-sm:flex-col items-center justify-center gap-2 md:gap-4 lg:gap-6">
            {/* exported component of Cryptocurrencytype */}
            <Cryptocurrencytype />
            {/* exported component of Charttype */}
            <Charttype />
          </div>
        </div>
        <div className="flex justify-between px-4 lg:px-14">
          <p className="font-medium">{selectedCurrency}</p>
          <div className="flex gap-1 items-center">
            <div className="w-3 h-3 rounded-full bg-[#f5bb1d]"></div>
            <p className="font-medium">{selectedCryptocurrency}</p>
          </div>
        </div>
      </div>
      <div className="h-5/6">
        <Charts/>
      </div>
    </div>
  );
};

export default Maindiv;