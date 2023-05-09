import { createContext, useState, useMemo } from "react";
import { Theme, createTheme } from "@mui/material/styles";
import { groenlundTypography } from "../Typography";
import { backofficeDarkColorTokens, backofficeLightColorTokens } from "./BackofficeColorTokens";

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => { }
});

export const backofficeTokens = (mode: "light" | "dark") => ({...(mode === 'dark' ? backofficeDarkColorTokens : backofficeLightColorTokens)});

export const backofficeThemeSettings = (mode: "light" | "dark") => {
    const colors = backofficeTokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                    primary: {
                        main: colors.primary[500]
                    },
                    secondary: {
                        main: colors.greenAccent[500]
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100]
                    },
                    background: {
                        default: colors.primary[500]
                    }
                }
                : {
                    primary: {
                        main: colors.primary[100]
                    },
                    secondary: {
                        main: colors.greenAccent[500]
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100]
                    },
                    background: {
                        default: "#fcfcfc",
                    }
                }

            ),
        },
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
