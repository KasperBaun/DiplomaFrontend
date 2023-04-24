import SniperModel from "@models/SniperModel";
import { Grid } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import SnipedTable from "./components/Table";
import SniperForm from "./components/SniperForm";

const Sniper = () => {
    const [snipedResults, setSnipedResults] = useState<SniperModel[]>();
    const [searchValue, setSearchValue] = useState<string>("");
    const [isSniping, setIsSniping] = useState<boolean>(false);
    const { sniperStore } = useContext(MobXContext);

    const startSniping = async () => {
        setSnipedResults(await sniperStore.GetSniping(searchValue));
    }

    if(isSniping) {
        startSniping();
    }

    return (
        <Grid container rowGap={2} columnGap={2} justifyContent={"center"}>
            <Grid item xs={11.9}>
                <div className="DashBoardGridContainer">
                    <SniperForm setSearchValue={setSearchValue} setIsSniping={setIsSniping} isSniping={isSniping} snipedResults={snipedResults}/>
                    <SnipedTable snipedResults={snipedResults} isSniping={isSniping} setIsSniping={setIsSniping} />
                </div>
            </Grid>
        </Grid>
    )
}

export default observer(Sniper);