import { Grid } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { SniperResult } from "@models/SniperResult";
import { SniperSearch } from "./components/SniperForm";
import { SniperResults } from "./components/SniperResults";

export const SniperPage = observer(() => {
    const { sniperStore } = useContext(MobXContext);
    const [isSniping, setIsSniping] = useState<boolean>(false);

    const handleOnSnipingComplete = (result: SniperResult) => {
        sniperStore.addSniperResult(result);
        setIsSniping(false);
    }

    return (
        <Grid container sx={containerStyling} spacing={1} >
            <Grid item xs={12}>
                <SniperSearch isSniping={isSniping} setIsSniping={setIsSniping} onSnipeComplete={handleOnSnipingComplete} />
                <SniperResults />
            </Grid>
        </Grid>
    )
});

const containerStyling: React.CSSProperties = {
    margin: 0,
    padding: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
};
