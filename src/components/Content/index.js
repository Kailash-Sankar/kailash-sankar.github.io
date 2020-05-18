import React from "react";
import "./index.less";
import { GlitchText, Blinker } from "@components/GlitchText";

function Content() {
  return (
    <div className="intro center-this">
      <div className="sub-title">Hi, I&apos;m</div>
      <div className="flex-hz">
        <GlitchText>Kailash Sankar</GlitchText>
        <Blinker />
      </div>

      <div className="sub-title">A web developer</div>
    </div>
  );
}

export default Content;
