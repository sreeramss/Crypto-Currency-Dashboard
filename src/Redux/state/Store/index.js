import { createStore, combineReducers } from "redux";
import { currentCryptocurrency,currentCurrency,DaysCount ,ChartTypeSelector } from "../Reducer";

// Redux store
export const store = createStore(
    combineReducers({
        currentCryptocurrency: currentCryptocurrency,
        currentCurrency: currentCurrency,
        DaysCount: DaysCount,
        ChartTypeSelector: ChartTypeSelector,
    })
    )