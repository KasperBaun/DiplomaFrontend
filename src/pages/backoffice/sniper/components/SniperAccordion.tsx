import { SniperResult } from "@models/SniperResult"
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { SnipedTable } from "./SnipedTable";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { FiberNew } from "@mui/icons-material";


export type SniperAccordionProps = {
    result: SniperResult;
    idx: number;
}

export const SniperAccordion: React.FC<SniperAccordionProps> = observer(({ result, idx }: SniperAccordionProps) => {
    const [isOpened, setIsOpened] = useState(false);

    const handleAccordionChange = () => {
        setIsOpened(true);
    };

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
                    {!isOpened && <FiberNew sx={{ marginLeft: 5 }} />}
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
