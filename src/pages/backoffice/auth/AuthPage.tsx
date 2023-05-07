import LoginPage from "@backoffice/auth/LoginPage";
import SignUpPage from "@backoffice/auth/SignUpPage";
import MobXContext, { IMobXContext } from "@stores/MobXContext";
import { useContext, useState } from "react";
import UserFeedback from "./UserFeedback";
import UserLoginDTO from "@models/DTO/UserLoginDTO";
import { observer } from "mobx-react-lite";

const AuthPage: React.FC = observer(function AuthPage() {

    const { authStore } = useContext<IMobXContext>(MobXContext);
    const [activeKey, setActiveKey] = useState<number>(0);
    const [showFeedback, setShowFeedback] = useState<boolean>(false);
    const [showBackdrop, setShowBackdrop] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [variant, setVariant] = useState<'error' | 'warning' | 'success'>('success');

    const handleAuthNav = (key: number) => { setActiveKey(key); }
    const handleCloseFeedback = () => setShowFeedback(!showFeedback);
    const navSwitch: () => JSX.Element = () => {
        switch (activeKey) {
            case 0: return (
                <LoginPage
                    onForgotPasswordClicked={handleForgotPasswordClicked}
                    onLoginClicked={handleLoginClicked}
                    onAuthNavClicked={handleAuthNav}
                    showBackdrop={showBackdrop}
                    setShowBackdrop={setShowBackdrop}
                    backgroundImageUrl="https://firmagave-shop.dk/wp-content/uploads/2020/09/Royal-copenhagen-mix-og-match-termokopper-6-stk.jpg"
                />
            );
            case 1: return (<SignUpPage onAuthNavClicked={handleAuthNav} />);
        }
    }
    const handleForgotPasswordClicked = () => {
        setMessage("Currently not supported");
        setVariant('error');
        setShowFeedback(true);
    }

    async function handleLoginClicked(data: UserLoginDTO): Promise<void> {
        setShowBackdrop(true);
        const loginSuccess = await authStore.login(data);

        if (loginSuccess === true) {
            setShowBackdrop(false);
            setMessage("Successfully logged in");
            setVariant('success');
            setShowFeedback(true);
        } else {
            setShowBackdrop(false);
            setMessage("Unable to login user");
            setVariant('error');
            setShowFeedback(true);
        }
    }

    return (
        <div>
            <UserFeedback
                message={message}
                open={showFeedback}
                variant={variant}
                onClose={handleCloseFeedback}
                horizontalPosition='right'
                verticalPosition='top'
            />
            {navSwitch()}

        </div>
    )
});

export default AuthPage;