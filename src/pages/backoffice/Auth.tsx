
import MobXContext from '@stores/MobXContext';
import { observer } from 'mobx-react-lite';
import AuthPage from './auth/AuthPage';
import { useContext } from 'react';
import { Container } from '@mui/material';
import { ColorModeContext, useMode } from 'styling/Theme';
import { CssBaseline, ThemeProvider } from "@mui/material";
import Backoffice from './BackOffice';

const Auth = observer(() => {
    const { authStore } = useContext(MobXContext);
    const { theme, colorMode } = useMode();
    const userRole = authStore.authState.user.role;

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {!authStore.userAuthenticated && <AuthPage />}
                {(authStore.authState.user.role === "SuperAdmin" || authStore.authState.user.role === "Admin") && <Backoffice />}
                {(authStore.authState.user.role === "User" || authStore.authState.user.role === "Guest") &&
                    <Container>
                        <img width="600" alt="Background for login page" src="https://i.kym-cdn.com/entries/icons/original/000/002/144/You_Shall_Not_Pass!_0-1_screenshot.jpg" />
                    </Container>
                }
            </ThemeProvider>

        </ColorModeContext.Provider>
    )
    // if (!authStore.userAuthenticated) {
    //     return (
    //     <AuthPage />
    //     );
    // }
    // else if (authStore.authState.user.role === "SuperAdmin" || "Admin") {
    //     return (
    //         <Backoffice />
    //     )
    // }
    //     else if (authStore.authState.user.role === "User" || "Guest") {
    //     return (
    //         <Container>
    //             <img width="600" alt="Background for login page" src="https://i.kym-cdn.com/entries/icons/original/000/002/144/You_Shall_Not_Pass!_0-1_screenshot.jpg" />
    //         </Container>
    //     )
    // }
});

export default Auth;