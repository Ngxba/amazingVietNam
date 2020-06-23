import React, { useEffect, useState, useContext } from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import PropTypes from "prop-types";
// import Box from '@material-ui/core/Box';
import { makeStyles } from "@material-ui/core/styles";
import {
  getDestination,
  addDestination,
  delDestination,
  updateDestination,
} from "../../actions/placeAction";
import { UserContext } from "../../UserContext";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Spinner, Alert } from "reactstrap";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const propTypes = {
  ...SectionSplitProps.types,
};

const defaultProps = {
  ...SectionSplitProps.defaults,
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  id,
  ...props
}) => {
  const classes = useStyles();
  const context = useContext(UserContext);

  const outerClasses = classNames(
    "features-split section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "features-split-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const splitClasses = classNames(
    "split-wrap",
    invertMobile && "invert-mobile",
    invertDesktop && "invert-desktop",
    alignTop && "align-top"
  );

  const sectionHeader = {
    title: "Popular destination you might interested in",
    paragraph:
      "Our selected destinations below will give you the best view of our nation. Let us help you, let's see Vietnam together. Click each section to see more places at that destination",
  };

  const [destinationData, setDestinationData] = useState([]);

  async function fetchData() {
    try {
      const res = await getDestination();
      setDestinationData(res);
    } catch (err) {
      console.log("get DATA FALSE");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [modal, setModal] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [region, setRegion] = useState("NORTHEN VIETNAM");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const toggle = () => {
    setModal(!modal);
    toggleLoading(false);
    setCreateStatus("");
    setCity("");
    setDescription("");
  };

  const toggleConfirm = () => {
    setModalConfirm(!modalConfirm);
    toggleLoading();
  };

  const handleChangeRegion = (event) => {
    setRegion(event.target.value);
  };
  const [loading, setLoading] = useState(false);
  const [createStatus, setCreateStatus] = useState("");
  const toggleLoading = (param) => {
    setLoading(param);
  };

  const handleCreateDestination = async (event) => {
    event.preventDefault();
    toggleLoading(true);
    if (city.length <= 2 || description.length <= 20) {
      setCreateStatus(false);
      toggleLoading(false);
    } else {
      setTimeout(async () => {
        try {
          await addDestination(region, city, description);
          setCreateStatus(true);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } catch (err) {
          setCreateStatus(false);
        }
        toggleLoading(false);
      }, 1000);
    }
  };

  const [confirmData, setConfirmData] = useState({
    title: "DELETE CONFIRMATION",
    destination: "UNDEFINED",
    region: "UNDEFINED",
  });

  const [deleteStatus, setDeleteStatus] = useState("");
  const handleDeleteConfim = async () => {
    toggleLoading(true);
    setTimeout(async () => {
      try {
        await delDestination(confirmData.region, confirmData.destination);
        setDeleteStatus(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (err) {
        setDeleteStatus(false);
      }
      toggleLoading(false);
    }, 1000);
  };

  const deleteDestination = (region, city) => {
    setConfirmData({
      ...confirmData,
      destination: city,
      region: region,
    });
    toggleConfirm();
  };

  const [updateModal, setUpdateModal] = useState("");

  const [updateStatus, setUpdateStatus] = useState("");

  const toggleUpdateModal = () => {
    setUpdateModal(!updateModal);
    toggleLoading(false);
    setUpdateStatus("");
  };

  const handleUpdateDestination = () => {
    toggleLoading(true);
    if (city.length <= 4 || description.length <= 20) {
      setTimeout(() => {
        setUpdateStatus(false);
        toggleLoading(false);
      }, 1000);
    } else {
      setTimeout(async () => {
        try {
          await updateDestination(
            region,
            city,
            description,
            updateDestinationID
          );
          setUpdateStatus(true);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } catch (err) {
          setUpdateStatus(false);
        }
        toggleLoading(false);
      }, 1000);
    }
  };

  const [updateDestinationID, setUpdateDestinationID] = useState("");
  const updateDestinationData = (region, city, description, id) => {
    console.log(region, city, description, id)
    setCity(city);
    setRegion(region);
    setDescription(description);
    setUpdateDestinationID(id);
    toggleUpdateModal();
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <p style={{ color: "black" }}>ADD DESTINATION</p>
        </ModalHeader>
        <ModalBody>
          <TextField
            id="outlined-basic"
            style={{ width: "100%" }}
            label="City"
            variant="outlined"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            id="outlined-basic"
            style={{ width: "100%" }}
            label="Description"
            variant="outlined"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <br />
          <br />
          <FormControl>
            <InputLabel
              id="demo-simple-select-helper-label"
              style={{ width: "100%" }}
            >
              Region
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={region}
              onChange={handleChangeRegion}
            >
              <MenuItem value={"NORTHEN VIETNAM"}>NORTHEN VIETNAM</MenuItem>
              <MenuItem value={"CENTRAL VIETNAM"}>CENTRAL VIETNAM</MenuItem>
              <MenuItem value={"SOUTHERN VIETNAM"}>SOUTHERN VIETNAM</MenuItem>
            </Select>
            <FormHelperText>Please choose one option</FormHelperText>
          </FormControl>
        </ModalBody>
        {createStatus === false && (
          <Alert color="danger">
            Create new Destination FALSE.{" "}
            <em>
              Fill the black with valid data / Destination already existed
            </em>
            .
          </Alert>
        )}
        {createStatus === true && (
          <Alert color="success">Create SUCCESSFUL.</Alert>
        )}
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spinner style={{ width: "3rem", height: "3rem" }} />
          </div>
        )}
        <ModalFooter>
          {createStatus === true ? (
            <Button color="primary" onClick={toggle}>
              DONE
            </Button>
          ) : (
            <Button color="primary" onClick={handleCreateDestination}>
              SAVE
            </Button>
          )}
          {!createStatus && (
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          )}
        </ModalFooter>
      </Modal>
      {/* modal for updating below */}
      <Modal isOpen={updateModal} toggle={toggleUpdateModal}>
        <ModalHeader toggle={toggleUpdateModal}>
          <p style={{ color: "black" }}>Update Destination</p>
        </ModalHeader>
        <ModalBody>
          <TextField
            id="outlined-basic"
            style={{ width: "100%" }}
            label="City"
            variant="outlined"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            id="outlined-basic"
            style={{ width: "100%" }}
            label="Description"
            variant="outlined"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <br />
          <br />
          <FormControl>
            <InputLabel
              id="demo-simple-select-helper-label"
              style={{ width: "100%" }}
            >
              Region
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={region}
              onChange={handleChangeRegion}
            >
              <MenuItem value={"NORTHEN VIETNAM"}>NORTHEN VIETNAM</MenuItem>
              <MenuItem value={"CENTRAL VIETNAM"}>CENTRAL VIETNAM</MenuItem>
              <MenuItem value={"SOUTHERN VIETNAM"}>SOUTHERN VIETNAM</MenuItem>
            </Select>
            <FormHelperText>Please choose one option</FormHelperText>
          </FormControl>
        </ModalBody>
        {updateStatus === false && (
          <Alert color="danger">
            Update Destination FALSE.{" "}
            <em>
              Fill the black with valid data / Destination already existed
            </em>
            .
          </Alert>
        )}
        {updateStatus === true && (
          <Alert color="success">Update SUCCESSFUL.</Alert>
        )}
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spinner style={{ width: "3rem", height: "3rem" }} />
          </div>
        )}
        <ModalFooter>
          {updateStatus === true ? (
            <Button color="primary" onClick={toggleUpdateModal}>
              DONE
            </Button>
          ) : (
            <Button color="primary" onClick={handleUpdateDestination}>
              SAVE
            </Button>
          )}
          {!updateStatus && (
            <Button color="secondary" onClick={toggleUpdateModal}>
              Cancel
            </Button>
          )}
        </ModalFooter>
      </Modal>
      {/* finish modal */}
      <section {...props} className={outerClasses}>
        <div id={id} className="container">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content" />
            <Modal isOpen={modalConfirm} toggle={toggleConfirm}>
                <ModalHeader toggle={toggleConfirm}>
                  <p style={{ color: "#696969" }}>{confirmData.title}</p>
                  <em style={{ color: "#808080", fontSize: "15px" }}>
                    {confirmData.region}
                  </em>
                  <br />
                </ModalHeader>
                <ModalBody>
                  <p style={{ color: "#808080" }}>
                    Are you sure to delete ALL information about{" "}
                    <u>{confirmData.destination}</u> ?
                  </p>
                </ModalBody>
                {deleteStatus === false && (
                  <Alert color="danger">
                    Delete Destination FALSE.{" "}
                    <em>Some Err Orcur, please try again</em>.
                  </Alert>
                )}
                {deleteStatus === true && (
                  <Alert color="success">Delete SUCCESSFUL.</Alert>
                )}
                {loading && (
                  <div style={{ textAlign: "center" }}>
                    <Spinner style={{ width: "3rem", height: "3rem" }} />
                  </div>
                )}
                <ModalFooter>
                  {deleteStatus === true ? (
                    <Button color="primary" onClick={toggleConfirm}>
                      DONE
                    </Button>
                  ) : (
                    <Button color="primary" onClick={handleDeleteConfim}>
                      Yes
                    </Button>
                  )}
                  {!deleteStatus && (
                    <Button color="secondary" onClick={toggleConfirm}>
                      Cancel
                    </Button>
                  )}
                </ModalFooter>
              </Modal>
            <div className={splitClasses}>
            <AppBar  position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
                className="d-flex justify-content-center"
              >
                <Tab label="NORTHEN VIETNAM" {...a11yProps(0)} />
                <Tab label="CENTRAL VIETNAM" {...a11yProps(1)} />
                <Tab label="SOUTHERN VIETNAM" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
            {destinationData.map((data, index) => {
              if(data.region === "NORTHEN VIETNAM"){
                if (index % 2 === 0) {
                  return (
                    <div key={index} className="split-item">
                      <div
                        className="split-item-content center-content-mobile reveal-from-left"
                        data-reveal-container=".split-item"
                        data-aos={"fade-up"}
                        data-aos-duration="2000"
                      >
                        <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                          {data.region}
                        </div>
                        <h3 className="mt-0 mb-12 d-flex justify-content-between">
                          <Link
                            to={`/places?p=${data.region}&q=${data.city
                              .replace(/\s/g, "")
                              .toLowerCase()}`}
                          >
                            {data.city}
                          </Link>
                          {context.userRoll === "admin" && (
                            <span>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  updateDestinationData(
                                    data.region,
                                    data.city,
                                    data.description,
                                    data._id
                                  );
                                }}
                              >
                                <EditIcon />
                              </Button>
                              <Button
                                variant="contained"
                                onClick={() => {
                                  deleteDestination(data.region, data.city);
                                }}
                                color="secondary"
                              >
                                <DeleteIcon />
                              </Button>
                            </span>
                          )}
                        </h3>
                        <Rating
                          name="half-rating-read"
                          defaultValue={4.5}
                          precision={0.5}
                          readOnly
                        />
                        <p className="m-0">{data.description}</p>
                      </div>
                      <div
                        className={classNames(
                          "split-item-image center-content-mobile reveal-from-bottom",
                          imageFill && "split-item-image-fill"
                        )}
                        data-reveal-container=".split-item"
                        data-aos={"fade-up"}
                        data-aos-duration="2000"
                      >
                        <Image
                          src={require("./../../assets/images/hanoi.jpg")}
                          alt="Features split 01"
                          width={528}
                          height={396}
                        />
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className="split-item">
                      <div
                        className="split-item-content center-content-mobile reveal-from-right"
                        data-reveal-container=".split-item"
                        data-aos={"fade-up"}
                        data-aos-duration="2000"
                      >
                        <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                          {data.region}
                        </div>
                        <h3 className="mt-0 mb-12 d-flex justify-content-between">
                          <Link
                            to={`/places?p=${data.region}&q=${data.city
                              .replace(/\s/g, "")
                              .toLowerCase()}`}
                          >
                            {data.city}
                          </Link>
                          {context.userRoll === "admin" && (
                            <span>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  updateDestinationData(
                                    data.region,
                                    data.city,
                                    data.description,
                                    data._id
                                  );
                                }}
                              >
                                <EditIcon />
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                  deleteDestination(data.region, data.city);
                                }}
                              >
                                <DeleteIcon />
                              </Button>
                            </span>
                          )}
                        </h3>
                        <Rating
                          name="half-rating-read"
                          defaultValue={4.0}
                          precision={0.5}
                          readOnly
                        />
                        <p className="m-0">{data.description}</p>
                      </div>
                      <div
                        className={classNames(
                          "split-item-image center-content-mobile reveal-from-bottom",
                          imageFill && "split-item-image-fill"
                        )}
                        data-reveal-container=".split-item"
                        data-aos={"fade-up"}
                        data-aos-duration="2000"
                      >
                        <Image
                          src={require("./../../assets/images/bacninh.jpg")}
                          alt="Features split 02"
                          width={528}
                          height={396}
                        />
                      </div>
                    </div>
                  );
                }
              }})}
            </TabPanel>
            <TabPanel value={value} index={1}>
            {destinationData.map((data, index) => {
              if(data.region === "CENTRAL VIETNAM"){
                if (index % 2 === 0) {
                  return (
                    <div key={index} className="split-item">
                      <div
                        className="split-item-content center-content-mobile reveal-from-left"
                        data-reveal-container=".split-item"
                        data-aos={"fade-up"}
                        data-aos-duration="2000"
                      >
                        <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                          {data.region}
                        </div>
                        <h3 className="mt-0 mb-12 d-flex justify-content-between">
                          <Link
                            to={`/places?p=${data.region}&q=${data.city
                              .replace(/\s/g, "")
                              .toLowerCase()}`}
                          >
                            {data.city}
                          </Link>
                          {context.userRoll === "admin" && (
                            <span>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  updateDestinationData(
                                    data.region,
                                    data.city,
                                    data.description,
                                    data._id
                                  );
                                }}
                              >
                                <EditIcon />
                              </Button>
                              <Button
                                variant="contained"
                                onClick={() => {
                                  deleteDestination(data.region, data.city);
                                }}
                                color="secondary"
                              >
                                <DeleteIcon />
                              </Button>
                            </span>
                          )}
                        </h3>
                        <Rating
                          name="half-rating-read"
                          defaultValue={4.5}
                          precision={0.5}
                          readOnly
                        />
                        <p className="m-0">{data.description}</p>
                      </div>
                      <div
                        className={classNames(
                          "split-item-image center-content-mobile reveal-from-bottom",
                          imageFill && "split-item-image-fill"
                        )}
                        data-reveal-container=".split-item"
                        data-aos={"fade-up"}
                        data-aos-duration="2000"
                      >
                        <Image
                          src={require("./../../assets/images/danang.jpg")}
                          alt="Features split 01"
                          width={528}
                          height={396}
                        />
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className="split-item">
                      <div
                        className="split-item-content center-content-mobile reveal-from-right"
                        data-reveal-container=".split-item"
                        data-aos={"fade-up"}
                        data-aos-duration="2000"
                      >
                        <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                          {data.region}
                        </div>
                        <h3 className="mt-0 mb-12 d-flex justify-content-between">
                          <Link
                            to={`/places?p=${data.region}&q=${data.city
                              .replace(/\s/g, "")
                              .toLowerCase()}`}
                          >
                            {data.city}
                          </Link>
                          {context.userRoll === "admin" && (
                            <span>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  updateDestinationData(
                                    data.region,
                                    data.city,
                                    data.description,
                                    data._id
                                  );
                                }}
                              >
                                <EditIcon />
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                  deleteDestination(data.region, data.city);
                                }}
                              >
                                <DeleteIcon />
                              </Button>
                            </span>
                          )}
                        </h3>
                        <Rating
                          name="half-rating-read"
                          defaultValue={4.0}
                          precision={0.5}
                          readOnly
                        />
                        <p className="m-0">{data.description}</p>
                      </div>
                      <div
                        className={classNames(
                          "split-item-image center-content-mobile reveal-from-bottom",
                          imageFill && "split-item-image-fill"
                        )}
                        data-reveal-container=".split-item"
                        data-aos={"fade-up"}
                        data-aos-duration="2000"
                      >
                        <Image
                          src={require("./../../assets/images/hoian.jpg")}
                          alt="Features split 02"
                          width={528}
                          height={396}
                        />
                      </div>
                    </div>
                  );
                }
              }})}
            </TabPanel>
            <TabPanel value={value} index={2}>
            {destinationData.map((data, index) => {
              if(data.region === "SOUTHERN VIETNAM"){
                if (index % 2 === 0) {
                  return (
                    <div key={index} className="split-item">
                      <div
                        className="split-item-content center-content-mobile reveal-from-left"
                        data-reveal-container=".split-item"
                        data-aos={"fade-up"}
                        data-aos-duration="2000"
                      >
                        <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                          {data.region}
                        </div>
                        <h3 className="mt-0 mb-12 d-flex justify-content-between">
                          <Link
                            to={`/places?p=${data.region}&q=${data.city
                              .replace(/\s/g, "")
                              .toLowerCase()}`}
                          >
                            {data.city}
                          </Link>
                          {context.userRoll === "admin" && (
                            <span>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  updateDestinationData(
                                    data.region,
                                    data.city,
                                    data.description,
                                    data._id
                                  );
                                }}
                              >
                                <EditIcon />
                              </Button>
                              <Button
                                variant="contained"
                                onClick={() => {
                                  deleteDestination(data.region, data.city);
                                }}
                                color="secondary"
                              >
                                <DeleteIcon />
                              </Button>
                            </span>
                          )}
                        </h3>
                        <Rating
                          name="half-rating-read"
                          defaultValue={4.5}
                          precision={0.5}
                          readOnly
                        />
                        <p className="m-0">{data.description}</p>
                      </div>
                      <div
                        className={classNames(
                          "split-item-image center-content-mobile reveal-from-bottom",
                          imageFill && "split-item-image-fill"
                        )}
                        data-reveal-container=".split-item"
                        data-aos={"fade-up"}
                        data-aos-duration="2000"
                      >
                        <Image
                          src={require("./../../assets/images/condao.jpg")}
                          alt="Features split 01"
                          width={528}
                          height={396}
                        />
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className="split-item">
                      <div
                        className="split-item-content center-content-mobile reveal-from-right"
                        data-reveal-container=".split-item"
                        data-aos={"fade-up"}
                        data-aos-duration="2000"
                      >
                        <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                          {data.region}
                        </div>
                        <h3 className="mt-0 mb-12 d-flex justify-content-between">
                          <Link
                            to={`/places?p=${data.region}&q=${data.city
                              .replace(/\s/g, "")
                              .toLowerCase()}`}
                          >
                            {data.city}
                          </Link>
                          {context.userRoll === "admin" && (
                            <span>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  updateDestinationData(
                                    data.region,
                                    data.city,
                                    data.description,
                                    data._id
                                  );
                                }}
                              >
                                <EditIcon />
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                  deleteDestination(data.region, data.city);
                                }}
                              >
                                <DeleteIcon />
                              </Button>
                            </span>
                          )}
                        </h3>
                        <Rating
                          name="half-rating-read"
                          defaultValue={4.0}
                          precision={0.5}
                          readOnly
                        />
                        <p className="m-0">{data.description}</p>
                      </div>
                      <div
                        className={classNames(
                          "split-item-image center-content-mobile reveal-from-bottom",
                          imageFill && "split-item-image-fill"
                        )}
                        data-reveal-container=".split-item"
                        data-aos={"fade-up"}
                        data-aos-duration="2000"
                      >
                        <Image
                          src={require("./../../assets/images/hochiminh.jpg")}
                          alt="Features split 02"
                          width={528}
                          height={396}
                        />
                      </div>
                    </div>
                  );
                }
              }})}
            </TabPanel>
            </div>
          </div>
          <div style={{ textAlign: "center" }} className={classes.root}>
            {context.userRoll === "admin" && (
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AddCircleOutlineIcon />}
                onClick={toggle}
              >
                ADD DESTINATION
              </Button>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
