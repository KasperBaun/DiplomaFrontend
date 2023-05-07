import Loading from "@components/loading/Loading";
import { Grid } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import OrderDetailsList from "./components/OrderDetailsList";

const Orders = () => {

    const { backofficeStore } = useContext(MobXContext);

    if (backofficeStore.Orders)
        return (
            <Grid container rowGap={2} columnGap={2} justifyContent={"center"}>
                <Grid item xs={11.9}>
                    <div className="DashBoardGridContainer">
                        <OrderDetailsList origin="OrderPage" tableHeight={750} />
                    </div>
                </Grid>
            </Grid>
        )
    else {
        <Loading />
    }
}

export default observer(Orders);