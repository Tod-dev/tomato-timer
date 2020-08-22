import React from "react";

import "./Footer.css";
import github from "../../images/github.png";
import ig from "../../images/instagram.png";
import linkedin from "../../images/linkedin.png";
import mail from "../../images/mail.png";
import ENV from "../../env";
import Icon from "../../components/Icon";

const Footer = () => {
  const myWidth = "7vh";
  const myHeight = "7vh";
  return (
    <div className="myFooterContainer bg-light rounded">
      <div className="text">Say Hello</div>
      <div className="myIconsContainer ">
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
          name="mail"
          imageUrl={mail}
          link={"copia"}
          text={ENV.mail}
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
    </div>
  );
};

export default Footer;
