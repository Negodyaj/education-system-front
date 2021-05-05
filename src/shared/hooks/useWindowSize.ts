import { useEffect, useState } from "react";

export const useWindowSize = () => {
    type modeValues = "mobile" | "desktop";
    const [mode, setMode] = useState<modeValues>(window.innerWidth > 900 ? "desktop" : "mobile");
    useEffect(() => {
        window.addEventListener("resize", (e) => resizeHandler(e));
    }, [])
    const resizeHandler = (ev?: UIEvent) => {
        window.innerWidth > 900
            ?
            setMode("desktop")
            :
            setMode("mobile")
    }
    return mode;
}