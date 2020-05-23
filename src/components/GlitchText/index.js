import React from "react";
import classnames from "classnames";
import "./index.less";

function GlitchText({ children, type = "default" }) {
  return <div className={classnames("flow-txt", type)}>{children}</div>;
}

function Blinker({ type = "default" }) {
  return <div className={classnames("console", type)}>_</div>;
}

export { GlitchText, Blinker };
