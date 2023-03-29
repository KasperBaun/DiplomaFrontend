import LoginPage from "@backoffice/auth/LoginPage";
import SignUpPage from "@backoffice/auth/SignUpPage";
import MobXContext, { IMobXContext } from "@stores/MobXContext";
import { useContext, useState } from "react";
import ForgotPassword from "./ForgotPassword";

export interface ILoginData {
    email: string;
    password: string;
}

const AuthPage: React.FC = function AuthPage() {

    const { authStore } = useContext<IMobXContext>(MobXContext);
    const [activeKey, setActiveKey] = useState<number>(0);

    const navSwitch = () => {
        switch (activeKey) {
            case 0: return (<LoginPage onLoginClicked={handleLoginClicked} onAuthNavClicked={handleAuthNav} backgroundImageUrl="https://firmagave-shop.dk/wp-content/uploads/2020/09/Royal-copenhagen-mix-og-match-termokopper-6-stk.jpg" />);
            case 1: return (<ForgotPassword />);
            case 2: return (<SignUpPage onAuthNavClicked={handleAuthNav} />);
        }
    }

    async function handleLoginClicked(data: ILoginData): Promise<void> {
        // TODO: Add login functionality here
        async function delayTwoSeconds(): Promise<void> {
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        await delayTwoSeconds();
        if (data.email === "test@example.com" && data.password === "test-password") {
            authStore.setUserAuthenticated(true);
        }
    }

    function handleAuthNav(key: number): void {
        setActiveKey(key);
    }

    return (navSwitch());
}

export default AuthPage;