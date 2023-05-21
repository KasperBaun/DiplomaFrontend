import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import ColorConfigs from "styling/ColorConfigs";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { ColorModeContext } from "styling/mui-theme/backoffice/BackofficeTheme";

export const ThemeSwitch: React.FC = observer(() => {

    const { languageStore } = useContext(MobXContext);
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <Tooltip title={
            languageStore.currentLanguage.theme + ": " + (theme.palette.mode === 'dark' ? languageStore.currentLanguage.dark : languageStore.currentLanguage.light)
        }>
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'dark' ? (
                    <DarkModeOutlined sx={{ color: ColorConfigs.topbar.color, }} />
                ) : (
                    <LightModeOutlined sx={{ color: ColorConfigs.topbar.color }} />
                )
                }
            </IconButton>
        </Tooltip>
    )
});