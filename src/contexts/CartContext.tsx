import { ReactNode, createContext, useState, useEffect } from "react";
import { useGetProductByIdLazyQuery } from "@codegen/graphql";

interface CartProviderProps {
  children: ReactNode;
}

export type Product = {
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

export interface CartContextProps {
  totalProductsAmount: number;
  totalProductsPrice: number;
  products: Product[];
  isCartLoading: boolean;
  handleAddProductToCart: (productId: string, amount?: number) => void;
  removeProductFromCart: (productId: string) => void;
  updateProductAmount: (productId: string, amount: number) => void;
  cleanCart: () => void;
}

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);

function CartProvider({ children }: CartProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [amountToAdd, setAmountToAdd] = useState(0);
  const [getProductById, { data }] = useGetProductByIdLazyQuery();
  const [isCartLoading, setIsCartLoading] = useState(true);

  const loadCartFromLocalStorage = () => {
    const storedProducts = localStorage.getItem("@CoffeeShop:cart");

    if (storedProducts) {
      return JSON.parse(storedProducts);
    }

    return [];
  };

  const handleAddProductToCart = (productId: string, amount = 1) => {
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
      updateCartLocalStorage(newProducts);
    } else {
      getProductById({
        variables: {
          id: productId,
        },
      });
      setAmountToAdd(amount);
    }
  };

  const addNewProductToCart = () => {
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
      amount: amountToAdd,
    };

    setProducts((prev) => [...prev, product]);
    updateCartLocalStorage([...products, product]);
    setAmountToAdd(0);
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

  const cleanCart = () => {
    setProducts([]);
    updateCartLocalStorage([]);
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
    if (data && amountToAdd !== 0) {
      addNewProductToCart();
    }
  }, [data, amountToAdd]);

  useEffect(() => {
    setIsCartLoading(true);
    setProducts(loadCartFromLocalStorage());
    setIsCartLoading(false);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cleanCart,
        handleAddProductToCart,
        removeProductFromCart,
        updateProductAmount,
        totalProductsAmount,
        totalProductsPrice,
        products,
        isCartLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider };
