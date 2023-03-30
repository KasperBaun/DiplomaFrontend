import { useParams } from 'react-router-dom';
import { useContext } from "react";
import MobXContext from "../../../stores/MobXContext";
import { Card, Container } from "react-bootstrap";
import SubCategory from "@models/SubCategory";
import { useNavigate } from "react-router-dom"
import Category from "@models/Category";


const SubCategoriesPage: React.FC = function SubCategoriesPage(this: any) {
    const { categoryStore, subCategoryStore, languageStore } = useContext(MobXContext);

    let { number } = useParams();
    const subCategories: SubCategory[] = [];
    let category: Category;
    if (number) {
        const categoryId = Number.parseInt(number);
        subCategories.push(...subCategoryStore.subCategoriesByCategoryID(Number(number)));
        category = categoryStore.getCategory(categoryId);
    } else {
        subCategories.push(...subCategoryStore.subCategories);
    }
    const navigate = useNavigate();
    const title: string = category ? category.name : '';

    function handleClick(subCategory: SubCategory) {
        navigate('/productlistspecific/' + subCategory.id);
    }
    if (subCategories.length > 0)
        return (
            <Container>
                <h1>{title}</h1>
                <div className="container-cat">
                    {subCategories.map((subCategory) => (
                        <div className="col-20-cat">
                            <Card className="category" border="primary" onClick={() => handleClick(subCategory)}>
                                <Card.Body className="category">
                                    <img src={subCategory.imageUrl} className='img-fluid shadow-4' style={{ height: '13.5rem', width: 'auto' }} alt='...' />
                                </Card.Body>
                                <Card.Footer className="category"> {subCategory.name.toString()}</Card.Footer>
                            </Card>
                        </div>
                    ))}
                </div>
            </Container>
        )
    else
        return (
            <Container>
                <div>
                    <h1>{title}</h1>
                    <h3>{languageStore.currentLanguage.noSubCategoriesToShow}</h3>
                </div>
            </Container>
        )
}

export default SubCategoriesPage;