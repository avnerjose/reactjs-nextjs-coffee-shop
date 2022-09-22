import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { Filter, Header, ProductItem } from "@components";
import { withFilter } from "@contexts";
import { GetAllProductsQuery } from "@codegen/graphql";
import { getServerPageGetAllProducts, ssrGetAllProducts } from "@codegen/page";
import { useFilter } from "@hooks";

type CatalogProps = {
  data: GetAllProductsQuery;
};

const Catalog: NextPage<CatalogProps> = () => {
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

export default ssrGetAllProducts.withPage()(withFilter(Catalog as any));
