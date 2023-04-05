import { AnalyticsOutlined, ChevronLeft, ChevronRight, CreateNewFolderOutlined, DashboardOutlined, InventoryOutlined, Logout, PaymentsOutlined, ReceiptLongOutlined, TravelExploreOutlined } from "@mui/icons-material";
import MobXContext from "@stores/MobXContext";
import React, { Dispatch, SetStateAction, useContext } from "react";
import LionLogo from "@components/LionLogo";
import { LanguageStore } from "@stores/LanguageStore";
import { Divider, Drawer, List, ListItemButton, ListItemIcon } from "@mui/material";
import { INavpath } from "./INavpath";
import SidebarItemCollapse from "./SidebarItemCollapse";
import SidebarItem from "./SidebarItem";
import ColorConfigs from "@styles/ColorConfigs";
import SizeConfigs from "@styles/SizeConfigs";


export interface INavbarProps {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
    setNavKey: Dispatch<SetStateAction<number>>;
}

const Sidebar: React.FC<INavbarProps> = function Sidebar(props: INavbarProps) {

    const { languageStore, authStore } = useContext(MobXContext);
    const navPaths: INavpath[] = createNavPaths(languageStore, props.setNavKey);

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: props.sidebarOpen ? SizeConfigs.sidebarOpen : SizeConfigs.sidebarClosed,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: props.sidebarOpen ? SizeConfigs.sidebarOpen : SizeConfigs.sidebarClosed,
                    boxSizing: "border-box",
                    borderRight: "0px",
                    backgroundColor: ColorConfigs.sidebar.bg,
                    color: ColorConfigs.sidebar.color,
                }
            }}
        >
            <ListItemButton
                sx={{
                    "&: hover": {
                        backgroundColor: ColorConfigs.sidebar.activeBg
                    },
                    backgroundColor: ColorConfigs.sidebar.bg,
                    paddingY: "12px",
                    paddingX: "24px",
                    justifyContent: 'center',
                    marginBottom: '20%'

                }}
            >
                <ListItemIcon
                    onClick={() => props.setSidebarOpen}
                    sx={{
                        color: ColorConfigs.sidebar.color,
                        "&: hover": {
                            backgroundColor: ColorConfigs.sidebar.hoverBg
                        },
                    }}>
                    <LionLogo color={ColorConfigs.sidebar.color} width={props.sidebarOpen ? 100 : 80} />
                </ListItemIcon>
            </ListItemButton>
            <List

                sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >



                <Divider />
                {navPaths.slice(0, 6).map((navpath, index) => (

                    navpath.child ? (
                        <SidebarItemCollapse item={navpath} key={index} />
                    ) : (
                        <SidebarItem item={navpath} key={index} />
                    )
                )
                )}
                <Divider />
                {navPaths.slice(6, 9).map((navpath, index) => (

                    navpath.child ? (
                        <SidebarItemCollapse item={navpath} key={index} />
                    ) : (
                        <SidebarItem item={navpath} key={index} />
                    )
                )
                )}
                <Divider />

                <SidebarItem item={{
                    navigationClick: () => authStore.signOut(),
                    title: languageStore.currentLanguage.LogoutTabText,
                    icon: <Logout />
                }} />
            </List>


        </Drawer >
    )
}

export default Sidebar;




function createNavPaths(languageStore: LanguageStore, setNavKey: Dispatch<SetStateAction<number>>, iconStyling?: React.CSSProperties): INavpath[] {
    const paths =
        [
            {
                navigationClick: () => setNavKey(0),
                title: languageStore.currentLanguage.BackOfficeTabText,
                icon: <DashboardOutlined style={iconStyling ? iconStyling : {}} />
            },
            {
                navigationClick: () => setNavKey(0),
                title: languageStore.currentLanguage.AnalyticsTabText,
                icon: <AnalyticsOutlined style={iconStyling ? iconStyling : {}} />
            },
            {
                navigationClick: () => setNavKey(0),
                title: languageStore.currentLanguage.SalesTabText,
                icon: <PaymentsOutlined style={iconStyling ? iconStyling : {}} />
            },
            {
                navigationClick: () => setNavKey(5),
                title: languageStore.currentLanguage.InventoryTabText,
                icon: <InventoryOutlined style={iconStyling ? iconStyling : {}} />
            },
            {
                navigationClick: () => setNavKey(0),
                title: languageStore.currentLanguage.OrdersTabText,
                icon: <ReceiptLongOutlined style={iconStyling ? iconStyling : {}} />
            },
            {
                navigationClick: () => setNavKey(4),
                title: languageStore.currentLanguage.ProductSniperTabText,
                icon: <TravelExploreOutlined style={iconStyling ? iconStyling : {}} />
            },
            {
                navigationClick: () => setNavKey(1),
                title: languageStore.currentLanguage.CatelogTabText,
                icon: <CreateNewFolderOutlined style={iconStyling ? iconStyling : {}} />
            },
            // {
            //     navigationClick: () => setNavKey(2),
            //     title: languageStore.currentLanguage.SubCategoriesTabText,
            //     icon: <CreateNewFolderOutlined style={iconStyling ? iconStyling : {}} />
            // },
            // {
            //     navigationClick: () => setNavKey(3),
            //     title: languageStore.currentLanguage.ProductTabText,
            //     icon: <CreateNewFolderOutlined style={iconStyling ? iconStyling : {}} />
            // }
        ];

    return paths;
}
