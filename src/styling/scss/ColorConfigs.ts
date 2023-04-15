import { colors } from "@mui/material";
import { Constants } from "@utils/Constants";

const ColorConfigs = {
    sidebar: {
        bg: "#233044",
        color: "#eeeeee",
        hoverBg: "#1e293a",
        activeBg: "#1e253a"
    },
    topbar: {
        bg: "#233044",//Constants.backgroundColor,//"#fff",
        color: "#FFF",
        hoverBg: "#1e253a",
    },
    primaryColor: Constants.primaryColor,
    secondaryColor: Constants.secondaryColor,
    mainBg: Constants.backgroundColor, //colors.grey["100"]
    primaryTextColor: Constants.primaryColor,
    secondaryTextColor: "#504954",
    colors: colors,
};

export default ColorConfigs;