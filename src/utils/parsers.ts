export function cryptoParser<Type>(rawData: any) {
  const parsedData = Object.keys(rawData["RAW"]).map((key: string) => {
    return {
      key: key,
      price: rawData["RAW"][key]["USD"]["PRICE"],
      marketCap: rawData["RAW"][key]["USD"]["MKTCAP"],
      circulatingSupply: rawData["RAW"][key]["USD"]["SUPPLY"],
      name: rawData["RAW"][key]["USD"]["FROMSYMBOL"],
    };
  });

  return parsedData;
}
