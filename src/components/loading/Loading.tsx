import * as React from "react"
import { CircularProgress, Container } from "@mui/material";

export interface ILoadingProps {
    size?: number;
    color?: string;
    height?: string;
}

export const Loading: React.FC<ILoadingProps> = (props: ILoadingProps) => {
    const size: number = props.size ? props.size : 24;
    const color: string = props.color ? props.color : '#000000';
    const height: string = props.height ? props.height : '100vh';

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: height,
        }} >

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