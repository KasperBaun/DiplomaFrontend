import { Grid } from "@mui/material";
import { RecentSalesList } from "./components/RecentSales";
import { observer } from "mobx-react-lite";
import { Constants } from "@utils/Constants";
import { useContext } from "react";
import MobXContext from "@stores/MobXContext";
import Loading from "@components/loading/Loading";

export const SalesList = observer(() => {
    const { backofficeStore } = useContext(MobXContext);
    if (!backofficeStore.isLoaded) {
        return <Loading size={50} color={Constants.primaryColor} />
    } else {
        return (
            <Grid container rowGap={2} columnGap={2} justifyContent={"center"}>
                <Grid item xs={11.9}>
                    <div className="DashBoardGridContainer">
                        <RecentSalesList />
                    </div>
                </Grid>
            </Grid>
        )
    }
});
