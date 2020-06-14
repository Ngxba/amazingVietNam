import React from "react";
import PropTypes from "prop-types";
// import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/lab/Rating";

export default function Main(props) {
  const { title, data } = props;
  console.log(data);

  return (
    <Grid item xs={12} md={8}>
      <Typography
        data-aos="fade-up"
        variant="h6"
        gutterBottom
        style={{ color: "black" }}
      >
        {title}
      </Typography>
      <Divider />
      <div data-aos="fade-up">
        {data !== undefined ? (
          data.map((data, index) => {
            return (
              <React.Fragment key={index}>
                <h3 style={{ color: "#93979B" }}>Phần {index + 1}</h3>
                <p>{data}</p>
              </React.Fragment>
            );
          })
        ) : (
          <>
            <h3 style={{ color: "#93979B" }}>
              THIS BLOG NOT HAVE ANY INFORMATION,{" "}
              <em>PLEASE TRY ANOTHER LOCATION!</em>
            </h3>
            <h3 style={{ color: "#93979B" }}>
              THANK YOU FOR THE INCONVENIENCE
            </h3>
          </>
        )}
        <hr />
      </div>
      {data !== undefined && (
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
              style={{ width: "100%" }}
            />
            <br />
            <br />
            <Rating name="size-large" defaultValue={3} size="medium" />
            <br />
            <br />
          </div>
        </React.Fragment>
      )}
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
