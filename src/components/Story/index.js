import React from "react";
import * as styles from "./index.module.less";

function Story() {
  return (
    <div className={styles.about}>
      <p className={styles.sub}>Developer | Geek | Gamer</p>

      <p> I write code for a living and I love what I do.</p>
      <p>
        <span>TL;DR</span>
        Full stack web developer with over 7.5 years of experience in building
        applications across perl, python and javascript stacks, developing
        RESTful APIS against SQL and NoSQL databases, analytics systems and
        building correpsonding user inferfaces. I am proficent in end to end
        development, from requirement analysis to design, development and CI/CD.
      </p>

      <p>
        <span>More</span>I have a Bachelors degree in Computer Science. After
        graduation, I started as a backend developer on perl (CGI and Catalyst)
        framework. Then I picked the vanilla flavours of frontend - HTML, CSS
        and Javscript. After two years in perl I realized it&apos;s time to pick
        up another language, Python seemed like an obvious choice. I&apos;ve
        build apps in Django, MySQL along with Angular.js, Material design lite
        and Bootstrap.
      </p>

      <p>
        Next I switched my focus on to javascript. I wrote a few plugins in js
        and started working with Node. I worked closely with anlytics teams
        developing APIs which query big data sources like Elasticsearch and
        Cassandra directly.
      </p>
      <p>
        Now I&apos;m working on migrating a legacy Python/Django(v1) application
        on to a modern stack, React/Node(Koa).
      </p>
    </div>
  );
}

export default Story;
export { default as Social } from "./Social";
