import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { Order } from "@models/Order";
import { ProductDialog } from "./components/ProductDialog";
import Loading from "@components/loading/Loading";

type OrdersProps = {
    displayItemsAmount?: number;
}

export const Orders = observer(({ displayItemsAmount }: OrdersProps) => {

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

        return (
            <TableCell sx={tableCellStyling} ><b><u>
                {order.orderElements.map((element, index) => (
                    <div style={{ display: "flex", justifyContent: "space-between" }} key={index} onClick={() => handleOnProductClick(element.productItemId)}>
                        <b><u>{element.productItemId} {","}</u></b>
                    </div>))
                }</u></b>
            </TableCell>
        )
    }

    if (backofficeStore.Orders) {
        let orders = backofficeStore.Orders;
        if (displayItemsAmount) {
            orders = orders.slice(0, displayItemsAmount);
        }
        return (
            <TableContainer sx={{ padding: 1 }}>
                <Table sx={{ padding: 0 }}>
                    <TableHead >
                        <TableRow>
                            <TableCell sx={tableCellStyling} >{languageStore.currentLanguage.OrderDetailsProductName}</TableCell>
                            <TableCell sx={tableCellStyling} >{languageStore.currentLanguage.OrderDetailsCustomerId}</TableCell>
                            <TableCell sx={tableCellStyling} >{languageStore.currentLanguage.OrderDetailsPaymentStatus}</TableCell>
                            <TableCell sx={tableCellStyling} >{languageStore.currentLanguage.OrderDetailsDeliveryStatus}</TableCell>
                            <TableCell sx={tableCellStyling} >{languageStore.currentLanguage.OrderDetailsDiscountTag}</TableCell>
                            <TableCell sx={tableCellStyling} >{languageStore.currentLanguage.OrderDetailsCompletionStatus}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            orders.map((order, index) => (
                                <TableRow key={order.id + "_orderDetail_" + index}>
                                    {renderProductIdUI(order)}
                                    <TableCell sx={tableCellStyling} >{order.customerId}</TableCell>
                                    <TableCell sx={tableCellStyling} >{order.payment.approved ? "Approved" : "Pending"}</TableCell>
                                    <TableCell sx={tableCellStyling} >{order.deliveryStatus}</TableCell>
                                    <TableCell sx={tableCellStyling} >{order.discountCode}</TableCell>
                                    <TableCell sx={tableCellStyling} >
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
                <ProductDialog ls={languageStore} id={productId} open={openDialog} onClose={handleCloseDialog} />
            </TableContainer>
        )
    }

    else {
        <Loading />
    }
});

const tableCellStyling: React.CSSProperties = {
    padding: '0px'
}
