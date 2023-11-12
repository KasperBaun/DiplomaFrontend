import { observer } from "mobx-react-lite";

import { Settings } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import ColorConfigs from "styling/ColorConfigs";
import { useContext } from "react";

export type SettingsButtonProps = {
    onButtonClicked: () => void;
}

export const SettingsButton: React.FC<SettingsButtonProps> = observer(({ onButtonClicked }: SettingsButtonProps) => {

    const { languageStore } = useContext(MobXContext);

    return (
        <Tooltip title={languageStore.currentLanguage.settings}>
            <IconButton
                onClick={onButtonClicked}
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