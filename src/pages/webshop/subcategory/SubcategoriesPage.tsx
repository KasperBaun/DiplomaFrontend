import { observer } from "mobx-react-lite"
import { useLocation, useParams } from 'react-router-dom';
import { useContext, useState } from "react";
import MobXContext from "../../../stores/MobXContext";
import { Card, Container } from "react-bootstrap";
import SubCategory from "@models/SubCategory";
import { useNavigate } from "react-router-dom"
import { runInAction } from "mobx";


const SubCategoriesPage: React.FC = observer(function SubCategoriesPage(this: any) {
    const { subCategoryStore, languageStore, productStore } = useContext(MobXContext);   
    
    let {id} = useParams();
    const location = useLocation(); 
    const {name} = location.state; 
    const subCategories = (subCategoryStore.subCategoriesByCategoryID(Number(id)))
    const navigate = useNavigate();

    function handleClick(subCategory: SubCategory) {
   
        productStore.ProductFilteredItems = productStore.ProductItems.filter(p => p.product.subcategories.some(s => s.id === subCategory.id));            
        navigate('/productList/'+ subCategory.id);
    }
    if (subCategories.length > 0)
        return (
            <Container>
                <h1>{name}</h1>
                <div className="container-cat">
                    {subCategories.map((subCategory) => (
                        <div className="col-20-cat">
                            <Card className="category" border="primary" onClick={() => handleClick(subCategory)}>
                                <Card.Body className="category">
                                    <img src={subCategory.imageUrl} className='img-fluid shadow-4' style={{height: '13.5rem', width: 'auto'}} alt='...' />
                                </Card.Body>
                                <Card.Footer className="category"> {subCategory.name.toString()}</Card.Footer>
                            </Card>
                        </div>
                    ))}
                </div>
            </Container>
        )
    else
        return(
            <Container>
                <div>
                    <h1>{name}</h1>
                    <h3>{languageStore.currentLanguage.noSubCategoriesToShow}</h3>
                </div>
            </Container>
        )
})

export default SubCategoriesPage;