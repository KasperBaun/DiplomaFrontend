import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Col, Container, Row, Spinner, Table } from "react-bootstrap";

const SalesSummary = () => {

    const { languageStore, paymentStore } = useContext(MobXContext);

    if(paymentStore.SalesSummaries != null)
        return (
            <>
                <Row><h3>{languageStore.currentLanguage.SalesSummaryTitle}</h3></Row>
                <Table>
                    <thead>
                        <tr>
                            <th>{languageStore.currentLanguage.SalesSummaryTotalSales}</th>
                            <th>{languageStore.currentLanguage.SalesSummaryTotalAmount}</th>
                        </tr>
                    </thead>
                    <tbody>                
                    { paymentStore.SalesSummaries.map((sum, index) => (
                        <tr key={"sales_" +index}>
                            <td>{sum.totalSales}</td>
                            <td>{sum.totalAmount.toFixed(2)} DKK</td>
                        </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </>
        )
    else {
        return (
            <Container style={{ textAlign: "center", padding: "15rem" }}>
            <Spinner animation="grow" variant="secondary" /> Loading...
            </Container>
        )
    }
}

export default observer(SalesSummary);