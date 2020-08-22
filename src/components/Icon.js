import React from "react";

import Image from "react-bootstrap/Image";

const Icon = (props) => {
  const { name, imageUrl, link, text } = props;
  if (ca)
    const imageClickedHandler = () => {
      window.location.href = link;
    };
  return (
    <Image
      src={imageUrl}
      alt={name}
      className="pointer iconSize"
      style={{
        width: props.width,
        height: props.height,
      }}
      onClick={imageClickedHandler}
      roundedCircle
    />
  );
};

export default Icon;
