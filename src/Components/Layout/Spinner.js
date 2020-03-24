import React, { Fragment } from "react";
import spinners from "./spinner.gif";

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinners}
        alt="Loading"
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
    </Fragment>
  );
};

export default Spinner;
