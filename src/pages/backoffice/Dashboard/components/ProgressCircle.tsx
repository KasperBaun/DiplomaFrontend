import { Box } from "@mui/material";
import ColorConfigs from "styling/ColorConfigs";

export interface IProgressCircleProps {
    progress: number;
    size: number;
}

const ProgressCircle: React.FC<IProgressCircleProps> = function ProgressCircle(props: IProgressCircleProps) {

    const angle = props.progress * 360;

    return (
        <Box
            sx={{
                background: `radial-gradient(${ColorConfigs.primaryColor} 55%, transparent 56%),
                    conic-gradient(transparent 0deg ${angle}deg, ${ColorConfigs.secondaryColor} ${angle}deg 360deg),
                    ${ColorConfigs.primaryColor}`,
                borderRadius: '50%',
                width: `${props.size}px`,
                height: `${props.size}px`,
            }}
        >

        </Box>
    )
}

export default ProgressCircle;