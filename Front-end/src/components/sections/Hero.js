import React, { useState } from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import ButtonGroup from "../elements/ButtonGroup";
import Button from "../elements/Button";
import Image from "../elements/Image";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {
  const outerClasses = classNames(
    "hero section center-content",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "hero-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <section
      {...props}
      className={outerClasses}
      style={{ marginTop: 80 + "px" }}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1
              className="mt-0 mb-16 reveal-from-bottom"
              data-reveal-delay="200"
            >
              Explore Vietnam beauty with{" "}
              <span className="text-color-primary">Amazing Vietnam</span>
            </h1>
            <div className="container-xs">
              <p
                className="m-0 mb-32 reveal-from-bottom"
                data-reveal-delay="400"
              >
                Our mission is to help Vietnam go to world wide and reveal how
                rich reality truly is
              </p>
              <br></br>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <ButtonGroup>
                    <Button tag="button" color="primary" wideMobile href="#" onClick={() => {
                      const placeToGo = document.getElementById("explore");
                      placeToGo.scrollIntoView()
                    }}>
                      Explore Vietnam
                    </Button>
                  <Button tag="a" color="dark" wideMobile href="#" onClick={toggle}>
                    About US
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div
            className="hero-figure reveal-from-bottom illustration-element-01"
            data-reveal-value="20px"
            data-reveal-delay="800"
          >
            <a href="#0" aria-controls="video-modal" onClick={toggle}>
              <Image
                className="has-shadow"
                src={require("../../assets/images/amazingVN.jpg")}
                alt="Amazing Vietnam"
                width={896}
                height={504}
              />
            </a>
          </div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}><p style={{ color: "#696969" }}>About US</p></ModalHeader>
            <ModalBody>
              <p><u>Website creator:</u> Tùng Lâm Nguyễn Bá</p>
              <p><u>Purpose:</u> Our mission is to help Vietnam go to world wide and reveal how
                rich reality truly is</p>
            </ModalBody>
            <ModalFooter>
                <p style={{color: "#6163FF"}}>{"Thank you for visit our website <3"}</p>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;
