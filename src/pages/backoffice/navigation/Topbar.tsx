import { ChevronLeft, ChevronRight, DarkModeOutlined, LightModeOutlined, Logout, Notifications, Settings } from "@mui/icons-material";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import ColorConfigs from "@styles/ColorConfigs";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Dk, Us } from "react-flags-select";
import { ColorModeContext } from "styling/mui-theme/backoffice/BackofficeTheme";

export interface ITopbarProps {
    sidebarOpen: boolean;
    setSidebarOpen: () => void;
}

const Topbar: React.FC<ITopbarProps> = observer(function Topbar(props: ITopbarProps) {

    const { authStore, languageStore } = useContext(MobXContext);
    const theme = useTheme();
    // const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const handleLanguageIconClicked = () => {
        languageStore.toggleLanguage();
    }

    const toggleSideBar = (sidebarOpen: boolean, setSidebarOpen: () => void): JSX.Element => {
        return (
            <IconButton
                sx={{
                    color: ColorConfigs.topbar.color,
                    "&:hover": {
                        background: ColorConfigs.topbar.hoverBg,
                    }
                }}
                onClick={setSidebarOpen}
            >
                {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
        )
    }

    return (
        <Box
            display='flex'
            justifyContent='space-between'
            sx={{
                background: ColorConfigs.topbar.bg,
                color: ColorConfigs.topbar.color,
                borderRadius: 0,
            }}
        >
            {/* TOGGLE SIDEBAR LARGE/SMALL */}
            <Box
                display='flex'
                borderRadius="3px"
                justifyContent="center"
                alignItems="center"
            >
                {toggleSideBar(props.sidebarOpen, props.setSidebarOpen)}
            </Box>

            {/* APPBAR ICONS */}
            <Box
                display='flex'
                borderRadius="3px"
                justifyContent="center"
                alignItems="center"
            >
                <Tooltip title={languageStore.currentLanguage.language + ": " + languageStore.getCurrentLanguageCode()}>
                    <IconButton onClick={handleLanguageIconClicked}>
                        {languageStore.getCurrentLanguageCode() === 'da_DK' ? <Dk /> : <Us />}
                    </IconButton>
                </Tooltip>


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

                <Tooltip title={languageStore.currentLanguage.notifications}>
                    <IconButton
                        sx={{
                            color: ColorConfigs.topbar.color,
                            "&:hover": {
                                background: ColorConfigs.topbar.hoverBg,
                            }
                        }}
                    >
                        <Notifications />
                    </IconButton>
                </Tooltip>

                <Tooltip title={languageStore.currentLanguage.settings}>
                    <IconButton
                        sx={{
                            color: ColorConfigs.topbar.color,
                            "&:hover": {
                                background: ColorConfigs.topbar.hoverBg,
                            }
                        }}
                    >
                        <Settings />
                    </IconButton>
                </Tooltip>

                <Tooltip title={languageStore.currentLanguage.LogoutTabText}>
                    <IconButton
                        sx={{
                            color: ColorConfigs.topbar.color,
                            "&:hover": {
                                background: ColorConfigs.topbar.hoverBg,
                            }
                        }}
                        onClick={() => authStore.signOut()}
                    >
                        <Logout />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
});

export default Topbar;
