import React from "react";
import classnames from "classnames";
import * as styles from "./index.module.less";

function Deck({ projects }) {
  return (
    <div className={classnames("row", styles.container)}>
      {projects.map((p) => (
        <div
          key={p.id}
          className="col-xs-12
          col-sm-8
          col-md-6
          col-lg-4"
        >
          <div className={classnames("box", styles.box)}>
            <div className={styles.title}> {p.name} </div>
            <div className={styles.subtitle}>Last Update: {p.updated_at}</div>
            <div className={styles.description}>{p.description}</div>
            <div className={styles.link}>
              <a target="_blank" rel="noopener noreferrer" href={p.url}>
                More
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Deck;
