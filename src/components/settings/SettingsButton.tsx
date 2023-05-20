import { observer } from "mobx-react-lite";

import { Settings } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import ColorConfigs from "@styles/ColorConfigs";
import { useContext } from "react";

export const SettingsButton: React.FC = observer(() => {


    const { languageStore } = useContext(MobXContext);

    return (
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
    )

})