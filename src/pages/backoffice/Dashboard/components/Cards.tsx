import { Card } from "react-bootstrap";


interface IProps {
    url : string;
    var1 ?: string;
    var2 ?: string;
}

const Cards = (props : IProps) => {
    return (
        <Card className="DashBoardCards">
            <Card.Img src={props.url}></Card.Img>
            { 
                props.var1 ? (
                    <CardWithText1 title={props.var1} text={props.var2} />
                ) : null}
        </Card>
    )
}

interface CardWithTextProps {
    title : string;
    text ?: string;
}

const CardWithText1 = (props : CardWithTextProps) => {
    return (
        <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            { props.text ? props.text : "" }
        </Card.Body>
    )
}

export default Cards;