import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import FeaturedPost from "./FeaturedPost";
import Sidebar from "./Sidebar";
import { getBlog } from "../../actions/blogAction";
import queryString from "query-string";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { UserContext } from "../../UserContext";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/lab/Rating";
import AddIcon from "@material-ui/icons/Add";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Spinner, Alert } from "reactstrap";
import { createBlog, submitFeedback } from "../../actions/blogAction";
import { Card, CardTitle, CardText } from "reactstrap";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

const mainFeaturedPost = {
  image: require("../../assets/images/hoguom.jpg"),
  imgText: "main image description",
  linkText: "Continue reading…",
};

const featuredPosts = [
  {
    title: "OLD QUATER",
    date: "Jun 1",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: require("../../assets/images/oldquater.jpg"),
    imageText: "Image Text",
    link: "/blog?q=OLD%20QUATER&p=5edb4e16bc11696e47f88c82",
  },
  {
    title: "Ho Chi Minh Mausoleum",
    date: "May 28",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: require("../../assets/images/hochiminhmausoleum.jpg"),
    imageText: "Image Text",
    link: "/blog?q=Ho%20Chi%20Minh%20Mausoleum&p=5edb4f86b0a0cd6eb696eb2e",
  },
];

const sidebar = {
  title: "About us",
  description:
    "Our mission is to help you with the local and find the beauty of Vietnam",
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

export default function Blog({ ...props }) {
  const context = useContext(UserContext);
  const classes = useStyles();

  const [blogData, setBlogData] = useState("");
  const [placeName, setPlaceName] = useState("");

  let mainFeaturedPost = {
    image: require("../../assets/images/hoguom.jpg"),
    imgText: "main image description",
    linkText: "Continue reading…",
  };

  async function fetchData() {
    setPlaceName(queryString.parse(props.location.search).q.replace(/\s/g, "").toLowerCase()); //place name code
    const placeId = queryString.parse(props.location.search).p; //place code
    const res = await getBlog(placeId);
    console.log(res);
    setBlogData(res);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [essay1, setEssay1] = useState("");
  const [essay2, setEssay2] = useState("");
  const [essay3, setEssay3] = useState("");
  const [essay4, setEssay4] = useState("");

  const toggleLoading = (param) => {
    setLoading(param);
  };

  const toggle = () => {
    setModal(!modal);
    toggleLoading(false);
    setCreateStatus("");
    // setPlaceName("");
    setEssay1("");
    setEssay2("");
    setEssay3("");
    setEssay4("");
    setTitle("");
    setDescription("");
  };

  const [createStatus, setCreateStatus] = useState("");

  const handleCreateBlog = (event) => {
    const placeId = queryString.parse(props.location.search).p;
    event.preventDefault();
    toggleLoading(true);
    const essay = [essay1, essay2, essay3, essay4];
    if (title.length <= 10 || description.length <= 10) {
      setCreateStatus(false);
      toggleLoading(false);
    } else {
      setTimeout(async () => {
        try {
          await createBlog(placeName, placeId, description, title, essay);
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

  const [userFeedBack, setUserFeedBack] = useState({
    rating: 3,
    comment: "",
  });

  const [feedbackStatus, setFeedbackStatus] = useState("");

  const handleSubmitFeedBack = async (event) => {
    event.preventDefault();
    const placeId = queryString.parse(props.location.search).p;
    toggleLoading(true);
    setTimeout(async () => {
      try {
        await submitFeedback(placeId, userFeedBack);
        setFeedbackStatus(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (err) {
        setFeedbackStatus(false);
      }
      toggleLoading(false);
    }, 1000);
  };

  return (
    <React.Fragment>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <p style={{ color: "black" }}>
            ADD BLOG DATA FOR <br />
            <em>{placeName}</em>
          </p>
        </ModalHeader>
        <ModalBody>
          <p style={{ color: "black" }}>HEADER DATA</p>
          <TextField
            id="outlined-basic"
            style={{ width: "100%" }}
            label="Title"
            variant="outlined"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
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
          <hr />
          <p style={{ color: "black" }}>MAIN DATA</p>
          <TextField
            id="outlined-basic"
            style={{ width: "100%" }}
            label="Section1"
            variant="outlined"
            value={essay1}
            onChange={(event) => {
              setEssay1(event.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            id="outlined-basic"
            style={{ width: "100%" }}
            label="Section2"
            variant="outlined"
            value={essay2}
            onChange={(event) => {
              setEssay2(event.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            id="outlined-basic"
            style={{ width: "100%" }}
            label="Section3"
            variant="outlined"
            value={essay3}
            onChange={(event) => {
              setEssay3(event.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            id="outlined-basic"
            style={{ width: "100%" }}
            label="Section4"
            variant="outlined"
            value={essay4}
            onChange={(event) => {
              setEssay4(event.target.value);
            }}
          />
        </ModalBody>
        {createStatus === false && (
          <Alert color="danger">
            Create Blog data FALSE. <em>Fill the black with valid data</em>.
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
            <Button color="primary" onClick={handleCreateBlog}>
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
      <CssBaseline />
      <Container style={{ marginTop: "150px" }} maxWidth="lg">
        <main>
          <Paper
            data-aos={"fade-down"}
            data-aos-anchor-placement={"bottom-bottom"}
            className={classes.mainFeaturedPost}
            style={{ backgroundImage: `url(${mainFeaturedPost.image})` }}
          >
            {
              <img
                style={{ display: "none" }}
                src={mainFeaturedPost.image}
                alt={"not found"}
              />
            }
            <div className={classes.overlay} />
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                  >
                    {placeName}
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    {blogData.description}
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    {blogData.description}
                  </Typography>
                  <Link variant="subtitle1" href="#">
                    {mainFeaturedPost.linkText}
                  </Link>
                </div>
              </Grid>
            </Grid>
          </Paper>
          <Grid container spacing={5} className={classes.mainGrid}>
            {/* <Main
              roll={context.userRoll}
              title={blogData.title}
              data={blogData.essay}
            /> */}
            {/* fake main */}
            <Grid item xs={12} md={8}>
              <Typography
                data-aos="fade-up"
                variant="h6"
                gutterBottom
                style={{ color: "black" }}
                className="d-flex justify-content-between"
              >
                {blogData.title}
                {context.userRoll === "admin" && (
                  <div>
                    {blogData !== "" ? (
                      <Button variant="contained" color="primary">
                        <EditIcon />
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={toggle}
                      >
                        <AddIcon />
                      </Button>
                    )}
                    <Button variant="contained" color="secondary">
                      <DeleteIcon />
                    </Button>
                  </div>
                )}
              </Typography>
              <Divider />
              <div data-aos="fade-up">
                {blogData.essay !== undefined ? (
                  blogData.essay.map((data, index) => {
                    return (
                      <React.Fragment key={index}>
                        {data !== "" && (
                          <React.Fragment>
                            <h3 style={{ color: "#93979B" }}>
                              Phần {index + 1}
                            </h3>
                            <p>{data}</p>
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <React.Fragment>
                    {context.userRoll !== "admin" ? (
                      <>
                        {" "}
                        <h3 style={{ color: "#93979B" }}>
                          THIS BLOG NOT HAVE ANY INFORMATION,{" "}
                          <em>PLEASE TRY ANOTHER LOCATION!</em>
                        </h3>
                        <h3 style={{ color: "#93979B" }}>
                          THANK YOU FOR THE INCONVENIENCE
                        </h3>{" "}
                      </>
                    ) : (
                      <>
                        {" "}
                        <h3 style={{ color: "#93979B" }}>
                          THIS BLOG NOT HAVE ANY INFORMATION,{" "}
                          <em>PLEASE TRY EDIT BLOG TO UPDATE INFO!</em>
                        </h3>
                        <h3 style={{ color: "#93979B" }}>THANK YOU {"<3"}</h3>{" "}
                      </>
                    )}
                  </React.Fragment>
                )}
                <hr />
              </div>
              {blogData.essay !== undefined && context.userRoll !== "admin" && (
                <React.Fragment>
                  {" "}
                  <div data-aos="fade-up">
                    <h4 style={{ color: "#4B5E71" }}>VOTING SECTION</h4>
                    <TextField
                      id="outlined-multiline-static"
                      label="Comment"
                      multiline
                      rows={4}
                      placeholder="Very nice write <3"
                      variant="outlined"
                      value={userFeedBack.comment}
                      onChange={(event) => {
                        setUserFeedBack({
                          ...userFeedBack,
                          comment: event.target.value,
                        });
                      }}
                      style={{ width: "100%" }}
                    />
                    <br />
                    <br />
                    <div className="d-flex justify-content-between">
                      <Rating
                        name="size-large"
                        defaultValue={3}
                        size="medium"
                        value={userFeedBack.rating}
                        onChange={(event, value) => {
                          setUserFeedBack({ ...userFeedBack, rating: value });
                        }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmitFeedBack}
                      >
                        SUBMIT
                      </Button>
                    </div>
                    <br />
                    <br />
                    {feedbackStatus === false && (
                      <Alert color="danger">
                        Can not comment, please try again
                      </Alert>
                    )}
                    {feedbackStatus === true && (
                      <Alert color="success">Thank you for your feedback</Alert>
                    )}
                    {loading && (
                      <div style={{ textAlign: "center" }}>
                        <Spinner style={{ width: "3rem", height: "3rem" }} />
                      </div>
                    )}
                  </div>
                  <hr />
                  {blogData.userFeedback.length !== 0 && (
                    <h4 style={{ color: "#4B5E71" }}>
                      OTHERS FEEDBACK SECTION
                    </h4>
                  )}
                  {blogData.userFeedback.map((data, index) => {
                    return (
                      <Card data-aos={"fade-up-left"} body>
                        <CardTitle>
                          <em>Feedback No {index + 1}</em>: {data.comment}
                        </CardTitle>
                        {/* <CardText></CardText> */}
                        <Rating name="read-only" value={data.rating} readOnly />
                      </Card>
                    );
                  })}
                </React.Fragment>
              )}
            </Grid>
            {/* end fake main */}
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              // archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
          <hr />
            <h4 style={{ color: "#4B5E71" }}>OTHER BLOGS</h4>
          <Grid
            data-aos={"fade-up-left"}
            data-aos-anchor-placement={"bottom-bottom"}
            container
            spacing={4}
          >
            {featuredPosts.map((post, index) => (
              <FeaturedPost key={index} post={post} />
            ))}
          </Grid>
          <br></br>
        </main>
      </Container>
    </React.Fragment>
  );
}
