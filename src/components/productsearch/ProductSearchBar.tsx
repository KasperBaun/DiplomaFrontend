import { ProductItem } from "@models/ProductItem";
import { ProductItemWeb } from "@models/ProductItemWeb";
import { TextField } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

export type ProductSearchBarProps = {
    searchText: string;
    setSearchText: (searchText: string) => void;
    showSearchBar?: boolean;
    productItems: ProductItem[] | ProductItemWeb[];
    onItemsChanged: (productItems: ProductItem[] | ProductItemWeb[]) => void;

}

export const ProductSearchBar: React.FC<ProductSearchBarProps> = observer(function ProductSearchBar(props: ProductSearchBarProps) {

    const { languageStore } = useContext(MobXContext);
    const { showSearchBar, productItems, onItemsChanged } = props;

    /* Define state for the searchbar component */
    const { searchText, setSearchText } = props;

    /* Define handlers for actions */
    const handleSearchTextChange = (event: any): React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> => {
        setSearchText(event.target.value);
        const filteredProductItems = productItems.filter(
            productItem =>
                productItem.product.name.toLowerCase().includes(searchText.toLowerCase()) ||
                productItem.product.modelNumber.toString().includes(searchText.toLowerCase())
        );
        onItemsChanged(filteredProductItems);
        return;
    }

    function handleEnterKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === "Enter") {
            // Enter key was pressed
            const filteredProductItems = productItems.filter(
                productItem =>
                    productItem.product.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    productItem.product.modelNumber.toString().includes(searchText.toLowerCase())
            );
            onItemsChanged(filteredProductItems);
        }
    }

    if (!showSearchBar) return null;
    else {
        return (
            <TextField
                label={languageStore.currentLanguage.search}
                type="search"
                placeholder={languageStore.currentLanguage.search.toLowerCase() + "..."}
                value={searchText}
                onChange={handleSearchTextChange}
                sx={{ marginRight: '10px', minWidth: '15vw' }}
                onKeyDownCapture={handleEnterKeyDown}
            />
        )
    }
});