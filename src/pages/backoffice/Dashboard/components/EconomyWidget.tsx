import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import React from "react";

function createData(date: string, sale?: number, purchase?: number) {
    return { date, sale, purchase };
}
  
const data = [
    createData('3/03-2023', 0, 20000),
    createData('4/03-2023', 4000, 300),
    createData('5/03-2023', 600, 4000),
    createData('6/03-2023', 8000, 1200),
    createData('7/03-2023', 1500, 2450),
    createData('8/03-2023', 2000, 100),
    createData('9/03-2023', 2400, 1000),
    createData('10/03-2023', 24000, 10000),
    createData('11/03-2023', 1000, 1000),
];


interface IProps {
    title : string;
    salgsformat : string;
}
const EconomyWidget = ({title, salgsformat} : IProps) => {
    return (
        <React.Fragment>
            <h3>{title}</h3>
            <ResponsiveContainer width="95%" height="80%">
                <LineChart
                width={500} height={250}
                data={data}
                margin={{
                    top: 16,
                    right: 16,
                    bottom: 0,
                    left: 24,
                }}
                >
                <XAxis dataKey="date"/>
                <YAxis>
                    <Label
                    angle={270}
                    position="left"
                    style={{
                        textAnchor: 'middle',
                    }}
                    >
                        { salgsformat }
                    </Label>
                </YAxis>
                <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="sale"
                    stroke="#0AC527"
                />
                <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="purchase"
                    stroke="#ED2E2E"
                />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    )
}

export default EconomyWidget;