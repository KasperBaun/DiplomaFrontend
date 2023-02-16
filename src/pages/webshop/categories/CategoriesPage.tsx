import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Category from "../../../models/Category";
import category from "../../../models/Category";
import { categories } from "../../../services/MockupData";
import MobXContext from "../../../stores/MobXContext";

interface ICategoriesPageProps {
}


const CategoriesPage: React.FC<ICategoriesPageProps> = observer(function Categories(props: ICategoriesPageProps) {

    const { categoryStore } = useContext(MobXContext);
    const [Categories, setCategories] = useState<Category[]>(null);

    useEffect(() => {
        const getCategoryModel = async () => {
            try {
                setCategories(await categoryStore.getCategories())
            }
            catch (err) {
                console.log(err);
            }
        }
        getCategoryModel();
    }, [categoryStore])

    if (categories) {
        return (
        
                <div>
                    {categories.map((index) => (
                        <div>
                            <Card border="primary" style={{ width: '18rem' }}>
                                <Card.Body>
                                <img src={index.picture} className='img-fluid shadow-4' alt='...' />
                                </Card.Body>
                                <Card.Footer> {index.title.toString()}</Card.Footer>
                            </Card>
                        </div>
                    ))}
                </div>
        );
    }
    else {
        return (
            <h1>Loading...</h1>
        )
    }

});

export default CategoriesPage;