import { NextPage } from "next";
import { CartTable, Footer, Header, CartFooter, CartHero } from "../components";

const Cart: NextPage = () => {
  return (
    <>
      <Header isFixed />
      <CartHero />
      <div className="p-4">
        <CartTable />
      </div>
      <CartFooter />
      <Footer />
    </>
  );
};

export default Cart;
