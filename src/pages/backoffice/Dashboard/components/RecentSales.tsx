import { Container, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Spinner } from "react-bootstrap";

class Payment{
  id: number;
  datePaid? : Date;
  amount? : number;
  approved? : number;
  method? : string;
}

interface IProps {
    title : string;
    datePaid : string;
    approved : string;
    amount : string;
    tableButton : string;
    currencyId : string;
    method : string;
}

const RecentSalesList = ( props : IProps ) => {
  const { paymentStore } = useContext(MobXContext);

  function preventDefault(event: React.MouseEvent) {
      event.preventDefault();
  }

  if(paymentStore.Payments) {
    return (
      <React.Fragment>
        <h3>{props.title}</h3>
        <TableContainer sx={{ height: 225 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{props.datePaid}</TableCell>
              <TableCell>{props.approved}</TableCell>
              <TableCell>{props.method}</TableCell>
              <TableCell align="right">{props.amount}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ overflowY: 'auto', maxHeight: '15rem' }}>
            {paymentStore.Payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{ payment.datePaid.toString() }</TableCell>
                <TableCell align="center">{ payment.approved }</TableCell>
                <TableCell align="center">{ payment.method }</TableCell>
                <TableCell align="right">{`${payment.amount} DKK`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
        <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
          {props.tableButton}
        </Link>
      </React.Fragment>
    )
  } else {
    return (
      <Container style={{ textAlign: "center", padding: "15rem" }}>
          <Spinner animation="grow" variant="secondary" /> Loading...
      </Container>
    )
  }
  
}

export default observer(RecentSalesList);