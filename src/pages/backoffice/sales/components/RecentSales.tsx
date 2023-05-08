import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Payment from "@models/Payment";

interface IProps {
  title: string;
  datePaid: string;
  approved: string;
  amount: string;
  tableButton: string;
  currencyId: string;
  method: string;
  tableHeight: number;
}

const RecentSalesList = (props: IProps) => {
  const { backofficeStore } = useContext(MobXContext);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    const sortedPayments = [...backofficeStore.Payments].sort((a: Payment, b: Payment) =>
      new Date(b.datePaid).getTime() - new Date(a.datePaid).getTime()
    );
    backofficeStore.Payments = sortedPayments;
  }, []);

  if (backofficeStore.Payments) {
    const sortByDate = () => {
      const sortedPayments = [...backofficeStore.Payments].sort((a: Payment, b: Payment) => {
        const dateA = new Date(a.datePaid);
        const dateB = new Date(b.datePaid);
        return toggle ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      });
      backofficeStore.Payments = sortedPayments;
      setToggle(!toggle);
    };

    return (
      <React.Fragment>
        <h4>{props.title}</h4>
        <TableContainer sx={{ height: props.tableHeight }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left" onClick={sortByDate}><TableSortLabel
                  active
                  direction={toggle ? 'desc' : 'asc'}
                  onClick={sortByDate}
                >
                  {props.datePaid}
                </TableSortLabel></TableCell>
                <TableCell align="center" >{props.approved}</TableCell>
                <TableCell align="center" >{props.method}</TableCell>
                <TableCell align="right">{props.amount}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ overflowY: 'auto', maxHeight: '15rem' }}>
              {backofficeStore.Payments
                .map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      {`${new Date(payment.datePaid).getDate().toString().padStart(2, '0')}-${(new Date(payment.datePaid).getMonth() + 1).toString().padStart(2, '0')
                        }-${new Date(payment.datePaid).getFullYear()} | ${new Date(payment.datePaid).getHours().toString().padStart(2, '0')
                        }:${new Date(payment.datePaid).getMinutes().toString().padStart(2, '0')}`}
                    </TableCell>
                    <TableCell align="center">
                      {payment.approved ? (
                        <CheckBoxIcon style={{ color: 'green' }} />
                      ) : (
                        <CancelPresentationIcon style={{ color: 'red' }} />
                      )}
                    </TableCell>
                    <TableCell align="center">{payment.method}</TableCell>
                    <TableCell align="right">{`${payment.amount.toFixed(2)} DKK`}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
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