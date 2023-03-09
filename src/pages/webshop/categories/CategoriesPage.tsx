import Category from "@models/Category";
import { observer } from "mobx-react-lite"
import { useContext } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

import MobXContext from "../../../stores/MobXContext";
import './CategoriesPage.scss';

interface ICategoriesPageProps {
}


const CategoriesPage: React.FC<ICategoriesPageProps> = observer(function Categories(props: ICategoriesPageProps) {

    const { categoryStore } = useContext(MobXContext);
    const navigate = useNavigate();

    function handleClick(category: Category, name : String) {
        navigate('/subcategories/' + category.id , { state: { name } })
    }

    if (categoryStore.Categories) {
        return (
            <div className="container-cat">
                {categoryStore.Categories.map((category) => (
                    <div className="col-20-cat" key={category.id + "Component"}>
                        <Card className="category" border="primary" onClick={() => handleClick(category, category.name)}>
                            <Card.Body className="category">
                                <img  src={category.imageUrl} className='img-fluid shadow-4' style={{height: '13.5rem', width: 'auto'}} alt='...' />
                            </Card.Body>
                            <Card.Footer className="category"> {category.name.toString()}</Card.Footer>
                        </Card>
                    </div>
                ))}
            </div>
        )
    }
       else {
        return (
            <h1>Loading...</h1>
        )
    }

});

export default CategoriesPage;