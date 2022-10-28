import { NextPage } from "next";
import {
  CartTable,
  Footer,
  Header,
  CartFooter,
  CartHero,
  CartEmptyState,
} from "@components";
import { useCart } from "@hooks";
import Head from "next/head";

const Cart: NextPage = () => {
  const { totalProductsAmount } = useCart();
  return (
    <>
      <Head>
        <title>Cart | Coffee-Shop</title>
      </Head>
      <Header isFixed />
      <CartHero />
      {totalProductsAmount > 0 ? (
        <>
          <div className="p-4">
            <CartTable />
          </div>
          <CartFooter />
        </>
      ) : (
        <CartEmptyState />
      )}
      <Footer />
    </>
  );
};

export default Cart;
