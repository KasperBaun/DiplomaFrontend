import { Box, Typography } from "@mui/material";
import ColorConfigs from "styling/ColorConfigs";
import ProgressCircle from "./ProgressCircle";

export interface IStatBoxProps {
    title: string;
    subtitle: string;
    icon: JSX.Element;
    progress: number;
    increase: number;
}

const StatBox: React.FC<IStatBoxProps> = function StatBox(props: IStatBoxProps) {

    return (
        <Box width="100%" m="0 30px" >
            <Box display="flex" justifyContent="space-between">
                <Box>
                    {props.icon}
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ color: ColorConfigs.primaryTextColor }}
                    >
                        {props.title}
                    </Typography>
                </Box>
                <Box>
                    <ProgressCircle size={50} progress={props.progress} />
                </Box>

                <Box display="flex" justifyContent="space-between">
                    <Typography
                        variant="h5"
                        sx={{ color: ColorConfigs.secondaryTextColor }}
                    >
                        {props.subtitle}
                    </Typography>
                    <Typography
                        variant="h5"
                        fontStyle="italic"
                        sx={{ color: "green" }}
                    >
                        {props.increase}
                    </Typography>
                </Box>
            </Box>

        </Box>
    )
}

export default StatBox;