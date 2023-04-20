import { ChevronLeft, ChevronRight, DarkModeOutlined, LightModeOutlined, Logout, Notifications, Settings } from "@mui/icons-material";
import { Box, IconButton, useTheme } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import ColorConfigs from "@styles/ColorConfigs";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Dk, Us } from "react-flags-select";
import { ColorModeContext } from "styling/Theme";

export interface ITopbarProps {
    sidebarOpen: boolean;
    setSidebarOpen: () => void;
}

const Topbar: React.FC<ITopbarProps> = observer(function Topbar(props: ITopbarProps) {

    const { authStore, languageStore } = useContext(MobXContext);
    const theme = useTheme();
    // const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [language, setLanguage] = useState<"da_DK" | "en_US" | "">(languageStore.getCurrentLanguageCode());

    const toggleLanguage = () => {
        if (language === "da_DK") {
            setLanguage("en_US");
            languageStore.changeLanguage("en_US");
        } else {
            setLanguage("da_DK");
            languageStore.changeLanguage("da_DK");
        }
    }

    function toggleSideBar(sidebarOpen: boolean, setSidebarOpen: () => void): JSX.Element {
        if (sidebarOpen) {
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
                    <ChevronLeft />
                </IconButton>
            )
        } else {
            return (
                <IconButton sx={{
                    color: ColorConfigs.topbar.color,
                    "&:hover": {
                        background: ColorConfigs.topbar.hoverBg,
                    }
                }}
                    onClick={setSidebarOpen}
                >
                    <ChevronRight />
                </IconButton>
            )
        }
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
                <IconButton onClick={toggleLanguage}>
                    {language === 'da_DK' ? <Dk /> : <Us />}
                </IconButton>
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlined />
                    ) : (
                        <LightModeOutlined />
                    )
                    }
                </IconButton>
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
            </Box>
        </Box>
    );
});

export default Topbar;
