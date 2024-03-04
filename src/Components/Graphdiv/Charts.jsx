import React, { useEffect, useState } from "react";
import { defaults } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import { HistoricalChart } from "../../api/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const Charts = () => {
  
    // State variables
    const id = useSelector((state) => state.currentCryptocurrency);
    const currency = useSelector((state) => state.currentCurrency);
    const days = useSelector((state) => state.DaysCount);
    const selectedChart = useSelector((state) => state.ChartTypeSelector); 
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(HistoricalChart(id.toLowerCase(), days, currency));             //fetch the data from api folder
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const responseData = await response.json();
                setData(responseData.prices);
            } catch (error) {
                toast.warning("Maximum API calling is reached ");         // Display toast notification on API failure
            }
        };

        fetchData();
    }, [id,days,currency]);

    defaults.maintainAspectRatio = false;
    defaults.responsive = true;
    defaults.plugins.title.display = true;
    defaults.plugins.title.align = "start";
    defaults.plugins.title.font.size = 20;
    defaults.plugins.title.color = "black";

    return (
        <div className="h-full px-4 lg:px-12">
           {/* lineChart */}
            {selectedChart === "Line-Chart" && (
                <Line
                    data={{
                        labels: data.map((coin) => {
                            let date = new Date(coin[0]);
                            let time = (date.getHours() > 12) ? `${date.getHours() - 12}:${date.getMinutes()} PM` :
                                `${date.getHours()}:${date.getMinutes()} AM`;
                            return days === 1 ? time : date.toLocaleDateString();
                        }),
                        datasets: [
                            {
                                label: "Price",
                                data: data.map((element) => element[1]),
                                backgroundColor: "#f5bb1d",
                                borderColor: "#f5bb1d",
                            },
                        ],
                    }}
                    options={{
                        elements: {
                            line: { tension: 0.5 },
                        }, scales: {
                            x: {
                                ticks: {
                                    color: 'black' // Change the text color of bottom data labels
                                }
                            },
                            y: {
                                ticks: {
                                    color: 'black' // Change the text color of left-side data labels
                                }
                            }  
                        },
                        plugins: {
                            legend: {
                                labels: {
                                    color: 'black' // Change the text color of the legend labels
                                }
                            }
                        }
                    }}
                />
            )}
            {/* Vertical Bar chart */}
            {selectedChart === "Vertical-Bar-Chart" && (
                <Bar
                    data={{
                        labels: [
                            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                        ],
                        datasets: [
                            {
                                label: "Price",
                                data: data.map((element) => element[1]),
                                backgroundColor: [
                                    "rgba(43, 63, 229, 0.8)", "rgba(250, 192, 19, 0.8)", "rgba(75, 192, 192, 0.8)",
                                    "rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)", "rgba(255, 206, 86, 0.8)",
                                    "rgba(253, 135, 135, 0.8)"
                                ],
                                borderRadius: 5, 
                            },
                        ],
                    }}
                    options={{
                        scales: {
                            x: {
                                ticks: {
                                    color: 'black' // Change the text color of bottom data labels
                                }
                            },
                            y: {
                                ticks: {
                                    color: 'black' // Change the text color of left-side data labels
                                }
                            }
                        }, // for horizontal bar chart
                        plugins: {
                            legend: {
                                labels: {
                                    color: 'black' // Change the text color of the legend labels
                                }
                            }
                        }
                    }}
                    
                    
                />
            )}
            {/* Horizontal-Bar-Chart */}
            {selectedChart === "Horizontal-Bar-Chart" && (
                <Bar
                    data={{
                        labels: [
                            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                        ],
                        datasets: [
                            {
                                label: "Price",
                                data: data.map((element) => element[1]),
                                backgroundColor: [
                                    "rgba(43, 63, 229, 0.8)", "rgba(250, 192, 19, 0.8)", "rgba(75, 192, 192, 0.8)",
                                    "rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)", "rgba(255, 206, 86, 0.8)",
                                    "rgba(253, 135, 135, 0.8)"
                                ],
                                borderRadius: 5,
                            },
                        ],
                    }}
                    options={{
                        indexAxis: 'y',
                        scales: {
                            x: {
                                ticks: {
                                    color: 'black' // Change the text color of bottom data labels
                                }
                            },
                            y: {
                                ticks: {
                                    color: 'black' // Change the text color of left-side data labels
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                labels: {
                                    color: 'black' // Change the text color of the legend labels
                                }
                            }
                        }
                    }}
                    
                />
            )}
        </div>
    );
};
