import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { CryptoModel } from "../interfaces/crypto";
import { CryptoFilters } from "../interfaces/cypto_enums";
import { API } from "../service/api";
import { cryptoParser } from "../utils/parsers";
import { CryptoDetail } from "./crypto_detail";

export const Home = () => {
  const [cryptos, isLoading] = useFetch<CryptoModel>(API.baseUrl, cryptoParser);

  const [cryptoFiltered, setCyptoFiltered] = useState<CryptoModel[]>([]);

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    setCyptoFiltered(cryptos);
  }, [cryptos]);

  function onChangeSelect({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) {
    let sortedData: CryptoModel[] = [...cryptos];

    // if (value === CryptoFilters.Name) {
    //   sortedData.sort((a: any, b: any) => a.name.localeCompare(b.name));
    // }

    // sortedData.sort((a: any, b: any) => a[value] - b[value]);

    switch (value) {
      case CryptoFilters.Name:
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case CryptoFilters.Price:
        sortedData.sort((a, b) => a.price - b.price);
        break;

      case CryptoFilters.MarketCap:
        sortedData.sort((a, b) => a.marketCap - b.marketCap);
        break;

      case CryptoFilters.CirculatinSupply:
        sortedData.sort((a, b) => a.circulatingSupply - b.circulatingSupply);
        break;
    }

    setCyptoFiltered(sortedData);
  }

  function onClickDetails() {
    console.log("Clicking");
    setShowModal((showModal) => !showModal);
  }

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="App">
      {showModal && <CryptoDetail {...cryptos[0]} />}
      <div>
        <label>Filter By</label>
        <select defaultValue="Name" onChange={onChangeSelect}>
          <option value={0}>...Reset</option>
          <option>Name</option>
          <option>Price</option>
          <option>Market Cap</option>
          <option>Circulating supply</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>Circulating supply</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {cryptoFiltered.map((data: CryptoModel) => (
            <tr key={data.key}>
              <td>Name: {data.name}</td>
              <td>Price: {data.price}</td>
              <td>Market Cap: {data.marketCap}</td>
              <td>Circulating supply: {data.circulatingSupply}</td>
              <td>
                <button onClick={onClickDetails}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
