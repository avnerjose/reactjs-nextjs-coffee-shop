import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { scroller } from "react-scroll";

interface ScrollProviderProps {
  children: ReactNode;
}

interface ScrollContextProps {
  setSectionToScroll: (p: string) => void;
}

export const ScrollContext = createContext<ScrollContextProps>(
  {} as ScrollContextProps
);

export function ScrollProvider({ children }: ScrollProviderProps) {
  const [sectionToScroll, setSectionToScroll] = useState("");
  const { asPath } = useRouter();

  const handleScrollToSection = () => {
    scroller.scrollTo(sectionToScroll, {
      smooth: true,
      offset: -56,
    });
    setSectionToScroll("");
  };

  useEffect(() => {
    if (asPath === "/" && sectionToScroll) {
      handleScrollToSection();
    }
  }, [asPath, sectionToScroll]);

  return (
    <ScrollContext.Provider
      value={{
        setSectionToScroll,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}
