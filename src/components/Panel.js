import React from "react";

import "./Panel.scss";

export default function Panel({ title, children }) {
  return (
    <div className="Panel">
      <h3>{title}</h3>
      <div className="Panel-content">{children}</div>
    </div>
  );
}
