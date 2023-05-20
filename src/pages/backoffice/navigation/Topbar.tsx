import { LanguageSwitch } from "@components/language/LanguageSwitch";
import { LogoutButton } from "@components/logout/LogoutButton";
import { NotificationModal } from "@components/notification/modal/NotificationModal";
import { SettingsButton } from "@components/settings/SettingsButton";
import { ThemeSwitch } from "@components/theme/ThemeSwitch";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import ColorConfigs from "@styles/ColorConfigs";
import { observer } from "mobx-react-lite";

export type TopbarProps = {
    sidebarOpen: boolean;
    setSidebarOpen: () => void;
    navigateTo: (key: number) => void;
}

export const Topbar: React.FC<TopbarProps> = observer((props: TopbarProps) => {

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

    const handleOnSettingsButtonClicked = () => {
        props.navigateTo(2);
    };

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
                <LanguageSwitch />
                <ThemeSwitch />
                <NotificationModal />
                <SettingsButton onButtonClicked={handleOnSettingsButtonClicked} />
                <LogoutButton />

            </Box>
        </Box>
    );
});
