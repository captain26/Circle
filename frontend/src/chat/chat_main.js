import React from "react";
import ChatBody from "./components/chatBody/ChatBody";
import Base from "../core/Base";

export default function Chat() {
  return (
      <Base>
    <div className="__main">
      <ChatBody />
    </div>
    </Base>
  );
}