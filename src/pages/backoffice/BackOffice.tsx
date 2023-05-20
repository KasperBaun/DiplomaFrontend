import { Box } from "@mui/material";
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';
import ColorConfigs from "@styles/ColorConfigs";
import Sidebar from "./navigation/Sidebar";
import Topbar from "./navigation/Topbar";
import { useEffect, useContext, useState } from "react";
import { Dashboard } from "./Dashboard/dashboard";
import { SniperPage } from "./sniper/SniperPage";
import InventoryMain from './inventory/Inventory';
import { SalesList } from "./sales/SalesList";
import Orders from "./orders/Orders";
import Analysis from "./Dashboard/analysis/Analysis";
import CategoryManager from "./category/CategoryManager";
import ProductManager from "./product/ProductManager";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import LoadingLion from "@components/loading/LoadingLion";
import { Constants } from "@utils/Constants";

export const Backoffice: React.FC = observer(() => {

    const [activeNavKey, setActiveNavKey] = useState<number>(0);
    const { rootStore } = useContext(MobXContext);

    const navSwitch = () => {
        switch (activeNavKey) {
            case 0: return (<Dashboard setNavKey={setActiveNavKey} />)
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

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const handleToggleSidebarOpenClicked = () => setSidebarOpen(!sidebarOpen);

    useEffect(() => {
        const backofficeStoreLoaded = async () => {
            if (!rootStore.isBackofficeLoaded && !rootStore.isBackofficeLoading) {
                rootStore.loadBackoffice();
            }
        }
        backofficeStoreLoaded();
    });

    if (!rootStore.isBackofficeLoaded) {
        return <LoadingLion color={Constants.primaryColor} />
    }
    else {


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
                                navigateTo={setActiveNavKey}
                            />
                        </Item>
                        <Item>
                            {navSwitch()}
                        </Item>
                    </Stack>
                </Box>
            </Box >
        );
    }
}
);
