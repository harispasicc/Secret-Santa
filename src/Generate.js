import React from "react";

function Generate(props) {
  return (
    <button className="generate-button" onClick={props.handleGenerate}>
      Generate
    </button>
  );
}

export default Generate;
