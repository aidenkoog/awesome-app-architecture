import React from "react";
import "./LoaderLogo.css";

import Lottie from "react-lottie";
import animationData from "../../assests/images/splash_lottie.json";

class LogoLoader extends React.Component {
  render() {
    return (
      <div class="nothing">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={400}
          width={400}
        />
      </div>
    );
  }
}

export default LogoLoader;
