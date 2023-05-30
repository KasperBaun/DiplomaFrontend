import { Grid } from '@mui/material';
import { InventoryCards } from "./InventoryCards";

export const InventoryMain = () => {
    return (
        <Grid container rowGap={2} columnGap={2} justifyContent={"center"}>
            <Grid item xs={11.9}>
                <div className="DashBoardGridContainer">
                    <InventoryCards />
                </div>
            </Grid>
        </Grid>
    )
}
