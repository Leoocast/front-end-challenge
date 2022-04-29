import { CryptoModel } from "../interfaces/crypto";

const modalStyles: React.CSSProperties = {
  position: "absolute",
  backgroundColor: "#fff",
  height: "40vh",
  width: "50vh",
  top: "5rem",
  left: "25%",
};

const headerStyles = {
  display: "flex",
  justifyContent: "spaceBetween",
};

const width33 = {
  width: "33%",
};

export const CryptoDetail = ({
  price,
  name,
  circulatingSupply,
  marketCap,
}: CryptoModel) => {
  return (
    <div style={modalStyles}>
      <div style={headerStyles}>
        <div style={width33}></div>
        <div style={width33}>Details</div>
        <div style={{ ...width33, textAlign: "right" }}>[X]</div>
      </div>
      <div>Name: {name}</div>
      <div>Usd: {price}</div>
    </div>
  );
};
