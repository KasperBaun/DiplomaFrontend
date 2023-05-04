import * as React from "react"
import { Constants } from "../../utils/Constants"
import { CircularProgress, Container } from "@mui/material";
import LionLogo from "@components/LionLogo";

export interface ILoadingProps {
    loadingText?: string;
    size?: number;
    color?: string;
}

export const Loading: React.FC<ILoadingProps> = (props: ILoadingProps) => {
    const size: number = props.size ? props.size : 24;
    const color: string = props.color ? props.color : '#000000';

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }} >
            <LionLogo color={props.color} />
            {props.loadingText &&
                <h2 style={{ color: Constants.primaryColor }} >{props.loadingText}</h2>
            }
            <CircularProgress
                size={size}
                sx={{
                    color: color,
                }}
            />
        </Container>
    )
}

export default Loading;