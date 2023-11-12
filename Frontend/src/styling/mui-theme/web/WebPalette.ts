import { webDarkColorTokens, webLightColorTokens } from "./WebColorTokens";

export const lightColorTokens = webLightColorTokens;

export const lightWebPalette = {
    
        primary: {
            light: lightColorTokens.primary[400],
            main: lightColorTokens.primary[900],
            dark: lightColorTokens.primary[900]
        },
        secondary: {
            light: lightColorTokens.secondary[400],
            main: lightColorTokens.secondary[500],
            dark: lightColorTokens.secondary[700]

        },
        neutral: {
            dark: lightColorTokens.grey[700],
            main: lightColorTokens.grey[500],
            light: lightColorTokens.grey[100]
        },
        info:{
            light: lightColorTokens.secondary[400],
            main: lightColorTokens.secondary[500],
            dark: lightColorTokens.secondary[700]
        },
        background: {
            default: "#ffffff"
        },
        error:{
            light: "#ef5350",
            main: "#d32f2f",
            dark: "#c62828"
        },
        action: {
            active: lightColorTokens.secondary[500],
            hover: lightColorTokens.secondary[400],
            selected: lightColorTokens.secondary[400],
            disabled: lightColorTokens.grey[500],
            disabledBackground: lightColorTokens.grey[100],
            focus: lightColorTokens.secondary[400],
            hoverOpacity: 0.08,
            disabledOpacity: 0.48,
            focusOpacity: 0.12,
            activatedOpacity: 0.12
        },
        text:{
            primary: lightColorTokens.grey[900],
            secondary: lightColorTokens.grey[700],
            disabled: lightColorTokens.grey[500],
        }
        
}


export const darkColorTokens = webDarkColorTokens;

export const darkWebPalette = {
    primary: {
        light: darkColorTokens.primary[400],
        main: darkColorTokens.primary[700],
        dark: darkColorTokens.primary[900]
    },
    secondary: {
        light: darkColorTokens.secondary[400],
        main: darkColorTokens.secondary[500],
        dark: darkColorTokens.secondary[700]

    },
    neutral: {
        dark: darkColorTokens.grey[700],
        main: darkColorTokens.grey[500],
        light: darkColorTokens.grey[100]
    },
    info:{
        light: darkColorTokens.primary[400],
        main: darkColorTokens.primary[500],
        dark: darkColorTokens.primary[700]
    },
    background: {
        default: darkColorTokens.primary[900]
    },
    error:{
        light: "#ef5350",
        main: "#d32f2f",
        dark: "#c62828"
    },
    action: {
        active: lightColorTokens.secondary[500],
        hover: lightColorTokens.secondary[400],
        selected: lightColorTokens.secondary[400],
        disabled: lightColorTokens.grey[500],
        disabledBackground: lightColorTokens.grey[100],
        focus: lightColorTokens.secondary[400],
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
        focusOpacity: 0.12,
        activatedOpacity: 0.12
    }

}