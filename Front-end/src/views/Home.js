import React from "react";
// import sections
import Hero from "../components/sections/Hero";
import FeaturesTiles from "../components/sections/FeaturesTiles";
import FeaturesSplit from "../components/sections/FeaturesSplit";
import Testimonial from "../components/sections/Testimonial";
import Cta from "../components/sections/Cta";
import Header from "../components/layout/Header";

const Home = () => {
  return (
    <React.Fragment>
      <Header navPosition="right" className="reveal-from-bottom" show={true}/>
      <Hero id="introduction" className="illustration-section-01" />
      <FeaturesSplit
        id="explore"
        invertMobile
        topDivider
        imageFill
        className="illustration-section-02"
      />
      <FeaturesTiles id="feature" topDivider />
      <Testimonial id="comment" topDivider />
      <Cta split />
    </React.Fragment>
  );
};

export default Home;
