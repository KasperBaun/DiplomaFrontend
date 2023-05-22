import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import MobXContext, { IMobXContext } from '@stores/MobXContext';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { SubCategory } from '@models/SubCategory';
import { materialType } from '@models/Enums';
import { ProductItem } from '@models/ProductItem';
import { observer } from 'mobx-react-lite';

type ProductDetailsProps = {
    productItem?: ProductItem;
}

export const ProductDetails: React.FC<ProductDetailsProps> = observer((props: ProductDetailsProps) => {
    const { productItem } = props;
    const { languageStore, backofficeStore } = useContext<IMobXContext>(MobXContext);
    const [selectedSubcategory, setSelectedSubcategory] = useState<SubCategory>(null);
    const [selectedMaterial, setSelectedMaterial] = useState<materialType>(productItem?.product?.material ? productItem.product.material : null);

    const handleSubcategoryChange = (event: any): React.ChangeEventHandler<HTMLSelectElement> => {
        if (event.target.value === "initValue") {
            setSelectedSubcategory(null);
            return;
        }
        else {
            const subcategoryId: number = event.target.value;
            const subcat = backofficeStore.getSubcategory(subcategoryId);
            if (subcat) {
                productItem.product.subcategories.push(subcat);
                setSelectedSubcategory(subcat);
                return;

            } else {
                alert("Subcategory not found");
            }
        }
    }

    const handleMaterialChange = (event: any): React.ChangeEventHandler<HTMLSelectElement> => {
        if (event.target.value === "initValue") {
            setSelectedMaterial(null);
            productItem.product.material = null;
            return;
        }
        else {
            const materialId: number = event.target.value;
            setSelectedMaterial(materialId);
            productItem.product.material = materialId;
            return;
        }
    }

    return (
        <Grid container height={'100%'} width={'100%'} padding={2} alignItems={'center'} >
            <Grid item xs={12} paddingBottom={2}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label={languageStore.currentLanguage.name}
                    defaultValue={productItem?.product?.name ? productItem.product.name : ''}
                    onChange={(e) => { productItem.product.name = e.target.value; }}
                />
            </Grid>
            <Grid item xs={12} paddingBottom={2}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label={languageStore.currentLanguage.modelNumber}
                    defaultValue={productItem?.product?.modelNumber ? productItem.product.modelNumber : ''}
                    onChange={(e) => { productItem.product.modelNumber = e.target.value; }}
                />

            </Grid>
            <Grid item xs={12} paddingBottom={2}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label={languageStore.currentLanguage.manufacturer}
                    defaultValue={productItem?.product?.manufacturer ? productItem.product.manufacturer : ''}
                    onChange={(e) => { productItem.product.manufacturer = e.target.value; }}
                />
            </Grid>
            <Grid item xs={12} paddingBottom={2}>
                <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel>{languageStore.currentLanguage.material}</InputLabel>
                    <Select label={languageStore.currentLanguage.material} value={selectedMaterial ? selectedMaterial : ''} onChange={handleMaterialChange} aria-label={languageStore.currentLanguage.selectMaterial}>
                        {Object.keys(materialType).map((material) => (
                            <MenuItem key={material} value={parseInt(material)}>
                                {materialType[parseInt(material)]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} paddingBottom={2}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label={languageStore.currentLanguage.design}
                    defaultValue={productItem.product?.design ? productItem.product.design : ''}
                    onChange={(e) => { productItem.product.design = e.target.value; }}
                />
            </Grid>
            <Grid item xs={12} paddingBottom={2}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label={languageStore.currentLanguage.dimension}
                    defaultValue={productItem.product?.dimension ? productItem.product.dimension : ''}
                    onChange={(e) => { productItem.product.dimension = e.target.value; }}
                />

            </Grid>
            {/* <Grid item xs={12} paddingBottom={2}>
                <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel>{languageStore.currentLanguage.selectCategory}</InputLabel>
                    <Select label={languageStore.currentLanguage.selectCategory} value={selectedCategory ? selectedCategory.id : ''} onChange={handleCategoryChange} aria-label={languageStore.currentLanguage.selectCategory}>
                        {backofficeStore.Categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid> */}
            <Grid item xs={12} paddingBottom={2}>
                <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel>{languageStore.currentLanguage.selectSubcategory}</InputLabel>
                    <Select
                        label={languageStore.currentLanguage.selectSubcategory}
                        value={selectedSubcategory ? selectedSubcategory.id : ''}
                        onChange={handleSubcategoryChange}
                        aria-label={languageStore.currentLanguage.selectSubcategory}
                    >
                        {backofficeStore.subCategories.map((subcategory) => (
                            <MenuItem key={subcategory.id} value={subcategory.id}>
                                {subcategory.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
});
