import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { DungeonMaster, Player } from "./components";

const socketUrl =
  process.env.NODE_ENV === "production"
    ? "wss://142.93.30.81:9000"
    : "ws://localhost:9000";
const socket = new WebSocket(socketUrl);

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    socket.onmessage = ({ data }) => setData(JSON.parse(data));

    return socket.close;
  }, []);

  return (
    <Router>
      <Switch>
        <Route
          path="/player/:id"
          render={({
            match: {
              params: { id }
            }
          }) => <Player data={data} id={id} />}
        />
        <Route
          path="/dm"
          render={() => (
            <DungeonMaster data={data} onUpdate={data => socket.send(data)} />
          )}
        />
        <Route render={() => <Link to="/player/1">Load Player</Link>} />
      </Switch>
    </Router>
  );
}

export default App;
