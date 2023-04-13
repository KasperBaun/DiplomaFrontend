import { observer } from "mobx-react-lite";
import InventoryCards from "./components/InventoryCards";
import './inventory.scss';

const InventoryMain = () => {
    return (
        <>
            <InventoryCards />
        </>
    )
}

export default observer(InventoryMain);