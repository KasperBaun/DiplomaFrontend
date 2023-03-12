import { Container, Grid } from "@mui/material";
import EconomyWidget from "./components/EconomyWidget";
import RecentSalesList from "./components/RecentSales";
import "./css/dashboard.scss";

const BackOfficeDashboard = () => {

    return (
            <Grid container spacing={2}>
                <Grid className="DashBoardGridContainer" item xs={12}>
                    <EconomyWidget />
                </Grid>
                <Grid className="DashBoardGridContainer" item xs={12}>
                    <Container  maxWidth="xl" className="DashBoardContainer">
                        <RecentSalesList title="Recent Sales" />
                    </Container>
                </Grid>
                
                <Grid className="DashBoardGridContainer" item xs>
                    <Container className="DashBoardContainer">
                        <h3>Salg Total</h3>
                    </Container>
                </Grid>
                <Grid className="DashBoardGridContainer" item xs>
                    <Container className="DashBoardContainer">
                        <h3>Køb Total</h3>
                    </Container>
                </Grid>
                <Grid className="DashBoardGridContainer" item xs>
                    <Container className="DashBoardContainer">
                        <h3>Inventar</h3>
                    </Container>
                </Grid>
            </Grid>
    )
}

export default BackOfficeDashboard;