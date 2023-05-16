import React, { Component } from "react";
import { Fade } from "react-reveal";
import "./Service.css";
import carescendScreenShot1 from "../../assests/images/carescend_1.png";
import carescendScreenShot2 from "../../assests/images/carescend_2.png";

class Service extends Component {
  render() {
    return (
      <Fade bottom duration={2600} distance="20px">
        <div style={{ textAlign: "center" }}>
          <div
            className="os-charts-body-div"
            style={{ display: "inline-block", marginTop: "30px" }}
          >
            <img
              src={carescendScreenShot1}
              alt="screenShot1"
              style={{
                display: "inline-block",
                objectFit: "cover",
              }}
            ></img>
            <img
              src={carescendScreenShot2}
              alt="screenShot2"
              style={{
                display: "inline-block",
                objectFit: "cover",
              }}
            ></img>
          </div>
        </div>
      </Fade>
    );
  }
}

export default Service;
