import React from "react";
import { ClapSpinner } from "react-spinners-kit";

const ClapLoader = () => {
  return (
    <div className="clap-loader w-100 h-100">
      <div className="d-flex align-items-center justify-content-center">
        <ClapLoader size={30} color="#686769" loading={true} />
      </div>
    </div>
  );
};

export default ClapLoader;
