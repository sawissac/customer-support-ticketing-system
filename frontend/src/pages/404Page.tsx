import { IconHelpCircle } from "@tabler/icons-react";
import React from "react";
export const PageNotFound = () => {
  return (
    <div className="notfound">
      <div className="mainbox">
        <div className="mainbox__number">
          <div className="err">4</div>
          <div className="far">
            <IconHelpCircle size={150} />
          </div>
          <div className="err">4</div>
        </div>
        <div className="msg">
          Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
          existed in the first place?
          <p>
            Let's go <a href="/">back</a> and try from there.
          </p>
        </div>
      </div>
    </div>
  );
};
