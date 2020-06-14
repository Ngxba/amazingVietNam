import React, {useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Header from "../components/layout/Header";
import { signUp } from "../actions/userAction";
import { Spinner, Alert } from "reactstrap";
import {Redirect} from "react-router-dom";
import { UserContext } from "../UserContext";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright ©  -'}
      <Link color="inherit" className="text-secondary" href="https://facebook.com/ngxba">
        Tung Lam Nguyen Ba
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
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
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerStatus, setRegisterStatus] = useState("");
  const [readyToGo, setReady] = useState(false)
  const context = useContext(UserContext);

  const toggleLoading = (p) => {
    setLoading(p);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    toggleLoading(true);
    if(name.length < 5 || email.length < 5 || password.length < 6){
      setTimeout(()=>{
        toggleLoading(false);
        setRegisterStatus(false)
      },500)
    }
    else{
      setTimeout(async () => {
        try {
          await signUp(name, email, password);
          context.onChangeContext(name, email, "");
          setRegisterStatus(true);
          setTimeout(() => {
            setReady(true)
          },1000)
        }
        catch(err) {
          setRegisterStatus(false);
        }
        toggleLoading(false);
      }, 1000);
    }
  };
  return (
    <React.Fragment>
    {readyToGo && <Redirect to="/" />}
      <Header navPosition="right" className="reveal-from-bottom" isLogining={true}/>
      <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{paddingTop: 120 + 'px'}}>
        <div className={classes.paper}>
          <Avatar data-aos={"fade-up"} className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography data-aos={"fade-up"} component="h1" variant="h5" className="text-secondary">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              label="Full Name"
              type="name"
              id="name"
              autoComplete="name"
              autoFocus
              data-aos={"fade-up"} data-aos-duration="2000"
              value = {name}
              onChange = {(event) => {
                  setName(event.target.value);
                }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              data-aos={"fade-up"} data-aos-duration="2100"
              value = {email}
              onChange = {(event) => {
                  setEmail(event.target.value);
                }}
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
              data-aos={"fade-up"} data-aos-duration="2200"
              value = {password}
              onChange = {(event) => {
                  setPassword(event.target.value);
                }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              data-aos={"fade-up"} data-aos-duration="2300"
              onClick = {handleClick}
              disabled={loading}
            >
              Sign Up
            </Button>
            {registerStatus === false && (
                <Alert color="danger">
                  Register FALSE. <em>Email is already existed / Fill the blank with valid data</em>.
                </Alert>
              )}
              {registerStatus === true && (
                <Alert color="success">Register SUCCESSFUL. Redirecting ...</Alert>
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
                <Link href="#" variant="body2" className="text-secondary">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signin" variant="body2" className="text-secondary">
                  {"Already have an account? Login"}
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