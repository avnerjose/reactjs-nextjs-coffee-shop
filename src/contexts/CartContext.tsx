import { ReactNode, createContext, useState, useEffect } from "react";
import { useGetProductByIdLazyQuery } from "../graphql/generated/graphql";

interface CartProviderProps {
  children: ReactNode;
}

type Product = {
  id: string;
  name: string;
  slug: string;
  image: {
    url: string;
  };
  price: number;
  category: string;
  smallDescription: string;
  amount: number;
};

interface CartContextProps {
  totalProductsAmount: number;
  totalProductsPrice: number;
  products: Product[];
  addProductToCart: (productId: string, amount?: number) => Promise<void>;
  removeProductFromCart: (productId: string) => void;
  updateProductAmount: (productId: string, amount: number) => void;
}

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);

function CartProvider({ children }: CartProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [getProductById, { data }] = useGetProductByIdLazyQuery();

  const loadCartFromLocalStorage = () => {
    const storedProducts = localStorage.getItem("@CoffeeShop:cart");

    if (storedProducts) {
      return JSON.parse(storedProducts);
    }

    return [];
  };

  const addProductToCart = async (productId: string, amount: number = 1) => {
    const productAlreadyExists = products.find(
      (product) => product.id === productId
    );

    if (productAlreadyExists) {
      console.log("Entrou no if");
      const newProducts = products.map((product) =>
        product.id === productId
          ? { ...product, amount: product.amount + amount }
          : { ...product }
      );

      setProducts(newProducts);
      updateCartLocalStorage(newProducts);
    } else {
      getProductById({
        variables: {
          id: productId,
        },
      });

      if (data) {
        const apiProduct =
          data?.allProducts?.edges && data?.allProducts?.edges[0]?.node;

        const product: Product = {
          id: String(apiProduct?._meta.id),
          slug: String(apiProduct?._meta.uid),
          name: String(apiProduct?.name),
          category: String(apiProduct?.category),
          image: {
            url: String(apiProduct?.image.url),
          },
          smallDescription: String(apiProduct?.small_description),
          price: Number(apiProduct?.price),
          amount,
        };

        setProducts((prev) => [...prev, product]);
        updateCartLocalStorage([...products, product]);
      }
    }
  };

  const removeProductFromCart = (productId: string) => {
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );

    if (productIndex !== -1) {
      const newProducts = products.filter(
        (product) => product.id !== productId
      );

      setProducts(newProducts);
      updateCartLocalStorage(newProducts);
    }
  };

  const updateProductAmount = (productId: string, amount: number) => {
    if (amount < 1) {
      return;
    }

    const newProducts = products.map((product) =>
      product.id === productId ? { ...product, amount: amount } : { ...product }
    );

    setProducts(newProducts);
    updateCartLocalStorage(newProducts);
  };

  const updateCartLocalStorage = (products: Product[]) =>
    localStorage.setItem("@CoffeeShop:cart", JSON.stringify(products));

  const totalProductsAmount = products?.reduce(
    (acc, product) => acc + product.amount,
    0
  );

  const totalProductsPrice = products.reduce(
    (acc, product) => acc + product.amount * product.price,
    0
  );

  useEffect(() => {
    setProducts(loadCartFromLocalStorage());
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        removeProductFromCart,
        updateProductAmount,
        totalProductsAmount,
        totalProductsPrice,
        products,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider };
