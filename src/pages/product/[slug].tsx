import { PrismicRichText } from "@prismicio/react";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Footer, Header, StarRating } from "@components";
import { GetProductBySlugQuery } from "@codegen/graphql";
import { ssrGetProductBySlug } from "@codegen/page";
import { useCart } from "@hooks";
import { withApollo } from "../../lib/Apollo/withApollo";

type ProductProps = {
  data?: GetProductBySlugQuery;
};

const Product: NextPage<ProductProps> = ({ data }) => {
  const [amount, setAmount] = useState(1);
  const { addProductToCart } = useCart();

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) < 1) {
      setAmount(1);
      return;
    }

    setAmount(parseInt(e.target.value));
  };

  const product = {
    ...data?.product,
    coffeeStrength: data?.product?.coffee_strength || 0,
  };

  return (
    <>
      <Header />
      <section className="max-w-screen-xl mx-auto p-8">
        <div className="flex items-center justify-center gap-16 flex-col lg:flex-row">
          <div>
            <div className="relative h-[384px] w-[184px]">
              <Image
                layout="fill"
                src={product?.image?.url}
                alt="costa rica coffee"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 max-w-2xl">
            <h2 className="font-title text-2xl">{product?.name}</h2>
            <StarRating rating={product.rating || 0} />
            <span className="uppercase text-sm text-gray-400">
              {product?.category}
            </span>
            <PrismicRichText field={product.description} />
            <div className="flex flex-col gap-3">
              <div>
                <span>Coffee Strength:</span>
                <span className="font-semibold">{product?.coffeeStrength}</span>
              </div>
              <div>
                <span>Weight: </span>
                <span className="font-semibold">{product?.weight} kg</span>
              </div>
              <div>
                <span>Origin: </span>
                <span className="font-semibold">{product?.origin}</span>
              </div>
            </div>
            <div className="flex items-center gap-10">
              <input
                className="border w-16 h-16 text-center text-2xl"
                type="number"
                value={amount}
                onChange={(e) => handleAmountChange(e)}
              />
              <button
                onClick={() =>
                  addProductToCart(String(product?._meta?.id), amount)
                }
                className="bg-brown-500 rounded-md text-white px-12 py-3 "
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.query;

  return await ssrGetProductBySlug.getServerPage(
    {
      variables: {
        slug: slug?.toString() || "",
      },
    },
    ctx
  );
};

export default withApollo(
  ssrGetProductBySlug.withPage((args) => ({
    variables: {
      slug: args?.query?.slug?.toString() || "",
    },
  }))(Product)
);
