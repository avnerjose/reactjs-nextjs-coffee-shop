import { ReactNode, createContext, useState } from "react";
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
  const [getProductById] = useGetProductByIdLazyQuery();

  const addProductToCart = async (productId: string, amount: number = 1) => {
    const productAlreadyExists = products.find(
      (product) => product.id === productId
    );

    if (productAlreadyExists) {
      const newProducts = products.map((product) =>
        product.id === productId
          ? { ...product, amount: product.amount + amount }
          : { ...product }
      );

      setProducts(newProducts);
      updateCartLocalStorage();
    } else {
      const { data } = await getProductById({
        variables: {
          id: productId,
        },
      });

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
      updateCartLocalStorage();
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
      updateCartLocalStorage();
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
    updateCartLocalStorage();
  };

  const updateCartLocalStorage = () =>
    localStorage.setItem("@CoffeeShop:cart", JSON.stringify(products));

  const totalProductsAmount = products.reduce(
    (acc, product) => acc + product.amount,
    0
  );

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        removeProductFromCart,
        updateProductAmount,
        totalProductsAmount,
        products,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider };
