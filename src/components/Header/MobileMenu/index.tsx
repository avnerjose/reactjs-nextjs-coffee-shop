import { useScroll } from "@hooks";
import NextLink from "next/link";
import { Coffee, House, TrendUp, Users } from "phosphor-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (p: boolean) => void;
}

export function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const { setSectionToScroll } = useScroll();

  const handleScrollAndCloseMenu = (section: string) => {
    setSectionToScroll(section);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{
            ease: "easeInOut",
          }}
          className="flex flex-col bg-dark text-white p-4 w-[65%] sm:w-[50%] md:hidden h-[calc(100vh-48px)] absolute top-[48px] shadow-md"
        >
          <h2 className="text-center text-xl font-title">Coffee Shop</h2>
          <img className="self-center" src="/separator.png" alt="Separator" />
          <nav>
            <ul>
              <li className="flex items-center gap-2 text-lg font-title">
                <House className="text-orange-500" />
                <NextLink href="/">
                  <a onClick={() => handleScrollAndCloseMenu("hero")}>Home</a>
                </NextLink>
              </li>
              <li className="flex items-center gap-2 text-lg font-title">
                <Users className="text-orange-500" />
                <NextLink href="/">
                  <a onClick={() => handleScrollAndCloseMenu("about")}>
                    About us
                  </a>
                </NextLink>
              </li>
              <li className="flex items-center gap-2 text-lg font-title">
                <TrendUp className="text-orange-500" />
                <NextLink href="/">
                  <a onClick={() => handleScrollAndCloseMenu("popular")}>
                    Popular products
                  </a>
                </NextLink>
              </li>
              <li className="flex items-center gap-2 text-lg font-title">
                <Coffee className="text-orange-500" />
                <NextLink href="/catalog">Catalog</NextLink>
              </li>
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
