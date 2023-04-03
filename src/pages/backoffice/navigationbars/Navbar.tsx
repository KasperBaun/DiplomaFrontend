import { AnalyticsOutlined, ChevronLeft, ChevronRight, CreateNewFolderOutlined, DashboardOutlined, InventoryOutlined, Logout, PaymentsOutlined, ReceiptLongOutlined, TravelExploreOutlined } from "@mui/icons-material";
import MobXContext from "@stores/MobXContext";
import { CSSProperties, Dispatch, SetStateAction, useContext, useState } from "react";
import { iconStyling, listItem, sideBar } from "./NavbarStyles";
import LionLogo from "@components/LionLogo";
import { Constants } from "@utils/Constants";
import { LanguageStore } from "@stores/LanguageStore";

export interface INavbarProps {
    setNavKey: Dispatch<SetStateAction<number>>;
}

const Navbar: React.FC<INavbarProps> = function Navbar(props: INavbarProps) {

    const { languageStore, authStore } = useContext(MobXContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [navbarStyle, setNavbarStyle] = useState<CSSProperties>(sideBar);
    const navPaths: Navpath[] = createNavPaths(languageStore, props.setNavKey);

    const toggleSidebar = () => {
        // Change the width of the sidebar
        if (isSidebarOpen) {
            const updatedStyle = { ...sideBar, width: '88px' };
            setNavbarStyle(updatedStyle);
        }
        setIsSidebarOpen(!isSidebarOpen)
    };




    return (
        <nav style={navbarStyle}>
            <header>
                <LionLogo color={Constants.primaryColor} width={isSidebarOpen ? 100 : 50} />
                {isSidebarOpen ? <ChevronLeft onClick={toggleSidebar} /> : <ChevronRight onClick={toggleSidebar} />}


            </header>

            <div className="menu-bar">
                <div className="menu">


                    <hr style={{ color: Constants.primaryColor }} />
                    <ul className="menu-links">

                        {navPaths.slice(0, 6).map(navpath => {
                            return (
                                <li style={listItem} key={"navpath" + navpath.title} className="nav-link" onClick={navpath.navigationClick}>

                                    {navpath.icon}
                                    <span className="text nav-text">{navpath.title}</span>
                                </li>
                            )
                        })}

                        <hr style={{ color: Constants.primaryColor }} />

                        {navPaths.slice(6, 9).map(navpath => {
                            return (
                                <li style={listItem} key={"navpath" + navpath.title} className="nav-link" onClick={navpath.navigationClick}>
                                    {navpath.icon}
                                    <span className="text nav-text">{navpath.title}</span>
                                </li>
                            )
                        })}

                    </ul>
                </div>

                <div className="bottom-content">
                    <li style={listItem} onClick={() => authStore.signOut()}>
                        <Logout />
                        <span className="text nav-text">Logout</span>
                    </li>

                    {/* <li className="mode" onClick={toggleDarkMode}>
                        <div className="sun-moon">
                            <i className="bx bx-moon icon moon"></i>
                            <i className="bx bx-sun icon sun"></i>
                        </div>
                        <span className="mode-text text">{isDarkMode ? "Light mode" : "Dark mode"}</span>

                        <div className="toggle-switch">
                            <span className="switch"></span>
                        </div>
                    </li> */}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;


interface Navpath {
    navigationClick: () => void;
    title: string;
    icon: JSX.Element;
}

function createNavPaths(languageStore: LanguageStore, setNavKey: Dispatch<SetStateAction<number>>): Navpath[] {
    const paths =
        [
            {
                navigationClick: () => setNavKey(0),
                title: languageStore.currentLanguage.BackOfficeTabText,
                icon: <DashboardOutlined style={iconStyling} />
            },
            {
                navigationClick: () => setNavKey(0),
                title: languageStore.currentLanguage.AnalyticsTabText,
                icon: <AnalyticsOutlined style={iconStyling} />
            },
            {
                navigationClick: () => setNavKey(0),
                title: languageStore.currentLanguage.SalesTabText,
                icon: <PaymentsOutlined style={iconStyling} />
            },
            {
                navigationClick: () => setNavKey(0),
                title: languageStore.currentLanguage.InventoryTabText,
                icon: <InventoryOutlined style={iconStyling} />
            },
            {
                navigationClick: () => setNavKey(0),
                title: languageStore.currentLanguage.OrdersTabText,
                icon: <ReceiptLongOutlined style={iconStyling} />
            },
            {
                navigationClick: () => setNavKey(4),
                title: languageStore.currentLanguage.ProductSniperTabText,
                icon: <TravelExploreOutlined style={iconStyling} />
            },
            {
                navigationClick: () => setNavKey(1),
                title: languageStore.currentLanguage.CategoriesTabText,
                icon: <CreateNewFolderOutlined style={iconStyling} />
            },
            {
                navigationClick: () => setNavKey(2),
                title: languageStore.currentLanguage.SubCategoriesTabText,
                icon: <CreateNewFolderOutlined style={iconStyling} />
            },
            {
                navigationClick: () => setNavKey(3),
                title: languageStore.currentLanguage.ProductTabText,
                icon: <CreateNewFolderOutlined style={iconStyling} />
            }
        ];

    return paths;
}