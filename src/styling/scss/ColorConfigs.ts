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
        bg: Constants.backgroundColor,//"#fff",
        color: "#000"
    },
    mainBg: Constants.backgroundColor //colors.grey["100"]
};

export default ColorConfigs;