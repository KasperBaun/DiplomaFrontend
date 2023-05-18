import { ChartData } from "@models/ChartData";
import { observer } from "mobx-react-lite";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

export type LineChartProps = {
    data: ChartData[];
}

export const LineChart: React.FC<LineChartProps> = observer(({ data }: LineChartProps) => {

    if (data.length === 0) {
        return <></>
    } else {
        const expenseData: { x: string, y: number }[] = data.map((item: any) => { return { x: item.month, y: item.expenses } });
        const revenueData: { x: string, y: number }[] = data.map((item: any) => { return { x: item.month, y: item.revenue } });
        return (
            <VictoryChart theme={VictoryTheme.material}>
                <VictoryLine
                    style={{
                        data: { stroke: 'red' },
                        parent: { border: '1px solid #ccc' }
                    }}
                    data={expenseData}
                />
                <VictoryLine
                    style={{
                        data: { stroke: 'green' },
                        parent: { border: '1px solid #ccc' }
                    }}
                    data={revenueData}
                />
            </VictoryChart>
        )
    }
});

