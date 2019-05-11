import React from "react";

interface Props {
  className?: string;
}

const Loader: React.SFC<Props> = ({ className }) => {
  return (
    <div className={`${className} loader-container`}>
      <div className="loader" />
    </div>
  );
};

export default Loader;
