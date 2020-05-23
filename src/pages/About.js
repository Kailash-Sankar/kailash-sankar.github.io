import React from "react";
import { GlitchText, Blinker } from "@components/GlitchText";

function About() {
  return (
    <div className="page">
      <div>
        <GlitchText type="large">About Me</GlitchText>
        <Blinker type="large" />
        <h3>A little bit about me and what I do.</h3>
      </div>
    </div>
  );
}

export default About;
