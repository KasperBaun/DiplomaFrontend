import { observer } from "mobx-react-lite";
import InventoryCards from "./components/InventoryCards";
import SilverAndGold from "./components/InventorySGTable";
import './inventory.scss';

const InventoryMain = () => {
    return (
        <>
            <InventoryCards />
            <hr />
            <SilverAndGold />
        </>
    )
}

export default observer(InventoryMain);