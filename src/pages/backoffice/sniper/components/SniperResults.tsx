import { Box, Container, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { SniperAccordion } from "./SniperAccordion";


export const SniperResults: React.FC = observer(() => {

    const { languageStore, sniperStore } = useContext(MobXContext);

    if (sniperStore.SniperResults.length > 0) {
        return (
            <Container>
                <Box style={{ textAlign: 'center', marginBottom: 3 }}>
                    <Typography variant="h2">
                        {languageStore.currentLanguage.results}
                    </Typography>
                    {sniperStore.SniperResults.map((snipeResult, index) => {
                        return <SniperAccordion result={snipeResult} idx={index} key={"sniperAcc" + index} />
                    })}
                </Box>
            </Container>
        )
    }
    return null;
});