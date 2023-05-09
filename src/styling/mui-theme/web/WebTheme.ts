import { createContext, useState, useMemo } from "react";
import { Theme, createTheme } from "@mui/material/styles";
import { groenlundTypography } from "../Typography";
import { darkWebPalette, lightWebPalette } from "./WebPalette";

export const themeSettings = (mode: "light" | "dark") => {

    return {
        palette: { mode: mode, ...(mode === 'dark' ? darkWebPalette : lightWebPalette)},
        typography: groenlundTypography
    };
};

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => { }
});

export const useMode = () => {
    const [mode, setMode] = useState<"light" | "dark">("light");

    const colorMode: { toggleColorMode: () => void } = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === 'light' ? "dark" : "light")),
        }),
        []
    );
    const theme: Theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return { theme, colorMode };
}