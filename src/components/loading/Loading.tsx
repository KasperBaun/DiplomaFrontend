import * as React from "react"
import { Constants } from "../../utils/Constants"
import { CircularProgress } from "@mui/material";

export interface ILoadingProps {
    loadingText?: string;
    size?: number;
    color?: string;
}

export const Loading: React.FC<ILoadingProps> = (props: ILoadingProps) => {
    const size: number = props.size ? props.size : 24;
    const color: string = props.color ? props.color : '#000000';

    return (
        // <div style={{ display: 'flex', flexDirection: 'row', margin: '0', padding: '0', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', marginTop: '20%' }}>
        <div>
            <CircularProgress
                size={size}
                sx={{
                    color: color,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                }}
            />
            {props.loadingText &&
                <h2 style={{ color: Constants.primaryColor, marginTop: '10px' }} >{props.loadingText}</h2>
            }
        </div>
    )
}

export default Loading;