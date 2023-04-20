import { Box } from "@mui/material";
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';
import ColorConfigs from "@styles/ColorConfigs";
import Sidebar from "./navigation/Sidebar";
import Topbar from "./navigation/Topbar";
import { useState } from "react";
import Dashboard from "./Dashboard/dashboard";
import SniperPage from "./sniper/SniperPage";
import InventoryMain from './inventory/Inventory';
import Subcategories from "./category/components/Subcategories";
import Products from "./product/Products";
import Categories from "./category/Categories";
import SalesList from "./sales/SalesList";
import Orders from "./orders/Orders";
import Analysis from "./Dashboard/analysis/Analysis";
import CategoryManager from "./category/CategoryManager";
import ProductManager from "./product/ProductManager";

const Backoffice: React.FC = function Backoffice() {

    const [activeNavKey, setActiveNavKey] = useState<number>(0);

    const navSwitch = () => {
        switch (activeNavKey) {
            case 0: return (<Dashboard />)
            case 1: return (<CategoryManager />)
            // case 2: return (<Subcategories />)
            case 3: return (<ProductManager />)
            case 4: return (<SniperPage />)
            case 5: return (<InventoryMain />)
            case 6: return (<SalesList />)
            case 7: return (<Orders />)
            case 8: return (<Analysis />)
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
                    <Item>
                        {navSwitch()}
                    </Item>
                </Stack>
            </Box>
        </Box >
    );
};

export default Backoffice;