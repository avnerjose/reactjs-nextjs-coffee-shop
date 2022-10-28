import { ShoppingCart } from "phosphor-react";
import { useCart } from "@hooks";
import { formatToCurrency } from "@utils";

export type Product = {
  id: string;
  name: string;
  slug: string;
  image: {
    url: string;
  };
  price: number;
  category: string;
};

interface ProductItemProps {
  product: Product;
}

export function ProductItem({
  product: { id, name, image, price, category, slug },
}: ProductItemProps) {
  const { handleAddProductToCart } = useCart();

  return (
    <div
      data-test="product-item"
      className="flex flex-col h-fit items-center shadow-md rounded-md gap-2 py-4 px-2 bg-white relative "
    >
      <img className="h-40" src={image?.url} alt={name} />
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 uppercase">{category}</span>
          <a className="hover:underline line-clamp-1" href={`/product/${slug}`}>
            {name}
          </a>
          <span className="text-lg font-bold">{formatToCurrency(price)}</span>
        </div>
        <button
          onClick={() => handleAddProductToCart(id)}
          className="bg-brown-500 text-white p-4 text-xl rounded-full "
        >
          <ShoppingCart />
        </button>
      </div>
    </div>
  );
}
