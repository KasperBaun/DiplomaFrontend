import Loading from "@components/loading/Loading";
import { Box } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite"
import React from "react";
import { useContext } from "react";

interface mineralData {
    mineral : string;
    items : number;
    weight : number;
    price : number;
}

const data: mineralData[] = [
    { mineral: "Gold", items: 1120, weight: 10.2, price: 18142 },
    { mineral: "Silver", items: 5513, weight: 5.4, price: 5296 }
  ];

const SilverAndGold = () => {
    const { languageStore, productStore } = useContext(MobXContext);
    
    if(productStore.ProductItemDetails) {
        let totalWeightGuld = 0;
        let totalWeightSoelv = 0;
        let totalGoldItems = 0;
        let totalSilverItems = 0;
        const currentGoldRatePrKg = 18142;
        const currentSilverRatePrKg = 5296;
      
        // Calculate total weight for each material
        productStore.ProductItemDetails.forEach(item => {
          if(item.material === 4) {
            totalWeightGuld += item.weight;
            totalGoldItems++;
          } else if(item.material === 5) {
            totalWeightSoelv += item.weight;
            totalSilverItems++;
          }
        });

        return (
            <React.Fragment>
                <h3>Gold and Silver</h3>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{languageStore.currentLanguage.AnalysisTitle}</TableCell>
                            <TableCell>{languageStore.currentLanguage.AnalysisItems}</TableCell>
                            <TableCell>{languageStore.currentLanguage.AnalysisWeight}</TableCell>
                            <TableCell>{languageStore.currentLanguage.AnalysisPricePrKg}</TableCell>
                            <TableCell>{languageStore.currentLanguage.AnalysisSummary}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className="hoverRow" key={"sølv_1"}>
                            <TableCell>{languageStore.currentLanguage.AnalysisSilver}</TableCell>
                            <TableCell>{totalSilverItems}</TableCell>
                            <TableCell>{totalWeightSoelv.toFixed(2)} kg</TableCell>
                            <TableCell>{currentSilverRatePrKg.toFixed(2)} DKK</TableCell>
                            <TableCell>{ (totalWeightSoelv * currentSilverRatePrKg).toFixed(2) } DKK</TableCell>
                        </TableRow>
                        <TableRow className="hoverRow" key={"guld_1"}>
                            <TableCell>{languageStore.currentLanguage.AnalysisGold}</TableCell>
                            <TableCell>{totalGoldItems}</TableCell>
                            <TableCell>{totalWeightGuld.toFixed(2)} kg</TableCell>
                            <TableCell>{currentGoldRatePrKg.toFixed(2)} DKK</TableCell>
                            <TableCell>{ (totalWeightGuld * currentGoldRatePrKg).toFixed(2) } DKK</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </React.Fragment>
        )
    } else
        return(
            <Loading />
        )
}

export default observer(SilverAndGold);