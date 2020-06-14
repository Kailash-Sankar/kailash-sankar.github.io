import React from "react";
import * as styles from "./index.module.less";

function Story() {
  return (
    <div className={styles.about}>
      <div className={styles.sub}>Developer | Geek | Gamer</div>

      <div> I write code for a living and I love what I do.</div>

      <div>
        <span>TL;DR</span>
        Full stack web developer with over 7.5 years of experience in building
        applications across Perl, Python and JavaScript stacks, developing
        RESTful APIS against SQL and NoSQL databases, analytics systems and
        building corresponding user interfaces. I am proficient in end to end
        development, from requirement analysis to design, development and CI/CD.
      </div>

      <div>
        <span>Stack</span>
        <ul>
          <li>
            Frontend: JavaScript, React, Redux, Saga, Less (styled-components,
            Typescript)
          </li>
          <li>
            Backend: JavaScript - Node/Express, Python – Django & Flask (Perl -
            CGI & Catalyst)
          </li>
          <li>Database: MySQL, MongoDB (Cassandra, Elasticsearch, Redis)</li>
          <li>CI/CD: Docker, Nginx, CircleCI</li>
        </ul>
      </div>

      <div>
        <span>More</span>I have a Bachelors degree in Computer Science. After
        graduation, I started as a backend developer on Perl (CGI and Catalyst)
        framework. Then I picked the vanilla flavors of frontend - HTML, CSS and
        JavaScript. After two years in Perl I realized it&apos;s time to pick up
        another language, Python seemed like an obvious choice. I&apos;ve built
        apps in Django, MySQL along with Angular.js, Material design lite and
        Bootstrap.
      </div>

      <div>
        Next I switched my focus on to JavaScript. I wrote a few plugins in js
        and started working with Node. I worked closely with anlytics teams
        developing APIs which query big data sources like Elasticsearch and
        Cassandra directly.
      </div>

      <div>
        Now I&apos;m working on migrating a legacy Python/Django(v1) application
        on to a modern stack, React/Node(Koa).
      </div>
    </div>
  );
}

export default Story;
export { default as Social } from "./Social";
