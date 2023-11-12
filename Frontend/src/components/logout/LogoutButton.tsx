
import { Logout } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import ColorConfigs from "styling/ColorConfigs";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

export const LogoutButton: React.FC = observer(() => {

    const { authStore, languageStore } = useContext(MobXContext);
    return (
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
    )
});