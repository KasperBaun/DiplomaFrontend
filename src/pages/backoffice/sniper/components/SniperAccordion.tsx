import { SniperResult } from "@models/types/SniperResult"
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { SnipedTable } from "./SnipedTable";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FiberNew } from "@mui/icons-material";
import { runInAction } from "mobx";


type SniperAccordionProps = {
    result: SniperResult;
    idx: number;
}

export const SniperAccordion: React.FC<SniperAccordionProps> = observer(({ result, idx }: SniperAccordionProps) => {

    const handleAccordionChange = () => runInAction(() => {
        result.open = !result.open
        if (result.new) {
            result.new = false;
        }
    });;


    return (
        <Accordion
            key={"acc" + result.product.name + idx}
            onChange={handleAccordionChange}
        >
            <AccordionSummary
                key={"accsumm" + result.product.name + idx}
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography display='flex' justifyContent={'space-between'} >
                    {result.product.name}
                    {result.new && <FiberNew sx={{ marginLeft: 5 }} />}
                </Typography>
            </AccordionSummary>
            <AccordionDetails key={"accdetails" + result.product.name + idx}>
                <SnipedTable
                    results={result.sniperResult}
                    key={"snipedTable" + result.product.name + idx}
                />
            </AccordionDetails>
        </Accordion>
    )
});
