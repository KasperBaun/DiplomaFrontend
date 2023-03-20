import SniperModel from "@models/SniperModel";
import { Container } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import SniperForm from "./components/SniperForm";

const Sniper = () => {
    const { sniperStore, languageStore } = useContext(MobXContext)
    const [snipedResults, setSnipedResults] = useState<SniperModel[]>();
    const [hasSnipedValue, setHasSnipedValues] = useState<boolean>(false);



    return (
        <Container>
            <SniperForm setSnipedResults={setSnipedResults} setHasSnipedValues={setHasSnipedValues} snipedResults={snipedResults}/>
        </Container>
    )
}

export default observer(Sniper);