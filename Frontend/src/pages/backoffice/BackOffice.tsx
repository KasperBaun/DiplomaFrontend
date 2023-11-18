import MobXContext from "@stores/MobXContext";
import LoadingLion from "@components/loading/LoadingLion";
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';
import ColorConfigs from "styling/ColorConfigs";
import { Sidebar } from "./navigation/Sidebar";
import { InventoryMain } from './inventory/Inventory';
import { CategoryManager } from "./category/CategoryManager";
import { ProductManager } from "./product/ProductManager";
import { Box } from "@mui/material";
import { Topbar } from "./navigation/Topbar";
import { useEffect, useContext, useState } from "react";
import { SniperPage } from "./sniper/SniperPage";
import { SalesList } from "./sales/SalesList";
import { observer } from "mobx-react-lite";
import { Dashboard } from "./dashboard/Dashboard";
import { SettingsPage } from "@components/settings/SettingsPage";
import { useBackofficeMode } from "styling/mui-theme/backoffice/BackofficeTheme";
import { Orders } from "./orders/Orders";
import { Analysis } from "./dashboard/components/Analysis";


export const Backoffice: React.FC = observer(() => {

    const [activeNavKey, setActiveNavKey] = useState<number>(0);
    const { rootStore } = useContext(MobXContext);
    const { theme } = useBackofficeMode();

    const navSwitch = () => {
        switch (activeNavKey) {
            case 0: return (<Dashboard setNavKey={setActiveNavKey} />)
            case 1: return (<CategoryManager />)
            case 2: return (<SettingsPage />)
            case 3: return (<ProductManager />)
            case 4: return (<SniperPage />)
            case 5: return (<InventoryMain />)
            case 6: return (<SalesList />)
            case 7: return (<Orders />)
            case 8: return (<Analysis />)
        }
    }

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const handleToggleSidebarOpenClicked = () => setSidebarOpen(!sidebarOpen);

    useEffect(() => {
        const loadBackofficeStore = async () => {
            if (!rootStore.isBackofficeLoaded && !rootStore.isBackofficeLoading) {
                rootStore.loadBackoffice();
            }
        }
        loadBackofficeStore();
    });

    if (!rootStore.isBackofficeLoaded) {
        return <LoadingLion color={theme.palette.primary.main} />
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
});
