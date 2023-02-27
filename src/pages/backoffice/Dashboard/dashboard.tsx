import { Col, Container, Row } from "react-bootstrap";
import Cards from "./components/Cards";
import "./css/dashboard.scss";

const BackOfficeDashboard = () => {

    return (
        <Container>
            <Row style={{ padding: "2rem" }}>
                <Col>
                    <Cards url="https://h5p.org/sites/default/files/styles/medium-logo/public/logos/chart-icon-color.png?itok=kpLTYHHJ" var1="Products Sold" var2="1000"/> 
                </Col>
                <Col>
                    <Cards url="data:image/png;base64,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" /> 
                </Col>
                <Col>
                    <Cards url="https://docs.moodle.org/dev/images_dev/a/a9/doughnut_pie_chart.png" var1="Test"/> 
                </Col>
                <Col>
                    <Cards url="https://www.imf.org/wp-content/uploads/2017/08/BLOG-1024x600-image-of-charts-TOP5Charts-iStock-615507200.jpg" var2="Test"/> 
                </Col>
                <Col>
                    <Cards url="https://lh3.googleusercontent.com/g0Jw-I6-gH2DVCpnl3u8QKZVT_meR9lcJlpyeSZ-MyvwLnyEZvgyrY5frldA8HCv55s=w280-rwa" /> 
                </Col>
                <Col>
                    <Cards url="https://www.w3schools.com/python/img_matplotlib_pie1.png" /> 
                </Col>
            </Row>
        </Container>
    )
}

export default BackOfficeDashboard;