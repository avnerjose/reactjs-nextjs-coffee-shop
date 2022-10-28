import type { NextPage } from "next";

import {
  Footer,
  Header,
  AboutUs,
  HeroSection,
  Popular,
  Stats,
} from "@components";
import Head from "next/head";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | Coffee-Shop</title>
      </Head>
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
