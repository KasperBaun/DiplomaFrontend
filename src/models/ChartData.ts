export type ChartData = {
    type: 'bar' | 'line' | 'pie' | 'doughnut' | 'radar' | 'polarArea';
    data: {
        labels: string[];
        datasets: ChartDataSet[];
    };
}

export type ChartDataSet = {
        label: string;
        data: number[];
        fill?: boolean;
        borderColor?: string;
        backgroundColor?: string;
        tension?: number;
        borderWidth?: number;
}