import React from "react";

import "./Footer.css";
import github from "../../images/github.png";
import ig from "../../images/instagram.png";
import linkedin from "../../images/linkedin.png";

import Icon from "../../components/Icon";

const Footer = () => {
  const myWidth = "6vh";
  const myHeight = "6h";
  return (
    <div className="myFooterContainer bg-light rounded">
      <Icon
        name="gitHub"
        imageUrl={github}
        link="https://github.com/Tod-dev"
        width={myWidth}
        height={myHeight}
      />
      <Icon
        name="Instagram"
        imageUrl={ig}
        link="https://www.instagram.com/marc0todar0/"
        width={myWidth}
        height={myHeight}
      />
      <Icon
        name="linkedin"
        imageUrl={linkedin}
        link="https://www.linkedin.com/in/marco-todaro-155bb5195/"
        width={myWidth}
        height={myHeight}
      />
    </div>
  );
};

export default Footer;
