import { useContext } from "react";
import { MascaContext } from "../contexts/MascaProvider";

export const useMasca = () => useContext(MascaContext);
