import React, { useState, useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Logo from "./partials/Logo";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Toolbar from "@material-ui/core/Toolbar";
import LinkMaterial from "@material-ui/core/Link";
import { UserContext } from "../../UserContext";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import { updateData } from "../../actions/userAction";
import { Spinner, Alert } from "reactstrap";
// import Modal from "../elements/Modal";

const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool,
  isLogining: PropTypes.bool,
  show: PropTypes.bool,
};

const defaultProps = {
  navPosition: "",
  hideNav: false,
  bottomOuterDivider: false,
  bottomDivider: false,
  isLogining: false,
  show: false,
};

const Header = ({
  className,
  navPosition,
  hideNav,
  bottomOuterDivider,
  bottomDivider,
  isLogining,
  show,
  ...props
}) => {
  const context = useContext(UserContext);
  const [isActive, setIsactive] = useState(false);

  const nav = useRef(null);
  const hamburger = useRef(null);
  const [isModalOpen, setModal] = useState(false);

  const toggleModal = () => setModal(!isModalOpen);

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener("keydown", keyPress);
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("keydown", keyPress);
      document.addEventListener("click", clickOutside);
      closeMenu();
    };
  });

  const handleCheckProfile = () => {
    closeMenu();
    toggleModal();
  };

  const openMenu = () => {
    document.body.classList.add("off-nav-is-active");
    nav.current.style.maxHeight = nav.current.scrollHeight + "px";
    setIsactive(true);
  };

  const closeMenu = () => {
    document.body.classList.remove("off-nav-is-active");
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  };

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  };

  const clickOutside = (e) => {
    if (!nav.current) return;
    if (
      !isActive ||
      nav.current.contains(e.target) ||
      e.target === hamburger.current
    )
      return;
    closeMenu();
  };

  const classes = classNames(
    "site-header",
    bottomOuterDivider && "has-bottom-divider",
    className
  );

  const sections = [
    { title: "Introduction", idTogo: "introduction" },
    { title: "Explore", idTogo: "explore" },
    { title: "Feature", idTogo: "feature" },
    { title: "Opinion", idTogo: "comment" },
  ];
  const handleModalClose = () => {
    toggleModal();
    setIsEditing(false);
    setUpdateStatus("");
    toggleLoading(false);
  };

  const [agreeToChange, setAgreeToChange] = useState(false);
  const handleChangeName = async (event) => {
    event.preventDefault();
    toggleLoading(true);
    if (newName.length <= 5) {
      setTimeout(() => {
        setUpdateStatus(false);
        toggleLoading(false);
      }, 1000);
    } else {
      setTimeout(async () => {
        try {
          await updateData(newName, context.userEmail);
          context.onChangeContext(newName, context.userEmail, context.userRoll);
          localStorage.setItem("name", newName);
          setUpdateStatus(true);
          setIsEditing(false);
          setTimeout(() => {
            handleModalClose();
          }, 500);
        } catch (err) {
          setUpdateStatus(false);
        }
        setAgreeToChange(true);
        toggleLoading(false);
      }, 1000);
    }
  };

  const [isEditing, setIsEditing] = useState(false);

  const SignOut = () => {
    handleModalClose();
    context.onChangeContext("", "", "");
    localStorage.setItem("name", "");
    localStorage.setItem("email", "");
    localStorage.setItem("roll", "");
  };

  const [newName, setNewName] = useState(context.userName);

  const [updateStatus, setUpdateStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const toggleLoading = (p) => {
    setLoading(p);
  };

  return (
    <React.Fragment>
      <Modal isOpen={isModalOpen} toggle={handleModalClose}>
        <ModalHeader toggle={handleModalClose}>
          <p style={{ color: "black" }}>Personal Information</p>
        </ModalHeader>
        <ModalBody>
          {!isEditing ? (
            <p>Name: {!agreeToChange ? context.userName : newName}</p>
          ) : (
            <>
              <TextField
                color={"primary"}
                style={{ width: "100%" }}
                value={newName}
                onChange={(event) => {
                  setNewName(event.target.value);
                }}
                id="standard-basic"
                label="Name"
              />
              <br />
              <br />
            </>
          )}
          <p>Email: {context.userEmail}</p>
          {context.userRoll === "admin" && <p>Roll: {context.userRoll}</p>}
        </ModalBody>
        {updateStatus === false && (
          <Alert color="danger">
            Update FALSE. <em>Please fill with valid name</em>.
          </Alert>
        )}
        {updateStatus === true && (
          <Alert color="success">Update SUCCESSFUL.</Alert>
        )}
        {loading && (
          <div
            data-aos={"fade-up"}
            data-aos-duration="1000"
            style={{ textAlign: "center" }}
          >
            <Spinner style={{ width: "3rem", height: "3rem" }} />
          </div>
        )}
        <ModalFooter className="d-flex justify-content-between">
          <Button color="danger" onClick={SignOut}>
            Sign Out
          </Button>
          <div>
            {!isEditing ? (
              <Button
                color="success"
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                <EditIcon />
              </Button>
            ) : (
              <Button color="success" onClick={handleChangeName}>
                <CheckIcon />
              </Button>
            )}
            <Button color="dark" onClick={handleModalClose}>
              <CloseIcon />
            </Button>
          </div>
        </ModalFooter>
      </Modal>
      <header
        {...props}
        className={(classes, "fixed-top")}
        style={{ backgroundColor: "black" }}
      >
        <div className="container has-bottom-divider">
          <div
            className={classNames(
              "site-header-inner",
              bottomDivider && "has-bottom-divider"
            )}
          >
            <Logo />
            {!hideNav && (
              <>
                <button
                  ref={hamburger}
                  className="header-nav-toggle"
                  onClick={isActive ? closeMenu : openMenu}
                >
                  <span className="screen-reader">Menu</span>
                  <span className="hamburger">
                    <span className="hamburger-inner"></span>
                  </span>
                </button>
                <nav
                  ref={nav}
                  className={classNames("header-nav", isActive && "is-active")}
                  style={{ overflow: "unset" }}
                >
                  <div className="header-nav-inner">
                    <ul
                      className={classNames(
                        "list-reset text-xs",
                        navPosition && `header-nav-${navPosition}`
                      )}
                    >
                      <span style={{ listStyle: "none" }} className="float-end">
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>
                            Places
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem>
                              <Link
                                style={{
                                  color: "#6163FF",
                                  fontWeight: "lighter",
                                }}
                                to="/places?p=NORTHEN%20VIETNAM&q=hanoi"
                                onClick={() => {
                                  closeMenu();
                                  setTimeout(() => {
                                    window.location.reload();
                                  }, 500);
                                }}
                              >
                                Ha Noi
                              </Link>
                            </DropdownItem>
                            <DropdownItem>
                              <Link
                                style={{
                                  color: "#6163FF",
                                  fontWeight: "lighter",
                                }}
                                to="/places?p=CENTRAL%20VIETNAM&q=danang"
                                onClick={() => {
                                  closeMenu();
                                  setTimeout(() => {
                                    window.location.reload();
                                  }, 500);
                                }}
                              >
                                Da Nang
                              </Link>
                            </DropdownItem>
                            <DropdownItem>
                              <Link
                                style={{
                                  color: "#6163FF",
                                  fontWeight: "lighter",
                                }}
                                to="/places?p=SOUTHERN%20VIETNAM&q=hochiminh"
                                onClick={() => {
                                  closeMenu();
                                  setTimeout(() => {
                                    window.location.reload();
                                  }, 500);
                                }}
                              >
                                Ho Chi Minh
                              </Link>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem disabled>
                              <Link to="#0" onClick={closeMenu}>
                                Vietnam
                              </Link>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </span>
                    </ul>
                    <ul className="list-reset header-nav-right">
                      <li>
                        {context.userName !== "" && (
                          <button
                            to="#"
                            className="button button-primary button-wide-mobile button-sm"
                            onClick={handleCheckProfile}
                          >
                            {context.userName}
                          </button>
                        )}
                        {!isLogining && context.userName === "" && (
                          <Link
                            to="/signin"
                            className="button button-primary button-wide-mobile button-sm"
                            onClick={closeMenu}
                          >
                            Sign In
                          </Link>
                        )}
                      </li>
                    </ul>
                  </div>
                </nav>
              </>
            )}
          </div>
        </div>
        {!isLogining && show && (
          <Toolbar
            component="nav"
            variant="dense"
            style={{ justifyContent: "space-around", overflowX: "auto" }}
          >
            {sections.map((section) => (
              <LinkMaterial
                color="inherit"
                noWrap
                key={section.title}
                variant="body2"
                href="#"
                className={classes.toolbarLink}
                onClick={(event) => {
                  event.preventDefault();
                  const placeToGo = document.getElementById(section.idTogo);
                  placeToGo.scrollIntoView();
                }}
              >
                {section.title}
              </LinkMaterial>
            ))}
          </Toolbar>
        )}
      </header>
    </React.Fragment>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
