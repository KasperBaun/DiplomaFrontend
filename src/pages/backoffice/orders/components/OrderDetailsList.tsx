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
import Order from "@models/Order";

interface IProps {
    tableHeight: number;
    origin: string
}

const OrderDetailsList = ({ tableHeight, origin }: IProps) => {
    const { backofficeStore, languageStore } = useContext(MobXContext);
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

    function renderProductIdUI(order: Order) {

        if (origin === "MainPage") {
            return (
                <TableCell className="tableCellOnClick" align="left"><b><u>{order.orderElements.map((element, index) => (
                    <div key={index} className="tableCellOnClick" onClick={() => handleOnProductClick(element.productItemId)}>
                        <b><u>{element.productItemId}</u></b>
                    </div>))}</u></b></TableCell>
            )
        }
        else {
            return (
                <TableCell className="tableCellOnClick" align="left"><b style={{ display: "flex" }}><u style={{ display: "flex" }}>
                    {order.orderElements.map((element, index) => (
                    <div style={{ display: "flex", justifyContent: "space-between" }} key={index} className="tableCellOnClick" onClick={() => handleOnProductClick(element.productItemId)}>
                        <b><u>{element.productItemId} {","}</u></b>
                    </div>))
                    }</u></b>
                </TableCell>
            )
        }
    }

    if (backofficeStore.Orders)
        return (
            <React.Fragment>
                <h4>{languageStore.currentLanguage.OrderDetailsListTitle}</h4>
                <TableContainer sx={{ height: tableHeight }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">{languageStore.currentLanguage.OrderDetailsProductName}</TableCell>
                                <TableCell align="left">{languageStore.currentLanguage.OrderDetailsCustomerId}</TableCell>
                                <TableCell align="left">{languageStore.currentLanguage.OrderDetailsPaymentStatus}</TableCell>
                                <TableCell align="left">{languageStore.currentLanguage.OrderDetailsDeliveryStatus}</TableCell>
                                <TableCell align="left">{languageStore.currentLanguage.OrderDetailsDiscountTag}</TableCell>
                                <TableCell align="center">{languageStore.currentLanguage.OrderDetailsCompletionStatus}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                backofficeStore.Orders.map((order, index) => (
                                    <TableRow key={order.id + "_orderDetail_" + index}>
                                        {renderProductIdUI(order)}
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