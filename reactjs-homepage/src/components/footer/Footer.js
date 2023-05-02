import React from "react";
import "./Footer.css";
import { Fade } from "react-reveal";
import { greeting } from "../../portfolio.js";

export default function Footer(props) {
  return (
    <div className="footer-div">
      <Fade>
        <p className="footer-text" style={{ color: props.theme.secondaryText }}>
          2023 AidenKooG - All rights reserved. by {greeting.title}
        </p>
      </Fade>
    </div>
  );
}
