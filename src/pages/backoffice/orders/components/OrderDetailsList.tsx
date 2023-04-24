import Loading from "@components/loading/Loading";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import React from "react";
import ProductDialog from "./ProductDialog";
import '../../css/backoffice.scss';

interface IProps {
    tableHeight: number;
  }

const OrderDetailsList = ( {tableHeight} : IProps ) => {
    const { orderStore, languageStore } = useContext(MobXContext);
    const [openDialog, setOpenDialog] = useState(false);

    const [productId, setProductId] = useState(0);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleOnProductClick = (id: number) => {
        setProductId(id);
        handleOpenDialog();
    }

    if (orderStore.OrderDetails)
        return (
            <React.Fragment>
                <h4>{languageStore.currentLanguage.OrderDetailsListTitle}</h4>
                <TableContainer sx={{ height: tableHeight }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">{languageStore.currentLanguage.OrderDetailsProductName}</TableCell>
                                <TableCell align="left">{languageStore.currentLanguage.OrderDetailsManufacturer}</TableCell>
                                <TableCell align="left">{languageStore.currentLanguage.OrderDetailsCustomerId}</TableCell>
                                <TableCell align="left">{languageStore.currentLanguage.OrderDetailsPaymentStatus}</TableCell>
                                <TableCell align="left">{languageStore.currentLanguage.OrderDetailsDeliveryStatus}</TableCell>
                                <TableCell align="left">{languageStore.currentLanguage.OrderDetailsDiscountTag}</TableCell>
                                <TableCell align="center">{languageStore.currentLanguage.OrderDetailsCompletionStatus}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                orderStore.OrderDetails.map((order, index) => (
                                    <TableRow key={order.id + "_orderDetail_" + index}>
                                        <TableCell className="tableCellOnClick" align="left" onClick={() => handleOnProductClick(order.productItemId)}><b><u>{order.productItemId}</u></b></TableCell>
                                        <TableCell align="left">{order.manufacturer}</TableCell>
                                        <TableCell align="left">{order.customerId}</TableCell>
                                        <TableCell align="left">{order.paymentStatus}</TableCell>
                                        <TableCell align="left">{order.deliveryStatus}</TableCell>
                                        <TableCell align="left">{order.discountCode}</TableCell>
                                        <TableCell align="left">
                                            {order.active ? (
                                                <CheckBoxIcon style={{ color: 'green' }} />
                                            ) : (
                                                <CancelPresentationIcon style={{ color: 'red' }} />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))

                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <ProductDialog ls={languageStore} id={productId} open={openDialog} onClose={handleCloseDialog} />
            </React.Fragment>
        )
    else {
        <Loading />
    }
}

export default observer(OrderDetailsList);