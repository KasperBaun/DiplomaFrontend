import SniperModel from "@models/SniperModel";
import { Container } from "@mui/material";
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
        <Container>
            <SniperForm setSearchValue={setSearchValue} setIsSniping={setIsSniping} isSniping={isSniping} snipedResults={snipedResults}/>
            <SnipedTable snipedResults={snipedResults} isSniping={isSniping} setIsSniping={setIsSniping} />
        </Container>
    )
}

export default observer(Sniper);