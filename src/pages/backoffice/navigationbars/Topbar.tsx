import { ChevronLeft, ChevronRight, Logout, Notifications, Settings } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import ColorConfigs from "@styles/ColorConfigs";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

export interface ITopbarProps {
    sidebarOpen: boolean;
    setSidebarOpen: () => void;
}

const Topbar: React.FC<ITopbarProps> = observer(function Topbar(props: ITopbarProps) {

    const { authStore } = useContext(MobXContext);

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
            //backgroundColor={ColorConfigs.topbar.bg}
            //p={2}
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
