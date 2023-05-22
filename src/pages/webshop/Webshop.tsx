import LoadingLion from "@components/loading/LoadingLion";
import MobXContext, { IMobXContext } from "@stores/MobXContext";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Header } from "@webshop/header/Header";
import { Constants } from "@utils/Constants";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ColorModeContext, useMode } from "styling/mui-theme/web/WebTheme";
import { Footer } from "./footer/Footer";

export const Webshop: React.FC = observer(() => {

    const { webshopStore, rootStore } = useContext<IMobXContext>(MobXContext);
    const { theme, colorMode } = useMode();

    useEffect(() => {
        const webshopStoreLoaded = async () => {
            if (!rootStore.isWebshopLoaded && !rootStore.isWebshopLoading) {
                await rootStore.loadWebShop();
            }
        }
        webshopStoreLoaded();
    });

    if (!webshopStore.isLoaded) {
        return (
            <LoadingLion
                size={50}
                color={Constants.primaryColor}
                loadingText="Loading..."
            />
        )
    } else {
        return (
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Box style={{ minHeight: '10vh', width: '100%' }}>
                        <Header />
                    </Box>
                    <Container style={{ display: 'flex', minHeight: '80vh', width: '100%' }}>
                        <Outlet />
                    </Container>
                    <Box style={{ minHeight: '10vh', minWidth: '100%' }}>
                        <Footer />

                    </Box>
                </ThemeProvider>
            </ColorModeContext.Provider >
        );
    }
});