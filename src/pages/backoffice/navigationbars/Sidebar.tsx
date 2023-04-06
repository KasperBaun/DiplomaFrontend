import { AnalyticsOutlined, CreateNewFolderOutlined, DashboardOutlined, InventoryOutlined, PaymentsOutlined, ReceiptLongOutlined, TravelExploreOutlined } from "@mui/icons-material";
import MobXContext from "@stores/MobXContext";
import React, { Dispatch, SetStateAction, useContext } from "react";
import LionLogo from "@components/LionLogo";
import { LanguageStore } from "@stores/LanguageStore";
import { Box, Drawer, List, ListItem, ListItemIcon } from "@mui/material";
import { INavpath } from "./INavpath";
import SidebarItemCollapse from "./SidebarItemCollapse";
import SidebarItem from "./SidebarItem";
import ColorConfigs from "@styles/ColorConfigs";
import SizeConfigs from "@styles/SizeConfigs";
import { observer } from "mobx-react-lite";


export interface ISidebarProps {
    sidebarOpen: boolean;
    setNavKey: Dispatch<SetStateAction<number>>;
}

const Sidebar: React.FC<ISidebarProps> = observer(function Sidebar(props: ISidebarProps) {

    const { languageStore } = useContext(MobXContext);
    const navPaths: INavpath[] = createNavPaths(languageStore, props.setNavKey, props.sidebarOpen);

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: props.sidebarOpen ? SizeConfigs.sidebarOpen : SizeConfigs.sidebarClosed,
                "& .MuiDrawer-paper": {
                    width: props.sidebarOpen ? SizeConfigs.sidebarOpen : SizeConfigs.sidebarClosed,
                    boxSizing: "border-box",
                    borderRight: "0px",
                    backgroundColor: ColorConfigs.sidebar.bg,
                    color: ColorConfigs.sidebar.color,
                }
            }}
        >
            <Box
                display='flex'
                justifyContent='space-between'
                flexDirection='column'
                height="100vh"
                sx={{
                    background: ColorConfigs.sidebar.bg,
                    color: ColorConfigs.sidebar.color,
                    borderRadius: 0,
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: '30px',
                        backgroundColor: ColorConfigs.sidebar.bg,
                    }}
                >
                    <LionLogo color={ColorConfigs.sidebar.color} width={props.sidebarOpen ? 100 : 60} />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: ColorConfigs.sidebar.bg,
                    }}
                >

                    {navPaths.slice(0, 7).map((navpath, index) => (

                        navpath.child ? (
                            <SidebarItemCollapse item={navpath} sidebarOpen={props.sidebarOpen} key={index} />
                        ) : (
                            <SidebarItem item={navpath} sidebarOpen={props.sidebarOpen} key={index} />
                        )
                    )
                    )}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: ColorConfigs.sidebar.bg,
                    }}
                >
                    {navPaths.slice(7, 9).map((navpath, index) => (

                        navpath.child ? (
                            <SidebarItemCollapse item={navpath} sidebarOpen={props.sidebarOpen} key={index} />
                        ) : (
                            <SidebarItem item={navpath} sidebarOpen={props.sidebarOpen} key={index} />
                        )
                    )
                    )}
                </Box>
                {/* </List> */}
            </Box>
        </Drawer >
    )
});

export default Sidebar;

function LionHeaderLogo(sidebarOpen: boolean): JSX.Element {
    return (
        <ListItem
            sx={{
                backgroundColor: ColorConfigs.sidebar.bg,
                paddingY: "12px",
                paddingX: "24px",
                width: '100%',
                justifyContent: "center",
                marginBottom: '40%',
            }}
        >
            <ListItemIcon
                sx={{ color: ColorConfigs.sidebar.color }}>
                <LionLogo color={ColorConfigs.sidebar.color} width={sidebarOpen ? 100 : 60} />
            </ListItemIcon>
        </ListItem>
    )
}

function createNavPaths(languageStore: LanguageStore, setNavKey: Dispatch<SetStateAction<number>>, sidebarOpen?: boolean, iconStyling?: React.CSSProperties): INavpath[] {
    const paths =
        [
            {
                navigationClick: () => setNavKey(0),
                title: sidebarOpen ? languageStore.currentLanguage.BackOfficeTabText : '',
                icon: <DashboardOutlined style={iconStyling ? iconStyling : {}} />
            },
            {
                navigationClick: () => setNavKey(0),
                title: sidebarOpen ? languageStore.currentLanguage.AnalyticsTabText : '',
                icon: <AnalyticsOutlined style={iconStyling ? iconStyling : {}} />
            },
            {
                navigationClick: () => setNavKey(0),
                title: sidebarOpen ? languageStore.currentLanguage.SalesTabText : '',
                icon: <PaymentsOutlined style={iconStyling ? iconStyling : {}} />
            },
            {
                navigationClick: () => setNavKey(5),
                title: sidebarOpen ? languageStore.currentLanguage.InventoryTabText : '',
                icon: <InventoryOutlined style={iconStyling ? iconStyling : {}} />
            },
            {
                navigationClick: () => setNavKey(0),
                title: sidebarOpen ? languageStore.currentLanguage.OrdersTabText : '',
                icon: <ReceiptLongOutlined style={iconStyling ? iconStyling : {}} />
            },
            {
                navigationClick: () => setNavKey(4),
                title: sidebarOpen ? languageStore.currentLanguage.ProductSniperTabText : '',
                icon: <TravelExploreOutlined style={iconStyling ? iconStyling : {}} />
            },
            {
                navigationClick: () => setNavKey(1),
                title: sidebarOpen ? languageStore.currentLanguage.CatalogTabText : '',
                icon: <CreateNewFolderOutlined style={iconStyling ? iconStyling : {}} />,
                child: [
                    {
                        navigationClick: () => setNavKey(1),
                        title: sidebarOpen ? languageStore.currentLanguage.CategoriesTabText : '',
                        icon: <CreateNewFolderOutlined style={iconStyling ? iconStyling : {}} />,
                    },
                    {
                        navigationClick: () => setNavKey(2),
                        title: sidebarOpen ? languageStore.currentLanguage.SubCategoriesTabText : '',
                        icon: <CreateNewFolderOutlined style={iconStyling ? iconStyling : {}} />
                    },
                    {
                        navigationClick: () => setNavKey(3),
                        title: sidebarOpen ? languageStore.currentLanguage.ProductTabText : '',
                        icon: <CreateNewFolderOutlined style={iconStyling ? iconStyling : {}} />
                    }
                ]
            },

        ];

    return paths;
}
