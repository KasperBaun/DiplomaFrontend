import Category from "@models/Category";
import MobXContext from "@stores/MobXContext";
import { useContext, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import CategoryFormGroup from "../components/CategoryFormGroup";

interface IProps {
    category : Category
    onCloseUpdate : () => void;
}

const UpdateForm = ( {category, onCloseUpdate} : IProps) => {

    const { languageStore, categoryStore } = useContext(MobXContext);

    const [title, setTitle] = useState<string>(category.name);
    const [url, setUrl] = useState<string>(category.imageUrl ? category.imageUrl : "");
    const [order, setOrder] = useState<number>(category.order ? category.order : 0);
    const [description, setDescription] = useState<string>(category.description ? category.description : "");

    async function handleOnUpdateCategory() {
        const updateAction : Category = {
            id: category.id,
            name: title,
            imageUrl: url,
            order: order,
            description: description,
        };

        try {
            await categoryStore.updateCategory(updateAction);
            alert(languageStore.currentLanguage.createCategorySuccessMessage);
            onCloseUpdate();
        }
        catch (err) {
            console.log(err);
            alert(languageStore.currentLanguage.createCategoryFailedMessage);
        }

    }

    return (
        <Form>
            <Form.Group className="UpdateFormImageFormGroup">
                <Image className="UpdateFormImage" src={url ? url : category.imageUrl} alt="No image" />
            </Form.Group>

            <CategoryFormGroup type="TextForm_NoDesc"
            stateVal={title}
            stateFunc={setTitle} 
            index={0}
            formName={"Update_Cat_Title"}
            title={languageStore.currentLanguage.updateCategoryFormTitle} />

            <CategoryFormGroup type="TextForm_Desc" 
            stateVal={order}
            stateFuncNumber={setOrder}
            index={1}
            formName="Update_Cat_Order"
            descText={languageStore.currentLanguage.updateCategoryFormOrderDesc}
            title={languageStore.currentLanguage.updateCategoryFormOrder} />

            <CategoryFormGroup type="TextForm_NoDesc"
            stateVal={url}
            stateFunc={setUrl} 
            index={2}
            formName={"Update_Cat_ImgURL"}
            title={languageStore.currentLanguage.updateCategoryFormImgURL} />

            <CategoryFormGroup type="TextForm_Area_Desc" 
            stateVal={description} 
            stateFunc={setDescription} 
            index={3} 
            formName={"Update_Cat_Desc"} 
            descText={languageStore.currentLanguage.updateCategoryFormDescriptionDesc}
            title={languageStore.currentLanguage.updateCategoryFormDescription} />

            <Button variant="primary" style={{ marginTop: "0.5rem" }} onClick={handleOnUpdateCategory}>
                {languageStore.currentLanguage.updateCategorySubmit}
            </Button>
        </Form>
    )
}

export default UpdateForm;