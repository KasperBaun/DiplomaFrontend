import MobXContext from "@stores/MobXContext";
import React, { Dispatch, SetStateAction, useContext } from "react";
import LionLogo from "@components/svgs/LionLogo";
import { Box, Drawer } from "@mui/material";
import ColorConfigs from "@styles/ColorConfigs";
import SizeConfigs from "@styles/SizeConfigs";
import { observer } from "mobx-react-lite";
import { createNavPaths } from "./components/Navpaths";
import { Navpath } from "@models/Navpath";
import SidebarItemCollapse from "./components/SidebarItemCollapse";
import SidebarItem from "./components/SidebarItem";


export type SidebarProps = {
    sidebarOpen: boolean;
    setNavKey: Dispatch<SetStateAction<number>>;
}

const Sidebar: React.FC<SidebarProps> = observer(function Sidebar(props: SidebarProps) {

    const { languageStore } = useContext(MobXContext);
    const navPaths: Navpath[] = createNavPaths(languageStore, props.setNavKey, props.sidebarOpen);

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
                        "&:hover": {
                            cursor: "pointer"
                        }
                    }}
                    onClick={() => {
                        window.location.href = "/";
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
                    {navPaths.slice(7, 8).map((navpath, index) => (
                        navpath.child ? (
                            <SidebarItemCollapse item={navpath} sidebarOpen={props.sidebarOpen} key={index} />
                        ) : (
                            <SidebarItem item={navpath} sidebarOpen={props.sidebarOpen} key={index} />
                        )
                    )
                    )}
                </Box>
            </Box>
        </Drawer >
    )
});

export default Sidebar;


