import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { Payment } from "@models/Payment";
import LoadingLion from "@components/loading/LoadingLion";

type RecentSalesListProps = {
  displayNumberOfItems?: number;
}

export const RecentSalesList = observer((props: RecentSalesListProps) => {
  const { backofficeStore, languageStore } = useContext(MobXContext);

  if (!backofficeStore.isLoaded) {
    return <LoadingLion size={50} />;
  }
  else {
    const [toggleDirection, setToggleDirection] = useState<'asc' | 'desc'>('asc');
    const [sortedPayments, setSortedPayments] = useState<Payment[]>(backofficeStore.getPaymentsSortedByDate('asc', props.displayNumberOfItems));

    const handleSortByDateClicked = () => {
      const toggleDir = toggleDirection === 'asc' ? 'desc' : 'asc';
      setSortedPayments(backofficeStore.getPaymentsSortedByDate(toggleDir, props.displayNumberOfItems));
      setToggleDirection(toggleDir);
    }

    return (
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left" onClick={handleSortByDateClicked}><TableSortLabel
                active
                direction={toggleDirection}
                onClick={handleSortByDateClicked}
              >
                {languageStore.currentLanguage.RecentSalesDatePaid}
              </TableSortLabel></TableCell>
              <TableCell align="center" >{languageStore.currentLanguage.RecentSalesApproved}</TableCell>
              <TableCell align="center" >{languageStore.currentLanguage.RecentSalesMethod}</TableCell>
              <TableCell align="right">{languageStore.currentLanguage.RecentSalesAmount}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ overflowY: 'auto', maxHeight: '15rem' }}>
            {sortedPayments.map((payment) => (
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
    )
  }
});

