import { Link, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

function createData(
    id: number,
    date: string,
    name: string,
    shipTo: string,
    paymentMethod: string,
    amount: number,
  ) {
    return { id, date, name, shipTo, paymentMethod, amount };
  }
  
  const rows = [
    createData(
      0,
      '16 Mar, 2019',
      'Elvis Presley',
      'Tupelo, MS',
      'VISA ⠀•••• 3719',
      312.44,
    ),
    createData(
      1,
      '16 Mar, 2019',
      'Paul McCartney',
      'London, UK',
      'VISA ⠀•••• 2574',
      866.99,
    ),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(
      3,
      '16 Mar, 2019',
      'Michael Jackson',
      'Gary, IN',
      'AMEX ⠀•••• 2000',
      654.39,
    ),
    createData(
      4,
      '15 Mar, 2019',
      'Bruce Springsteen',
      'Long Branch, NJ',
      'VISA ⠀•••• 5919',
      212.79,
    ),
  ];

interface IProps {
    title : string;
    tableDate : string;
    tableName : string;
    tableLoc : string;
    tablePay : string;
    tableSaleAmount : string;
    tableButton : string;
    currencyId : string;
}

const RecentSalesList = ( props : IProps) => {
    
    function preventDefault(event: React.MouseEvent) {
        event.preventDefault();
    }
    return (
        <React.Fragment>
            <h3>{props.title}</h3>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{props.tableDate}</TableCell>
              <TableCell>{props.tableName}</TableCell>
              <TableCell>{props.tableLoc}</TableCell>
              <TableCell>{props.tablePay}</TableCell>
              <TableCell align="right">{props.tableSaleAmount}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.shipTo}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell align="right">{`${row.amount} DKK`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
          {props.tableButton}
        </Link>
      </React.Fragment>
    )
}

export default RecentSalesList;