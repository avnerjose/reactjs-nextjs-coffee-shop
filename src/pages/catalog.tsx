import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { Filter, Header, ProductItem } from "../components";
import { withFilter } from "../contexts/FilterContext";
import { GetAllProductsQuery } from "../graphql/generated/graphql";
import {
  getServerPageGetAllProducts,
  ssrGetAllProducts,
} from "../graphql/generated/page";
import { useFilter } from "../hooks/useFilter";
import { withApollo } from "../lib/Apollo/withApollo";

type CatalogProps = {
  data: GetAllProductsQuery;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  image: {
    url: string;
  };
  price: number;
  category: string;
};

const Catalog: NextPage<CatalogProps> = (props) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { products } = useFilter();

  return (
    <>
      <Header />
      <div className="flex bg-gray-100">
        <Filter isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} />
        <div className=" flex-1 p-4 auto-rows-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-screen-xl mx-auto">
          {products?.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  getServerPageGetAllProducts({}, ctx);

export default withApollo(
  ssrGetAllProducts.withPage()(withFilter(Catalog as any))
);
