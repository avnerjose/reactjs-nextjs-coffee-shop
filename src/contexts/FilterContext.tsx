import { NextPage } from "next";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  useGetAllProductsWithSearchLazyQuery,
  useGetProductsWithFilterLazyQuery,
} from "../graphql/generated/graphql";

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

type PriceLimits = {
  min: number | null;
  max: number | null;
};

interface FilterProviderProps {
  children: ReactNode;
}

interface FilterContextProps {
  products: Product[];
  priceLimits: PriceLimits;
  brand: string | null;
  coffeeStrength: number | null;
  search: string;
  weight: number | null;
  setSearch: Dispatch<SetStateAction<string>>;
  setPriceLimits: Dispatch<SetStateAction<PriceLimits>>;
  setBrand: Dispatch<SetStateAction<string | null>>;
  setCoffeeStrength: Dispatch<SetStateAction<number | null>>;
  setWeight: Dispatch<SetStateAction<number | null>>;
}

const FilterContext = createContext<FilterContextProps>(
  {} as FilterContextProps
);

function FilterProvider({ children }: FilterProviderProps) {
  const [getProductsWithFilter, { data }] = useGetProductsWithFilterLazyQuery();
  const [
    getProductsWithSearch,
    { data: productsWithSearchData },
  ] = useGetAllProductsWithSearchLazyQuery();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState<string | null>(null);
  const [coffeeStrength, setCoffeeStrength] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [priceLimits, setPriceLimits] = useState<PriceLimits>({
    min: null,
    max: null,
  });

  useEffect(() => {
    getProductsWithFilter({
      variables: {
        brand,
        coffeeStrength,
        priceMax: priceLimits.max,
        priceMin: priceLimits.min,
        weight,
      },
    });
  }, [getProductsWithFilter, brand, coffeeStrength, weight, priceLimits]);

  useEffect(() => {
    data &&
      setProducts(
        data?.allProducts?.edges?.map((edge) => ({
          id: String(edge?.node._meta.id),
          slug: String(edge?.node._meta.uid),
          name: String(edge?.node.name),
          image: {
            url: String(edge?.node.image.url),
          },
          category: String(edge?.node.category),
          price: Number(edge?.node.price),
        })) ?? []
      );
  }, [data]);

  useEffect(() => {
    productsWithSearchData &&
      setProducts(
        productsWithSearchData?.allProducts?.edges?.map((edge) => ({
          id: String(edge?.node._meta.id),
          slug: String(edge?.node._meta.uid),
          name: String(edge?.node.name),
          image: {
            url: String(edge?.node.image.url),
          },
          category: String(edge?.node.category),
          price: Number(edge?.node.price),
        })) ?? []
      );
  }, [productsWithSearchData]);

  useEffect(() => {
    getProductsWithSearch({
      variables: {
        search,
      },
    });
  }, [search]);

  return (
    <FilterContext.Provider
      value={{
        products,
        priceLimits,
        brand,
        coffeeStrength,
        weight,
        search,
        setPriceLimits,
        setBrand,
        setCoffeeStrength,
        setWeight,
        setSearch,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

const withFilter = (Component: NextPage) => {
  return function Provider(props: any) {
    return (
      <FilterProvider>
        <Component {...props} />
      </FilterProvider>
    );
  };
};

export { FilterContext, withFilter };
