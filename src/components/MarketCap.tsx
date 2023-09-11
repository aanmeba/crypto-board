import { ChartData, Chart, registerables } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { useEffect, useState } from "react";
import { extractLabel, extractNumber } from "../helpers/helpers";
import { GeneralisedCryptoTypeList } from "../common/types_interfaces";

Chart.register(...registerables);

const MarketCap = ({ cryptoData }: GeneralisedCryptoTypeList) => {
  const [result, setResult] = useState<ChartData<"doughnut">>({ datasets: [] });

  const configDataSet = {
    label: "Market Cap",
    fill: true,
  };

  useEffect(() => {
    try {
      setResult({
        labels: extractLabel(cryptoData, "name"),
        datasets: [
          { data: extractNumber(cryptoData, "marketCap"), ...configDataSet },
        ],
      });
    } catch (err) {
      console.log("ERROR --- ", err);
    }
  }, []);

  return (
    <>
      <Doughnut data={result} />
    </>
  );
};

export default MarketCap;
