import { Grid } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { SniperResult } from "@models/SniperResult";
import SniperForm from "./components/SniperForm";
import Loading from "@components/loading/Loading";

export const SniperPage = observer(() => {
    const { backofficeStore } = useContext(MobXContext);
    const [snipedResults, setSnipedResults] = useState<SniperResult[]>(backofficeStore.SniperResults);
    const [isSniping, setIsSniping] = useState<boolean>(false);

    const handleOnSnipingComplete = (result: SniperResult) => {
        setSnipedResults([...snipedResults, result]);
        setIsSniping(false);

    }

    return (
        <Grid container rowGap={2} columnGap={2} justifyContent={"center"}>
            <Grid item xs={11.9}>
                <div className="DashBoardGridContainer">
                    <SniperForm isSniping={isSniping} setIsSniping={setIsSniping} onSnipeComplete={handleOnSnipingComplete} />
                    {isSniping && <Loading />}
                    {/* {
                        snipedResults.length > 0 &&
                        <div className="sniperResults">
                            <h2>Sniper Results</h2>
                            {snipedResults.map(snipeResult => {
                                <SnipedTable snipedResults={snipeResult.sniperResult} isSniping={isSniping} setIsSniping={setIsSniping} />

                            })}
                        </div>

                    } */}
                </div>
            </Grid>
        </Grid>
    )
});
