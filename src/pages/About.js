import React from "react";
import { GlitchText, Blinker } from "@components/GlitchText";
import { Story } from "@components/";
import { Social } from "@components/";

function About() {
  return (
    <div className="page">
      <div>
        <GlitchText type="large" text="About Me" />
        <Blinker type="large" />
        <h3>A little bit about me and what I do.</h3>
        <Story />
        <Social />
      </div>
    </div>
  );
}

export default About;
