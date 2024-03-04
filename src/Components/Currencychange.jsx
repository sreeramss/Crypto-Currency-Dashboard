import { useState } from "react";
import { myCurrencies } from "../Datas/index";
import { useDispatch, useSelector } from "react-redux";
import { currencyOfCountry } from "../Redux/state/Action";

const Currencychange = () => {
  //state variables
    const selectedCurrency = useSelector((state) => state.currentCurrency);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const toggletab = () => {
      setIsOpen((prev) => !prev);
    };
  
    // function to select the crypto currencies from the list
    const selectCurrency = (currency) => {
      dispatch(currencyOfCountry(currency));
      setIsOpen((prev) => !prev);
    };
    return(
    <div className=" bg-sky-400 mx-7 lg:w-1/10  inline-flex hover:ring-4 ring-white/60 hover:bg-sky-400 rounded-md outline outline-white/50 outline-3">
      <div className=" h-14 items-center relative flex text-white">
        <div onClick={toggletab} className="w-14 px-4 font-medium text-lg cursor-pointer rounded-md">
          {selectedCurrency || "Select Currency"}
        </div>
        <div onClick={toggletab} className="h-full relative ">
          <button type="button" className="flex h-full items-center justify-center rounded-md border-1 border-gray-10 px-2 hover:bg-sky-400">
            {!isOpen && <img src="./images/dropdown.svg" alt="" />}
            {isOpen && <img src="./images/dropup.svg" alt="" />}
          </button>
        </div>

        {isOpen && (
          <div className=" rounded-lg text-center w-full min-w-[100px] absolute top-11 right-0 z-10 mt-4 origin-top-right ">
            <div>
              {myCurrencies.map((currency, i) => {
                return (
                  <div key={i} onClick={() => selectCurrency(currency)} className=" hover:bg-sky-600 rounded-md block  px-4 py-2 text-base text-white  outline outline-1 bg-sky-400 cursor-pointer ">
                    {currency}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

    </div>
    )};

export default Currencychange;











// import { useState } from "react";
// import { myCurrencies } from "../Datas/index";
// import { useDispatch, useSelector } from "react-redux";
// import { currencyOfCountry } from "../Redux/state/Action";

// const Currencychange = () => {
//     const selectedCurrency = useSelector((state) => state.currentCurrency);
//     // dispatch to update the states of react-redux
//     const dispatch = useDispatch();
//     const [isOpen, setIsOpen] = useState(false);
  
//     // function to open and close the drop-down on clicking
//     const toggletab = () => {
//       setIsOpen((prev) => !prev);
//     };
  
//     // function to select the crypto currencies from the list
//     const selectCurrency = (currency) => {
//       dispatch(currencyOfCountry(currency));
//       setIsOpen((prev) => !prev);
//     };
//     return(
//             <div className="lg:w-4/12 inline-flex transition ease-in-out hover:ring-2 ring-white ring-offset-slate-50 hover:bg-cyan-600 rounded-md ">
//       <div className="w-full h-12 lg:h-14 items-center relative flex rounded-md bg-white- text-white">
//         <div
//           onClick={toggletab}
//           className="w-full rounded-l-md px-4 py-2 font-medium text-base lg:text-lg cursor-pointer"
//         >
//           {selectedCurrency || "Select Currency"}
//         </div>
//         <div onClick={toggletab} className="">
//           <button
//             type="button"
//             className="flex h-full items-center justify-center rounded-r-md border-1 border-gray-10 px-2 hover:bg-cyan-900"
//           >
//             {!isOpen && <img src="./svg-images/drop-down.svg" alt="" />}
//             {isOpen && <img src="./svg-images/drop-up.svg" alt="" />}
//           </button>
//         </div>

//         {isOpen && (
//           <div className="w-full min-w-[100px] absolute top-11 right-0 z-10 mt-4 origin-top-right rounded-md border border-gray-100  shadow-lg">
//             <div>
//               {myCurrencies.map((currency, i) => {
//                 return (
//                   <div
//                     key={i}
//                     onClick={() => selectCurrency(currency)}
//                     className="block rounded-lg px-4 py-2 text-base text-white no-underline hover:bg-cyan-600 cursor-pointer"
//                   >
//                     {currency}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>

//         </div>
//     )};

// export default Currencychange;