import './App.css';
import CoinExchange from './Components/Coinexchange';
import Coinsearch from './Components/Coinsearch';
import Currencychange from './Components/Currencychange';
import Maindiv from './Components/Graphdiv/Maindiv';
import Marketcap from './Components/Marketcap';
import Navbar from './Components/Navbar';
import Ownername from './Components/Ownername';
import Portfolio from './Components/Portfolio';


function App() {
  return (
    <div className="">
      <Navbar />
      <Ownername/>
      <div className="max-sm:p-2 p-4 flex max-lg:flex-col">
        <div className="lg:w-9/12 mt-[10px]">
          <div className="flex max-lg:flex-col gap-4">
            <Currencychange />
            <Coinsearch />
          </div>
          <Maindiv />
          <div className="mt-4 flex max-lg:flex-col gap-4">
            <Portfolio />
            <CoinExchange />
          </div>
        </div>
        <div className="mt-[10px] lg:w-3/12 lg:ml-4 max-lg:mt-4">
          <Marketcap />
        </div>
      </div>
    </div>
  );
}

export default App;
