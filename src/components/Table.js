import React from "react";

import "./Table.scss";

export default function Table({ data }) {
  return (
    <div className="Table">
      {data.map((row, index) => (
        <div className="Table-row">
          {row.map(cell => (
            <div className="Table-row-cell">{cell}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
