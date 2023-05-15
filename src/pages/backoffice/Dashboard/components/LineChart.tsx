import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import MobXContext, { IMobXContext } from "@stores/MobXContext";
import { Constants } from "@utils/Constants";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

export type LineChartProps = {
    data: any;
}

export const LineChart: React.FC = observer(() => {

    const { backofficeStore, languageStore } = useContext<IMobXContext>(MobXContext);
    const yearsAvailable = backofficeStore.getYearsAvailable();
    // const yearsAvailable = [2019, 2020, 2021, 2022, 2023];
    const [year, setYear] = useState<number>(2023);
    const [data, setData] = useState<any>(backofficeStore.getRevenueChartData(year));

    const handleYearChange = (event: any): React.ChangeEventHandler<HTMLSelectElement> => {
        // console.log(event.target.value);
        setData(backofficeStore.getRevenueChartData(event.target.value));
        setYear(event.target.value as number);
        return;
    };

    return (
        <>
            <FormControl sx={{ minWidth: '100%' }}>
                <InputLabel>{languageStore.currentLanguage.select + languageStore.currentLanguage.year}</InputLabel>
                <Select
                    label={languageStore.currentLanguage.select + languageStore.currentLanguage.year}
                    value={year ? year : ''}
                    onChange={handleYearChange}
                    aria-label={languageStore.currentLanguage.selectMaterial}>
                    {yearsAvailable.map((year) => (
                        <MenuItem key={year} value={year}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <VictoryChart theme={VictoryTheme.material}>
                <VictoryLine style={{

                    data: { stroke: Constants.primaryColor },
                    parent: { border: "1px solid #ccc" }
                }}
                    data={data}
                />
            </VictoryChart>
        </>
    )
});