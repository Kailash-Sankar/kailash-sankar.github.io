import React from "react";
import { connecter } from "@store/base";

import { Particles } from "@components";
import { Content } from "@components";

function Home({ msg }) {
  return (
    <div>
      <h3>{msg}</h3>
      <Content />
      <Particles />
    </div>
  );
}

export default connecter(Home);
