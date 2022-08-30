import type { NextPage } from "next";

import {
  Footer,
  Header,
  AboutUs,
  HeroSection,
  Popular,
  Stats,
} from "../components";

const HomePage: NextPage = () => {
  return (
    <>
      <Header isFixed />
      <HeroSection />
      <AboutUs />
      <Stats />
      <Popular />
      <Footer />
    </>
  );
};

export default HomePage;
