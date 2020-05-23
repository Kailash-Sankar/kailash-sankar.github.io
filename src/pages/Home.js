import React from "react";
import { connecter } from "@store/base";

import { Particles } from "@components";
import { Content } from "@components";

function Home() {
  return (
    <div>
      <Content />
      <Particles />
    </div>
  );
}

export default connecter(Home);
