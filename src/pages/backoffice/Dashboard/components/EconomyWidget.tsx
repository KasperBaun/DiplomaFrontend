import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { useContext } from "react";
import { observer } from 'mobx-react-lite';
import MobXContext from '@stores/MobXContext';
import { ExtentionMethods } from '@utils/ExtentionMethods';

export type EconomyWidgetProps = {
    year: number;
}

export const EconomyWidget = observer(({ year }: EconomyWidgetProps) => {
    const { backofficeStore, languageStore } = useContext(MobXContext);
    const data = backofficeStore.getChartData(year);
    const transformedData = data.map((chartData => {
        return {
            date: chartData.month,
            revenue: chartData.revenue,
            expenses: chartData.expenses
        }
    }))

    const currentLanguagecode = languageStore.getCurrentLanguageCode() === "en_US" ? "en-US" : "da-DK";
    const currency = languageStore.currentLanguage.currency;

    return (
        <ResponsiveContainer width="95%" height="80%">
            <LineChart
                width={500} height={250}
                data={transformedData}
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
                        formatter={(value: number) => ExtentionMethods.formatPrice(value, currentLanguagecode, currency)}
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
            </LineChart>
        </ResponsiveContainer >
    )
});
