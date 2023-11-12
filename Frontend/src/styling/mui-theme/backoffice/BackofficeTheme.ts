import { createContext, useState, useMemo } from "react";
import { Theme, createTheme } from "@mui/material/styles";
import { groenlundTypography } from "../Typography";
import { backofficeDarkColorTokens, backofficeLightColorTokens } from "./BackofficeColorTokens";
import { darkBackofficePalette, lightBackofficePalette } from "./BackofficePalette";

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => { }
});

export const backofficeTokens = (mode: "light" | "dark") => ({ ...(mode === 'dark' ? backofficeDarkColorTokens : backofficeLightColorTokens) });

export const backofficeThemeSettings = (mode: "light" | "dark") => {
    return {
        palette: { mode: mode, ...(mode === 'dark' ? darkBackofficePalette : lightBackofficePalette) },
        typography: groenlundTypography
    };
};

export const useBackofficeMode = () => {
    const [mode, setMode] = useState<"light" | "dark">("light");

    const colorMode: { toggleColorMode: () => void } = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === 'light' ? "dark" : "light")),
        }),
        []
    );
    const theme: Theme = useMemo(() => createTheme(backofficeThemeSettings(mode)), [mode]);

    return { theme, colorMode };
}
