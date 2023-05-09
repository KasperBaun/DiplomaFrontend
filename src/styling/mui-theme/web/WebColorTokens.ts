export type ColorToken = 
{
    900:string, 
    800:string, 
    600:string, 
    700:string, 
    500:string, 
    400:string, 
    300:string, 
    200:string, 
    100:string,
    50: string
}

export type ColorTokens ={
    primary: ColorToken,
    secondary: ColorToken,
    grey: ColorToken
    // error : ColorToken,
    // warning : ColorToken,
    // info : ColorToken,
    // success: ColorToken
}

export const webLightColorTokens: ColorTokens= {
    
    primary: {
        50: "#e0f1f1",
        100: "#b1dddb",
        200: "#7fc7c4",
        300: "#4db1ac",
        400: "#28a09a",
        500: "#0a8f87",
        600: "#09827a",
        700: "#09736a",
        800: "#0a635b",
        900: "#09473f",
    },
    
    secondary: {
        50: "#ffdfce",
        100: "#f6bcb0",
        200: "#d5968c",
        300: "#b47165",
        400: "#9c554a",
        500: "#84392f",
        600: "#78312a",
        700: "#682521",
        800: "#58181b",
        900: "#470911",
    },
    grey: {
        900: "#141414",
        800: "#292929",
        600: "#525252",
        700: "#3d3d3d",
        500: "#666666",
        400: "#858585",
        300: "#a3a3a3",
        200: "#c2c2c2",
        100: "#e0e0e0",
        50: "#f5f5f5"
    },

}






export const webDarkColorTokens = {
    primary: {
        50: "#e0f1f1",
        100: "#b1dddb",
        200: "#7fc7c4",
        300: "#4db1ac",
        400: "#28a09a",
        500: "#0a8f87",
        600: "#09827a",
        700: "#09736a",
        800: "#0a635b",
        900: "#09473f",
    },
    secondary: {
        50: "#ffdfce",
        100: "#f6bcb0",
        200: "#d5968c",
        300: "#b47165",
        400: "#9c554a",
        500: "#84392f",
        600: "#78312a",
        700: "#682521",
        800: "#58181b",
        900: "#470911",
    },
    grey: {
        900: "#141414",
        800: "#292929",
        600: "#525252",
        700: "#3d3d3d",
        500: "#666666",
        400: "#858585",
        300: "#a3a3a3",
        200: "#c2c2c2",
        100: "#e0e0e0",
        50: "#f5f5f5"
    },
}