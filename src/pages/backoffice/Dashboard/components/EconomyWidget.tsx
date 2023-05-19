import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import { useContext } from "react";
import { observer } from 'mobx-react-lite';
import MobXContext from '@stores/MobXContext';
import { ExtentionMethods } from '@utils/ExtentionMethods';
import { Box, Typography } from '@mui/material';

export type EconomyWidgetProps = {
    year: number;
}

interface CustomTooltipProps {
    payload?: any[];
    label?: string;
    active?: boolean;
}

export const EconomyWidget = observer(({ year }: EconomyWidgetProps) => {
    const { backofficeStore, languageStore } = useContext(MobXContext);
    const data = backofficeStore.getChartData(year);


    const currentLanguagecode = languageStore.getCurrentLanguageCode() === "en_US" ? "en-US" : "da-DK";
    const currency = languageStore.currentLanguage.currency;

    const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload, label, active }) => {

        if (active) {
            return (
                <Box sx={{ margin: '10px' }}>
                    <Typography>
                        {label}
                    </Typography>
                    <Typography sx={{ color: 'green' }}>
                        {languageStore.currentLanguage.revenue}: {ExtentionMethods.formatPrice(parseInt((payload[0]?.value?.toString())), currentLanguagecode, currency)}
                    </Typography>
                    <Typography sx={{ color: 'red' }}>
                        {languageStore.currentLanguage.expenses}: {ExtentionMethods.formatPrice(parseInt((payload[1]?.value?.toString())), currentLanguagecode, currency)}
                    </Typography>
                </Box>
            );
        }
        return null;
    }

    return (
        <ResponsiveContainer width="95%" height="80%">
            <LineChart
                width={500} height={250}
                data={data.map((chartData => {
                    return {
                        date: chartData.month,
                        revenue: chartData.revenue,
                        expenses: chartData.expenses
                    }
                }))}
                margin={{
                    top: 16,
                    right: 16,
                    bottom: 0,
                    left: 24,
                }}
            >
                <XAxis dataKey="date" />
                <YAxis>
                    <Label
                        angle={270}
                        position="left"
                        alignmentBaseline='middle'
                        style={{
                            textAnchor: 'middle',

                        }}

                    >
                    </Label>
                </YAxis>
                <Line
                    isAnimationActive={true}
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0AC527"
                />
                <Line
                    isAnimationActive={true}
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ED2E2E"
                />
                <Tooltip
                    content={<CustomTooltip />}
                />
            </LineChart>
        </ResponsiveContainer >
    )
});
