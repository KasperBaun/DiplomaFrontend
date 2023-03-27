import SniperModel from "@models/SniperModel";
import { Container } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import SnipedElements from "./components/SnipedElement";
import SniperForm from "./components/SniperForm";

const Sniper = () => {
    const [snipedResults, setSnipedResults] = useState<SniperModel[]>();
    const [hasSnipedValue, setHasSnipedValues] = useState<boolean>(false);
    const [isSniping, setIsSniping] = useState<boolean>(false);


    return (
        <Container>
            <SniperForm setIsSniping={setIsSniping} setSnipedResults={setSnipedResults} setHasSnipedValues={setHasSnipedValues} snipedResults={snipedResults}/>
            <SnipedElements setIsSniping={setIsSniping} isSniping={isSniping} snipedResults={snipedResults} />
        </Container>
    )
}

export default observer(Sniper);