import NextLink from "next/link";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useScroll, useCart, useFilter } from "../hooks";
import { ShoppingCart } from "phosphor-react";
import { useRouter } from "next/router";

interface HeaderProps {
  isFixed?: boolean;
}

export function Header({ isFixed = false }: HeaderProps) {
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(isFixed);
  const { asPath } = useRouter();
  const { setSectionToScroll } = useScroll();
  const { search, setSearch } = useFilter();
  const { totalProductsAmount } = useCart();

  function detectScroll() {
    if (!isFixed) return;

    if (window.scrollY > 0) {
      setIsHeaderTransparent(false);
    } else {
      setIsHeaderTransparent(true);
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", detectScroll);

    return () => document.removeEventListener("scroll", detectScroll);
  }, []);

  return (
    <header
      className={classNames("transition-colors h-14", {
        "fixed top-0 left-0 right-0 z-10": isFixed,
        "bg-black bg-opacity-[0.3] shadow-sm ": isHeaderTransparent,
        "bg-dark shadow-md": !isHeaderTransparent,
      })}
    >
      <div className="flex w-full items-center justify-between max-w-screen-xl mx-auto px-3 ">
        <nav className="flex gap-8 text-white font-title py-4">
          <NextLink href="/">
            <a onClick={() => setSectionToScroll("hero")}>Home</a>
          </NextLink>
          <NextLink href="/">
            <a onClick={() => setSectionToScroll("about")}>About Us</a>
          </NextLink>
          <NextLink href="/">
            <a onClick={() => setSectionToScroll("popular")}>
              Popular products
            </a>
          </NextLink>
          <NextLink href="/catalog">Catalog</NextLink>
        </nav>
        <div className="flex items-center gap-2 ">
          {asPath === "/catalog" && (
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-sm outline-none p-1 placeholder:text-sm"
              type="text"
              placeholder="Search for products here"
            />
          )}
          <NextLink href="/cart">
            <div className="relative cursor-pointer">
              <ShoppingCart className="text-xl  text-white" />
              {totalProductsAmount > 0 && (
                <span className="flex items-center justify-center absolute top-[-0.8rem] right-[-0.8rem] text-xs bg-red-500 text-white rounded-full w-5 h-5">
                  {totalProductsAmount}
                </span>
              )}
            </div>
          </NextLink>
        </div>
      </div>
    </header>
  );
}
