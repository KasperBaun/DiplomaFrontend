import { Box } from "@mui/material";
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';
import ColorConfigs from "@styles/ColorConfigs";
import Sidebar from "./navigation/Sidebar";
import Topbar from "./navigation/Topbar";
import { useState } from "react";
import BackOfficeDashboard from "./Dashboard/dashboard";
import SniperPage from "./sniper/SniperPage";
import InventoryMain from './inventory/Inventory';
import CategoryTabs from "./category/CategoryTabs";
import Subcategories from "./subcategory/Subcategory";
import Products from "./product/Products";

const BackofficeMainLayout: React.FC = function BackofficeMainLayout() {

    const [activeNavKey, setActiveNavKey] = useState<number>(0);

    const navSwitch = () => {
        switch (activeNavKey) {
            case 0: return (<BackOfficeDashboard />)
            case 1: return (<CategoryTabs />)
            case 2: return (<Subcategories />)
            case 3: return (<Products />)
            case 4: return (<SniperPage />)
            case 5: return (<InventoryMain />)
        }
    }

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

    const handleToggleSidebarOpenClicked = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <Box sx={{ display: "flex" }}>
            <Box
                component="nav"
                sx={{
                    flexShrink: 0
                }}
            >
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setNavKey={setActiveNavKey}
                />
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    backgroundColor: ColorConfigs.mainBg
                }}
            >
                <Stack>
                    <Item>
                        <Topbar
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={handleToggleSidebarOpenClicked}
                        />
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