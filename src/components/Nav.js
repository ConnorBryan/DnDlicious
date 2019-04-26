import React from "react";
import { Link } from "react-router-dom";

import "./Nav.scss";

export default function Nav({ entries }) {
  return (
    <ul className="Nav">
      {entries.map(entry => (
        <li key={entry.text}>
          <Link to={entry.path}>{entry.text}</Link>
        </li>
      ))}
    </ul>
  );
}
