import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/layout/Header";
import { signIn } from "../actions/userAction";
import { Spinner, Alert } from "reactstrap";
import { Redirect } from "react-router-dom";
import { UserContext } from "../UserContext";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright ©  -"}
      <Link
        color="inherit"
        className="text-secondary"
        href="https://facebook.com/ngxba"
      >
        Tung Lam Nguyen Ba
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  const [readyToGo, setReady] = useState(false);

  const context = useContext(UserContext);

  const toggleLoading = (param) => {
    setLoading(param);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    toggleLoading(true);
    if( email.length < 5 || password.length < 5){
      setTimeout(()=>{
        toggleLoading(false);
        setLoginStatus(false)
      },500)
    }
    else{
    setTimeout(async () => {
      const res = await signIn(email, password);
      toggleLoading(false);
      if (res.length === 1) {
        setLoginStatus(true);
        if (rememberMe) {
          localStorage.setItem("name", res[0].name);
          localStorage.setItem("email", res[0].email);
          localStorage.setItem("roll", res[0].roll);
        }
        context.onChangeContext(res[0].name, res[0].email, res[0].roll);
        setTimeout(() => {
          setReady(true);
        }, 1000);
      } else {
        setLoginStatus(false);
      }
    }, 1000);}
  };

  return (
    <React.Fragment>
      {readyToGo && <Redirect to="/" />}
      <Header
        navPosition="right"
        className="reveal-from-bottom"
        isLogining={true}
      />
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          style={{ paddingTop: 120 + "px" }}
        >
          <div className={classes.paper}>
            <Avatar data-aos={"fade-up"} className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              data-aos={"fade-up"}
              component="h1"
              variant="h5"
              className="text-secondary"
            >
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                data-aos={"fade-up"}
                data-aos-duration="2000"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                value={email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                data-aos={"fade-up"}
                data-aos-duration="2100"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                data-aos={"fade-up"}
                data-aos-duration="2200"
                value={rememberMe}
                onChange={() => {
                  setRememberMe(!rememberMe);
                }}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                data-aos={"fade-up"}
                data-aos-duration="2300"
                disabled={loading}
                onClick={handleClick}
              >
                Sign In
              </Button>
              {loginStatus === false && (
                <Alert color="danger">
                  Login FALSE. <em>Email or password are incorrect</em>.
                </Alert>
              )}
              {loginStatus === true && (
                <Alert color="success">Login SUCCESSFUL. Redirecting ...</Alert>
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
              <Grid data-aos={"fade-up"} data-aos-duration="2300" container>
                <Grid item xs>
                  <Link className="text-secondary" href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    to="/register"
                    className="text-secondary"
                    variant="body2"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box data-aos={"fade-up"} data-aos-duration="2300" mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
