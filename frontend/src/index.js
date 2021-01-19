import React from "react"
import ReactDOM from "react-dom"
import WebSocketInstance from './chat/services/WebSocket';

import Routes from "./routes"

WebSocketInstance.connect();

ReactDOM.render(<Routes />, document.getElementById("root"));