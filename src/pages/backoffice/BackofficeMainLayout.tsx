import { Box } from "@mui/material";
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';
import SizeConfigs from "@styles/SizeConfigs";
import ColorConfigs from "@styles/ColorConfigs";
import Sidebar from "./navigationbars/Sidebar";
import Topbar from "./navigationbars/Topbar";
import { useState } from "react";
import BackOfficeDashboard from "./Dashboard/dashboard";
import Subcategories from "./subcategory/Subcategory";
import Products from "./product/Products";
import SniperPage from "./sniper/SniperPage";
import Categories from "@backoffice/category/Categories";
import InventoryMain from './inventory/Inventory';

const BackofficeMainLayout: React.FC = function BackofficeMainLayout() {

    const [activeNavKey, setActiveNavKey] = useState<number>(0);

    const navSwitch = () => {
        switch (activeNavKey) {
            case 0: return (<BackOfficeDashboard />)
            case 1: return (<Categories />)
            case 2: return (<Subcategories />)
            case 3: return (<Products />)
            case 4: return (<SniperPage />)
            case 5: return (<InventoryMain />)
        }
    }

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [mainBoxWidth, setMainBoxWidth] = useState<string>(`calc(100% - ${SizeConfigs.sidebarOpen}`);

    const handleToggleSidebarOpenClicked = () => {
        setSidebarOpen(!sidebarOpen);
        setMainBoxWidth(`calc(100% -${sidebarOpen ? SizeConfigs.sidebarOpen : SizeConfigs.sidebarClosed}`);

    }

    return (
        <Box sx={{ display: "flex" }}>
            <Box
                component="nav"
                sx={{
                    width: SizeConfigs.sidebarOpen.width,
                    flexShrink: 0
                }}
            >
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={handleToggleSidebarOpenClicked}
                    setNavKey={setActiveNavKey}
                />
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: mainBoxWidth,
                    backgroundColor: ColorConfigs.mainBg
                }}
            >
                <Stack>
                    <Item>
                        <Topbar />
                    </Item>
                    <Item padding={1}>
                        {navSwitch()}
                    </Item>
                </Stack>
            </Box>
        </Box >
    );
};

export default BackofficeMainLayout;