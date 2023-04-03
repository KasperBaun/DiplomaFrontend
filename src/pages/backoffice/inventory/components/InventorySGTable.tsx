import { Box } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { observer } from "mobx-react-lite"
import '../inventory.scss';

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

    return (
        <Box sx={{ height: 520, width: '100%' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Mineral</TableCell>
                        <TableCell>Items</TableCell>
                        <TableCell>Weight</TableCell>
                        <TableCell>DKK pr. Kg</TableCell>
                        <TableCell>Sum</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { data.map((item, index) => (
                        <TableRow className="hoverRow" key={item.mineral+"_"+index}>
                            <TableCell>{item.mineral}</TableCell>
                            <TableCell>{item.items}</TableCell>
                            <TableCell>{item.weight} kg</TableCell>
                            <TableCell>{item.price} DKK</TableCell>
                            <TableCell>{ item.weight * item.price } DKK</TableCell>
                        </TableRow>
                        )) }
                </TableBody>
            </Table>
        </Box>
    )
}

export default observer(SilverAndGold);