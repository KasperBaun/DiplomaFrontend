import MobXContext from "@stores/MobXContext";
import { Product } from "@models/Product";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

type ProductsTableProps = {
    products: Product[];
}

export const ProductsTable: React.FC<ProductsTableProps> = observer(({ products }: ProductsTableProps) => {

    const { languageStore } = useContext(MobXContext);

    if (products.length > 0) {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{languageStore.currentLanguage.name}</TableCell>
                            <TableCell>{languageStore.currentLanguage.modelNumber}</TableCell>
                            <TableCell>{languageStore.currentLanguage.manufacturer}</TableCell>
                            <TableCell>{languageStore.currentLanguage.material}</TableCell>
                            <TableCell>{languageStore.currentLanguage.design}</TableCell>
                            <TableCell>{languageStore.currentLanguage.dimension}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.modelNumber}</TableCell>
                                <TableCell>{product.manufacturer}</TableCell>
                                <TableCell>{product.material ? languageStore.currentLanguage.getMaterialType(product.material) : ''}</TableCell>
                                <TableCell>{product.design}</TableCell>
                                <TableCell>{product.dimension}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    } else {
        return null;
    }
})