import Category from "@models/Category";
import Subcategory from "@models/SubCategory";
import MobXContext from "@stores/MobXContext";
import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const CreateSubcategoryForm: React.FC = function CreateSubcategoryForm() {

    const { subCategoryStore, categoryStore, languageStore } = useContext(MobXContext);

    const [title, setTitle] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [order, setOrder] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<Category>(null);

    async function createSubcategory() {
        const subCategory: Subcategory = ({ id: 0, name: title, imageUrl: url, order, description, category: selectedCategory })
        console.log("subCat", subCategory);

        try {
            await subCategoryStore.createSubcategory(subCategory)
            alert(languageStore.currentLanguage.createSubcategorySuccessMessage);
        }
        catch (err) {
            console.log(err);
            alert(languageStore.currentLanguage.createSubcategoryFailedMessage);
        }
    }

    const handleOptionChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        if (event.currentTarget.value === "initValue") {
            alert(languageStore.currentLanguage.createSubcategorySelectCategoryFailedMessage);
            return;
        } else {
            const categoryId: number = parseInt(event.currentTarget.value);
            setSelectedCategory(categoryStore.getCategory(categoryId));
        }
    };

    useEffect(() => {
        console.log("selectedCategory", selectedCategory);
    }, [selectedCategory]);


    return (
        <Form>
            <Form.Group>
                <Form.Label>{languageStore.currentLanguage.createSubcategoryCategoryTitle}</Form.Label>
                <Form.Select aria-label="Select category" onChange={handleOptionChange}>
                    <option key="initKey" value="initValue" >{languageStore.currentLanguage.createSubcategorySelectCategoryTitle}</option>
                    {categoryStore.Categories.map((category, index) => {
                        return (
                            <option key={"option" + category.name + index} value={category.id}>{category.name}</option>
                        )
                    })}

                </Form.Select>

            </Form.Group>
            <Form.Group>
                <Form.Label>{languageStore.currentLanguage.createSubcategoryTitle}</Form.Label>
                <Form.Control type="text" onChange={(event) => {
                    let temp = event.target.value;
                    setTitle(temp);
                }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>{languageStore.currentLanguage.createSubcategoryOrder}</Form.Label>
                <Form.Control type="text" onChange={(event) => {
                    let temp = event.target.value;
                    setOrder(parseInt(temp));
                }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>{languageStore.currentLanguage.createSubcategoryImgUrl}</Form.Label>
                <Form.Control type="text" onChange={(event) => {
                    let temp = event.target.value;
                    setUrl(temp);
                }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>{languageStore.currentLanguage.createSubcategoryDescription}</Form.Label>
                <Form.Control type="textarea" onChange={(event) => {
                    let temp = event.target.value;
                    setDescription(temp);
                }} />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: "0.5rem" }} onClick={createSubcategory}>
                {languageStore.currentLanguage.createSubcategorySubmit}
            </Button>
        </Form>
    )
}



export default CreateSubcategoryForm;