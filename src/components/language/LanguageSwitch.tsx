import { IconButton, Tooltip } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Dk, Us } from "react-flags-select";

export const LanguageSwitch: React.FC = observer(() => {

    const { languageStore } = useContext(MobXContext);

    const handleLanguageIconClicked = () => {
        languageStore.toggleLanguage();
    }

    return (
        <Tooltip title={languageStore.currentLanguage.language + ": " + languageStore.getCurrentLanguageCode()}>
            <IconButton onClick={handleLanguageIconClicked}>
                {languageStore.getCurrentLanguageCode() === 'da_DK' ? <Dk /> : <Us />}
            </IconButton>
        </Tooltip>
    )
})