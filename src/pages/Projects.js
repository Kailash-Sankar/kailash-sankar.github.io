import React, { useEffect } from "react";
import { connecter } from "@store/projects";
import { Deck } from "@components";
import { GlitchText, Blinker } from "@components/GlitchText";
import { Loader } from "@components/";

function Projects({ data, loading, error, init }) {
  useEffect(() => {
    if (data.length <= 0) {
      init();
    }
  }, []);

  return (
    <div className="page">
      <div>
        <GlitchText type="large" text="Projects" />
        <Blinker type="large" />
        <h3>
          Some of the hobby projects I&apos;m working on, pulled from github.
        </h3>
      </div>
      <Loader loading={loading} error={error}>
        <Deck projects={data} />
      </Loader>
    </div>
  );
}

export default connecter(Projects);
