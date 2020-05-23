import React from "react";
import "./index.less";
import { GlitchText, Blinker } from "@components/GlitchText";

function Content() {
  return (
    <div className="intro center-this">
      <div className="sub-title">Hi, I&apos;m</div>
      <div className="flex-hz">
        <GlitchText type="large">Kailash Sankar</GlitchText>
        <Blinker type="large" />
      </div>

      <div className="sub-title">A web developer</div>
    </div>
  );
}

export default Content;
