import { Grid } from '@mui/material';
import SilverAndGold from './components/InventorySGTable';
const Analysis = () => {
    return (
        <Grid container rowGap={2} columnGap={2} justifyContent={"center"}>
            <Grid item xs={11.9}>
                <div className="DashBoardGridContainer">
                    <SilverAndGold />
                </div>
            </Grid>
        </Grid>
    )
}

export default Analysis;