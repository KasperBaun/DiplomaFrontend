import { Link, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import React, { useContext } from "react";

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
      'Creditcard ⠀•••• 3719',
      312.44,
    ),
    createData(
      1,
      '16 Mar, 2019',
      'Paul McCartney',
      'London, UK',
      'Creditcard ⠀•••• 2574',
      866.99,
    ),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'Stripe ⠀•••• 1253', 100.81),
    createData(
      3,
      '16 Mar, 2019',
      'Michael Jackson',
      'Gary, IN',
      'MobilePay +45 41432725',
      654.39,
    ),
    createData(
      4,
      '15 Mar, 2019',
      'Bruce Springsteen',
      'Long Branch, NJ',
      'Creditcard ⠀•••• 5919',
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
  const {  } = useContext(MobXContext);
    
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