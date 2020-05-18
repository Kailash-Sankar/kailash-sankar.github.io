import React from "react";
import "./index.less";

function GlitchText({ children }) {
  return <div className="title flow-txt">{children}</div>;
}

function Blinker() {
  return <div className="console">_</div>;
}

export { GlitchText, Blinker };
