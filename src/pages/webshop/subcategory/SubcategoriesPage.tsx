import { observer } from "mobx-react-lite"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useContext } from "react";
import MobXContext from "../../../stores/MobXContext";
import { Card, Container } from "react-bootstrap";
import SubCategory from "@models/SubCategory";

const SubCategoriesPage: React.FC = observer(function SubCategoriesPage(this: any) {
    const { subCategoryStore } = useContext(MobXContext);
    const { languageStore } = useContext(MobXContext);

    let { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { name } = location.state;
    const subCategories = (subCategoryStore.subCategoriesByCategoryID(Number(id)))

    function handleClick(subCategory: SubCategory, name: String) {
        navigate('/productList/' + subCategory.id, { state: { name } })
    }
    if (subCategories && subCategories.length > 0)
        return (
            <Container>
                <h1>{name}</h1>
                <div className="container-cat">
                    {subCategories.map((subCategory) => (
                        <div className="col-20-cat">
                            <Card className="category" border="primary" onClick={() => handleClick(subCategory, subCategory.name)}>
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
                    <h1>{name}</h1>
                    <h3>{languageStore.currentLanguage.noSubCategoriesToShow}</h3>
                </div>
            </Container>
        )
})

export default SubCategoriesPage;