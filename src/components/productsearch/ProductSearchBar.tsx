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
    style?: React.CSSProperties;
    productItems: ProductItem[] | ProductItemWeb[];
    onItemsChanged: (productItems: ProductItem[] | ProductItemWeb[]) => void;
    headerBar: Boolean;
}

export const ProductSearchBar: React.FC<ProductSearchBarProps> = observer(function ProductSearchBar(props: ProductSearchBarProps) {

    const { languageStore } = useContext(MobXContext);
    const { showSearchBar, productItems, onItemsChanged, headerBar } = props;

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

        if (headerBar === false){
            return (
                <TextField
                    label={languageStore.currentLanguage.search}
                    type="search"
                    variant="outlined"
                    placeholder={languageStore.currentLanguage.search.toLowerCase() + "..."}
                    value={searchText}
                    onChange={handleSearchTextChange}
                    sx={props.style ? props.style : {}}
                    onKeyDownCapture={handleEnterKeyDown}
                />
            )
        }
        else if (headerBar === true){
            return (
                <div>
                    <TextField
                        label={languageStore.currentLanguage.search}
                        type="search"
                        variant="outlined"
                        placeholder={languageStore.currentLanguage.search.toLowerCase() + "..."}
                        value={searchText}
                        onChange={handleSearchTextChange}
                        sx={props.style ? props.style : {}}
                        onKeyDownCapture={handleEnterKeyDown}
                    />
                </div>
            )
        }
    }
});