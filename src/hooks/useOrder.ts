import { useContext } from "react";
import { OrderContext } from "@contexts";

export const useOrder = () => useContext(OrderContext);
