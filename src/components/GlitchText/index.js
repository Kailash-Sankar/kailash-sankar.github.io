import React, { useState, useEffect } from "react";
import classnames from "classnames";
import "./index.less";

function GlitchText({ text, type = "default" }) {
  const [txt, setTxt] = useState("");

  useEffect(() => {
    const txtList = text.split("");
    let interval;
    // typing effect
    interval = setInterval(() => {
      if (txtList.length) {
        setTxt((txt) => txt + txtList.shift());
      } else {
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return <div className={classnames("flow-txt", type)}>{txt}</div>;
}

function Blinker({ type = "default" }) {
  return <div className={classnames("console", type)}>_</div>;
}

export { GlitchText, Blinker };
