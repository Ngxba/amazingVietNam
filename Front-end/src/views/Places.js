import React, { useEffect, useState, useContext } from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../utils/SectionProps";
import SectionHeader from "../components/sections/partials/SectionHeader";
import Image from "../components/elements/Image";
import queryString from "query-string";
import { getPlacesOfADestination, addPlace, delPlace, updatePlace } from "../actions/placeAction";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
// import {DestinationContext} from "../DestinationContext"
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { UserContext } from "../UserContext";
import TextField from "@material-ui/core/TextField";
import { Spinner, Alert } from "reactstrap";

const propTypes = {
  ...SectionSplitProps.types,
};

const defaultProps = {
  ...SectionSplitProps.defaults,
};

const Places = ({
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
  const [placesData, setPlacesData] = useState([]);
  const [cityName, setCityName] = useState("");
  const [regionName, setRegionName] = useState("");

  const context = useContext(UserContext);

  async function fetchData() {
    const city = queryString.parse(props.location.search).q; //city code
    const region = queryString.parse(props.location.search).p; //region code
    const res = await getPlacesOfADestination(city.toUpperCase());
    setCityName(city.toUpperCase());
    setRegionName(region);
    setPlacesData(res);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

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
    title: cityName + " CITY",
    paragraph:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua — Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };

  const [modal, setModal] = useState(false);
  const [description, setDescription] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [createStatus, setCreateStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const toggle = () => {
    setModal(!modal);
    toggleLoading(false);
    setCreateStatus("");
    setPlaceName("");
    setDescription("");
  };
  const toggleLoading = (param) => {
    setLoading(param);
  };
  const handleCreatePlace = async (event) => {
    // await addPlace(regionName,cityName,"abc", "abc")
    event.preventDefault();
    toggleLoading(true);
    if (placeName.length <= 2 || description.length <= 20) {
      setCreateStatus(false);
      toggleLoading(false);
    } else {
      setTimeout(async () => {
        try {
          await addPlace(regionName, cityName, placeName, description);
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
    place: "UNDEFINED",
  });

  const [deleteStatus, setDeleteStatus] = useState("");
  const handleDeleteConfirm = async () => {
    toggleLoading(true);
    setTimeout(async () => {
      try {
        await delPlace(confirmData.region, confirmData.destination, confirmData.place)
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

  const deletePlace = (region, city, place) => {
    setConfirmData({
      ...confirmData,
      destination: city,
      region: region,
      place: place,
    });
    toggleConfirm();
  };

  const [modalConfirm, setModalConfirm] = useState(false);

  const toggleConfirm = () => {
    setModalConfirm(!modalConfirm);
    toggleLoading()
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
    if (placeName.length <= 4 || description.length <= 20) {
      setTimeout(() => {
        setUpdateStatus(false);
        toggleLoading(false);
      }, 1000);
    } else {
      setTimeout(async () => {
        try {
          await updatePlace(regionName, placeName, description, updateDestinationID);
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

  const [updateDestinationID, setUpdateDestinationID] = useState("")
  const updateDestinationData = (region, name, description, id) => {
    setPlaceName(name)
    setDescription(description);
    setUpdateDestinationID(id)
    toggleUpdateModal();
  };

  return (
    <React.Fragment>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <p style={{ color: "black" }}>ADD PLACE</p>
        </ModalHeader>
        <ModalBody>
          <TextField
            id="outlined-basic"
            style={{ width: "100%" }}
            label="Place Name"
            variant="outlined"
            value={placeName}
            onChange={(event) => {
              setPlaceName(event.target.value);
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
            <Button color="primary" onClick={handleCreatePlace}>
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
          <p style={{ color: "black" }}>Update Place</p>
        </ModalHeader>
        <ModalBody>
          <TextField
            id="outlined-basic"
            style={{ width: "100%" }}
            label="City"
            variant="outlined"
            value={placeName}
            onChange={(event) => {
              setPlaceName(event.target.value);
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
        </ModalBody>
        {updateStatus === false && (
          <Alert color="danger">
            Update Place FALSE.{" "}
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
      <section
        {...props}
        className={outerClasses}
        style={{ paddingTop: 100 + "px" }}
      >
        <div id={id} className="container">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content" />
            <div className={splitClasses}>
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
                    Are you sure to delete information about place{" "}
                    <u>{confirmData.place}</u> in{" "}
                    <u>{confirmData.destination} city</u> ?
                  </p>
                </ModalBody>
                {deleteStatus === false && (
                  <Alert color="danger">
                    Delete Place FALSE.{" "}
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
                    <Button color="primary" onClick={handleDeleteConfirm}>
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
              {placesData.length !== 0 ? (
                placesData.map((data, index) => {
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
                              to={`/blog?q=${data.name}&p=${data._id}`}
                            >
                              {data.name}
                            </Link>
                            {context.userRoll === "admin" && (
                              <span>
                                <Button variant="contained" color="primary" onClick={() => {
                                  updateDestinationData(
                                    data.region,
                                    data.name,
                                    data.description,
                                    data._id
                                  );
                                }}>
                                  <EditIcon />
                                </Button>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => {
                                    deletePlace(
                                      data.region,
                                      data.city,
                                      data.name
                                    );
                                  }}
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
                            src={require("../assets/images/hoguom.jpg")}
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
                              to={`/blog?q=${data.name}&p=${data._id}`}
                            >
                              {data.name}
                            </Link>
                            {context.userRoll === "admin" && (
                              <span>
                                <Button variant="contained" color="primary" onClick={() => {
                                  updateDestinationData(
                                    data.region,
                                    data.name,
                                    data.description,
                                    data._id
                                  );
                                }}>
                                  <EditIcon />
                                </Button>
                                <Button variant="contained" color="secondary" onClick={() => {
                                    deletePlace(
                                      data.region,
                                      data.city,
                                      data.name
                                    );
                                  }}>
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
                            src={require("../assets/images/oldquater.jpg")}
                            alt="Features split 02"
                            width={528}
                            height={396}
                          />
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                <h1>404 NOT FOUND</h1>
              )}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            {context.userRoll === "admin" && (
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AddCircleOutlineIcon />}
                onClick={toggle}
              >
                ADD PLACE AT {sectionHeader.title}
              </Button>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

Places.propTypes = propTypes;
Places.defaultProps = defaultProps;

export default Places;
