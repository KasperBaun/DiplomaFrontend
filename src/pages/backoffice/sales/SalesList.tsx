import { Grid } from "@mui/material";
import { RecentSalesList } from "./components/RecentSales";
import { observer } from "mobx-react-lite";

export const SalesList = observer(() => {

    return (
        <Grid container rowGap={2} columnGap={2} justifyContent={"center"}>
            <Grid item xs={11.9}>
                <div className="DashBoardGridContainer">
                    <RecentSalesList
                        tableHeight={750}
                    />
                </div>
            </Grid>
        </Grid>
    )
});
