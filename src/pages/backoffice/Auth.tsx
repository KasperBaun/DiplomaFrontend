
import MobXContext from '@stores/MobXContext';
import { observer } from 'mobx-react-lite';
import AuthPage from './auth/AuthPage';
import Backoffice from './Backoffice';
import { useContext } from 'react';
import { Container } from '@mui/material';

const Auth = observer(() => {
    const { authStore } = useContext(MobXContext);

    if (!authStore.userAuthenticated) {
        return <AuthPage />;
    }
    else if (authStore.authState.user.role === "SuperAdmin" || "Admin") {
        return (
            <Backoffice />
        )
    }
    else if (authStore.authState.user.role === "User" || "Guest") {
        return (
            <Container>
                <img width="600" alt="Background picture for login page" src="https://i.kym-cdn.com/entries/icons/original/000/002/144/You_Shall_Not_Pass!_0-1_screenshot.jpg" />
            </Container>
        )
    }
});

export default Auth;