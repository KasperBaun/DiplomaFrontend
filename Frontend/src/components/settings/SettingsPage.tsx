import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import MobXContext from "@stores/MobXContext";
import { ColorModeContext } from "styling/mui-theme/backoffice/BackofficeTheme";
import { useTheme } from "@mui/material";


export const SettingsPage: React.FC = observer(() => {


    const { languageStore } = useContext(MobXContext);
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    const handleThemeChange = () => {
        colorMode.toggleColorMode();
    };

    const handleLanguageChange = (event: SelectChangeEvent<{ value: unknown }>) => {
        console.log(event.target.value);
        const newLanguage = event.target.value as string;
        languageStore.setLanguage(newLanguage);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                padding: '2rem',
                boxSizing: 'border-box',
            }}
        >
            <Typography variant="h2" gutterBottom>
                {languageStore.currentLanguage.settings}
            </Typography>

            <Box sx={{ width: '100%', maxWidth: '400px', marginBottom: '2rem' }}>
                <Typography variant="h6">{languageStore.currentLanguage.dark} {languageStore.currentLanguage.theme.toLowerCase()}</Typography>
                <Switch checked={theme.palette.mode === 'dark' ? true : false} onChange={handleThemeChange} />
            </Box>

            <Box sx={{ width: '100%', maxWidth: '400px' }}>
                <Typography variant="h6" sx={{ mb: 3 }}>{languageStore.currentLanguage.language}</Typography>
                <FormControl fullWidth>
                    <InputLabel id="language-label">{languageStore.currentLanguage.selectLanguage}</InputLabel>
                    <Select
                        label={"Select Language"}
                        labelId="language-label"
                        value={''}
                        onChange={handleLanguageChange}
                    >
                        {languageStore.getLanguages().map((language, index) => {
                            return <MenuItem key={"lang" + index} value={language}>{language}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Box>

        </Box>
    );
});

