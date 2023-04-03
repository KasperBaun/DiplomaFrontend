
import "./css/backoffice.scss";
import { Container } from 'react-bootstrap';
import MobXContext from '@stores/MobXContext';
import { observer } from 'mobx-react-lite';
import AuthPage from './auth/AuthPage';
import InventoryMain from './inventory/Inventory';
import BackofficeMainLayout from './BackofficeMainLayout';
import { useContext } from 'react';

const BackOfficeMain = observer(() => {
    const { authStore } = useContext(MobXContext);

    if (!authStore.userAuthenticated) {
        return <AuthPage />;
    }
    else if (authStore.authState.user.role === "SuperAdmin" || "Admin") {
        return (
            <BackofficeMainLayout />
        )
    }
    else if (authStore.authState.user.role === "User" || "Guest") {
        return (
            <Container>
                <img width="600" src="https://i.kym-cdn.com/entries/icons/original/000/002/144/You_Shall_Not_Pass!_0-1_screenshot.jpg" />
            </Container>
        )
    }
});

export default BackOfficeMain;