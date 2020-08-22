import React, { useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Image from "react-bootstrap/Image";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";

const Icon = (props) => {
  const target = useRef(null);
  const [show, setShow] = useState(false);
  const { name, imageUrl, link, text } = props;

  /*
  useEffect(() => {
    let timer = setTimeout(setShow(false), 5000);
    return () => clearTimeout(timer);
  }, [show]);
*/
  if (link === "copia") {
    let mail = text;
    return (
      <React.Fragment>
        <CopyToClipboard text={mail} onCopy={() => setShow(!show)}>
          <Image
            src={imageUrl}
            alt={name}
            className="pointer iconSize"
            style={{
              width: props.width,
              height: props.height,
            }}
            roundedCircle
            ref={target}
          />
        </CopyToClipboard>
        <Overlay target={target.current} show={show} placement="top">
          {(props) => (
            <Tooltip id="overlay" {...props}>
              Copiata la mail negli appunti!
            </Tooltip>
          )}
        </Overlay>
      </React.Fragment>
    );
  }
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
