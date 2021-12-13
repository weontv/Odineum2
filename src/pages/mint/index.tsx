import React from "react";
import ReactSlider from "react-slider";
import Header from "./header";
import Footer from "../../components/footer";
import styles from "./Mint.module.scss";


function Mint(this: any) {
  // const [rangeVal, setRangeVal] = useState(0)

  return (
    <div className="mint-bg">
      <Header />
      <div className="py-96 flex flex-col justify-center items-center">
        <button type="button" className={styles.mintBtn}>
          MINT
        </button>
        <ReactSlider
          className="horizontal-slider"
          min={1}
          max={10}
          thumbClassName="example-thumb"
          trackClassName="example-track"
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Mint;