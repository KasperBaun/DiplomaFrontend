
import MobXContext from '@stores/MobXContext';
import { observer } from 'mobx-react-lite';
import AuthPage from './auth/AuthPage';
import { useContext, useEffect } from 'react';
import { ColorModeContext, useBackofficeMode } from 'styling/mui-theme/backoffice/BackofficeTheme';
import { CssBaseline, ThemeProvider } from "@mui/material";
import Backoffice from './BackOffice';
import Unauthorized from './auth/Unauthorized';
import Loading from '@components/loading/Loading';

const Auth = observer(() => {
    const { authStore } = useContext(MobXContext);
    const { theme, colorMode } = useBackofficeMode();

    useEffect(() => {
        if (!authStore.isLoaded && !authStore.isLoading) {
            authStore.init();
        }
    });

    if (!authStore.isLoaded && !authStore.isLoading) {
        return <Loading />
    } else {

        return (
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div style={{ width: '100%', height: '100%' }}>
                        {!authStore.userAuthenticated && <AuthPage />}
                        {authStore.userAuthenticated && (authStore.authState.user.role === "SuperAdmin" || authStore.authState.user.role === "Admin") && <Backoffice />}
                        {authStore.userAuthenticated && (authStore.authState.user.role === "User" || authStore.authState.user.role === "Guest") && <Unauthorized />}
                    </div>
                </ThemeProvider>
            </ColorModeContext.Provider>
        )
    }
});

export default Auth;