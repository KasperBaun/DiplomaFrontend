import { Card, CardMedia, CardContent, Typography, CardHeader  } from "@mui/material/";


interface IProps {
    url ?: string;
    var1 ?: string;
    var2 ?: string;
    styleclass ?: string;
    header ?: boolean;
}

const Cards = (props : IProps) => {
    return (
        <Card className={props.styleclass} variant="outlined">
            {
                props.url ? (
                    <CardMedia component="img" className="DashBoardCards_image" image={props.url}></CardMedia>
                ) : (
                    <CardMedia component="img" className="DashBoardCards_image"></CardMedia>
                )
            }
            <hr />
            { 
                props.header ? (
                    <CardWithTextAndHeader title={props.var1} text={props.var2} /> 
                ) : (
                    <CardWithText1 title={props.var1} text={props.var2} />
                )
            }
        </Card>
    )
}

interface CardWithTextProps {
    title : string;
    text ?: string;
}

const CardWithText1 = (props : CardWithTextProps) => {
    return (
        <CardContent>
            <Typography variant="h5">{props.title}</Typography>
            <Typography variant="body2">
                { props.text ? props.text : "" }
            </Typography>
        </CardContent>
    )
}


const CardWithTextAndHeader = (props : CardWithTextProps) => {
    return (
        <CardContent>
            <CardHeader title={props.title} subheader={Date.now()} />
            <Typography variant="body2">
                { props.text ? props.text : "" }
            </Typography>
        </CardContent>
    )
}

export default Cards;