import { useContext } from "react";
import { ScrollContext } from "../contexts/ScrollContext";

export const useScroll = () => useContext(ScrollContext);
