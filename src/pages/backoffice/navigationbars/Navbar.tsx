import { Analytics, Category, CategorySharp, Home, Inventory, Logout, Money, ProductionQuantityLimits, SnippetFolder } from "@mui/icons-material";
import MobXContext from "@stores/MobXContext";
import { CSSProperties, Dispatch, SetStateAction, useContext, useState } from "react";
import { Nav } from "react-bootstrap";
import "./NavbarStyles.css"; // Import the CSS file
import { flexColumn, iconStyling, listItem, sideBar } from "./NavbarStyles";

export interface INavbarProps {
    setNavKey: Dispatch<SetStateAction<number>>;
}

interface Navpath {
    navigationClick: () => void;
    title: string;
    icon: JSX.Element;
}

const Navbar: React.FC<INavbarProps> = function Navbar(props: INavbarProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [navbarStyle, setNavbarStyle] = useState<CSSProperties>(sideBar);

    const toggleSidebar = () => {
        // Change the width of the sidebar
        if (isSidebarOpen) {
            const updatedStyle = { ...sideBar, width: '88px' };
            setNavbarStyle(updatedStyle);
        }
        setIsSidebarOpen(!isSidebarOpen)
    };

    const { languageStore, authStore } = useContext(MobXContext);

    const navPaths: Navpath[] = [
        {
            navigationClick: () => props.setNavKey(0),
            title: languageStore.currentLanguage.BackOfficeTabText,
            icon: <Home style={iconStyling} />
        },
        {
            navigationClick: () => props.setNavKey(0),
            title: languageStore.currentLanguage.AnalyticsTabText,
            icon: <Analytics style={iconStyling} />
        },
        {
            navigationClick: () => props.setNavKey(0),
            title: languageStore.currentLanguage.SalesTabText,
            icon: <Money style={iconStyling} />
        },
        {
            navigationClick: () => props.setNavKey(0),
            title: languageStore.currentLanguage.InventoryTabText,
            icon: <Inventory style={iconStyling} />
        },
        {
            navigationClick: () => props.setNavKey(4),
            title: languageStore.currentLanguage.ProductSniperTabText,
            icon: <SnippetFolder style={iconStyling} />
        },
        {
            navigationClick: () => props.setNavKey(1),
            title: languageStore.currentLanguage.CategoriesTabText,
            icon: <Category style={iconStyling} />
        },
        {
            navigationClick: () => props.setNavKey(2),
            title: languageStore.currentLanguage.SubCategoriesTabText,
            icon: <CategorySharp style={iconStyling} />
        },
        {
            navigationClick: () => props.setNavKey(3),
            title: languageStore.currentLanguage.ProductTabText,
            icon: <ProductionQuantityLimits style={iconStyling} />
        }
    ]
    return (
        <nav style={navbarStyle}>
            <header>
                <div className="image-text">
                    <span className="image">{/*<img src="logo.png" alt="" />*/}</span>

                    <div className="text" style={flexColumn}>
                        <span className="name">Codinglab</span>
                        <span className="profession">Web developer</span>
                    </div>
                </div>

                <i className="bx bx-chevron-right toggle" onClick={toggleSidebar}></i>
            </header>

            <div className="menu-bar">
                <div className="menu">
                    <li className="search-box" onClick={() => setIsSidebarOpen(false)}>
                        <i className="bx bx-search icon"></i>
                        <input type="text" placeholder="Search..." />
                    </li>

                    <NavTitleDivider title={languageStore.currentLanguage.GeneralHeaderAdmin} />
                    <ul className="menu-links">

                        {navPaths.slice(0, 5).map(navpath => {
                            return (
                                <li style={listItem} key={"navpath" + navpath.title} className="nav-link" onClick={navpath.navigationClick}>

                                    {navpath.icon}
                                    <span className="text nav-text">{navpath.title}</span>
                                </li>
                            )
                        })}

                        <NavTitleDivider title={languageStore.currentLanguage.ManagementTabText} />

                        {navPaths.slice(5, 8).map(navpath => {
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
                    <li onClick={authStore.signOut}>
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

interface props {
    title: string;
}


const NavTitleDivider = (props: props) => {
    return (
        <>
            <Nav.Item className="VertNavItem"><i className="VertNavTitle">{props.title}</i></Nav.Item>
            <hr className="NavTitleDividerHR" />
        </>
    )
}
