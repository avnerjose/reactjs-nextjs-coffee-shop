import { useContext } from "react";
import { ScrollContext } from "@contexts";

export const useScroll = () => useContext(ScrollContext);
