import React, { useContext, useState } from "react";
import { Button, Grid } from "@mui/material";
import Category from "@models/Category";
import MobXContext from "@stores/MobXContext";
import Loading from "@components/loading/Loading";
import CreateCategoryDialog from "./components/CreateCategoryDialog";
import { observer } from "mobx-react-lite";
import BackofficeHeader from "@backoffice/Dashboard/components/BackofficeHeader";
import CategoryCard from "./components/CategoryCard";
import UpdateCategoryModal from "./components/UpdateCategoryModal";
import ConfirmDeleteCategoryDialog from "./components/ConfirmDeleteCategoryDialog";


const Categories: React.FC = observer(function Categories() {

    /* Define state for categories and selected category - Dependency inject stores */
    const { categoryStore, languageStore } = useContext(MobXContext)
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    /* Define state for modals */
    const [showCreateCategory, setShowCreateCategory] = useState<boolean>(false);
    const [showUpdateCategory, setShowUpdateCategory] = useState<boolean>(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

    /* Define the event handlers for the buttons */
    const handleUpdateClick = (category: Category) => {
        setSelectedCategory(category);
        setShowUpdateCategory(true);
    };

    const handleOnConfirmDeleteClick = async () => {
        // Pop Modal to confirm?
        const catToBeDeleted = categoryStore.getCategory(selectedCategory.id);
        if (catToBeDeleted !== null) {
            await categoryStore.deleteCategory(selectedCategory.id);
            // Alt er godt
            alert("Successfully deleted category: " + catToBeDeleted.name)
            // Reload items
        } else {
            alert("Could not find category with id: " + selectedCategory.id);
        }
    }
    const handleOnDeleteClick = async (category: Category) => {
        setSelectedCategory(category);
        setShowConfirmDelete(true);


    }

    if (categoryStore.Categories && categoryStore.Categories.length > 0) {

        return (
            // <Grid container style={categoryContainer} spacing={1} >
            <Grid container >
                {/* Modals for creating/updating */}
                <CreateCategoryDialog visible={showCreateCategory} onClose={() => setShowCreateCategory(false)} />
                <UpdateCategoryModal visible={showUpdateCategory} onClose={() => setShowUpdateCategory(false)} category={selectedCategory} />
                <ConfirmDeleteCategoryDialog visible={showConfirmDelete} category={selectedCategory} onConfirmDeleteClicked={handleOnConfirmDeleteClick} onCancelClicked={() => setShowConfirmDelete(false)} />

                {/* Headline and create button */}
                <Grid item xs={12} display={'flex'} justifyContent={'space-between'} margin='10px'>
                    <BackofficeHeader title={languageStore.currentLanguage.CategoriesTabText} subtitle="" />
                    <Button style={{ width: "12rem" }} variant="contained" onClick={() => setShowCreateCategory(true)}>{languageStore.currentLanguage.createCategoryModalTitle}</Button>
                </Grid>

                {/* Categorycards */}
                {
                    categoryStore.Categories.map((cat, index) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={2} xl={2} padding={1} display='flex' key={"BackofficeCategoryCardItem" + index}>
                                <CategoryCard category={cat} updateCategory={handleUpdateClick} deleteCategory={handleOnDeleteClick} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
    }
    else return <Loading />
});

export default Categories;










// import { Container, Table, Button, Row } from "react-bootstrap";
// import CreateCategory from './modal/Create'
// import { useState } from 'react';
// import { observer } from "mobx-react-lite";
// import MobXContext from "@stores/MobXContext";
// import { useContext } from "react"
// import "./css/category.scss";
// import { Pencil } from "react-bootstrap-icons";
// import UpdateCategory from "./modal/UpdateModal";
// import Category from "@models/Category";
// import Loading from "@components/loading/Loading";
// import { Clear } from "@mui/icons-material";

// const Categories: React.FC = function Categories() {
//     const [visibleCreate, setVisibilityCreate] = useState(false);
//     const [visibleUpdate, setVisibilityUpdate] = useState(false);
//     const onOpenCreate = () => setVisibilityCreate(true);
//     const onCloseCreate = () => setVisibilityCreate(false);
//     const onOpenUpdate = () => setVisibilityUpdate(true);
//     const onCloseUpdate = () => setVisibilityUpdate(false);

//     const { categoryStore, languageStore } = useContext(MobXContext)
//     const [selectedCategory, setSelectedCategory] = useState<Category>();

//     const handleOnDeleteCategory = async (id: number) => {
//         // Pop Modal to confirm?
//         const catToBeDeleted = categoryStore.getCategory(id);
//         if (catToBeDeleted !== null) {
//             await categoryStore.deleteCategory(id);
//             // Alt er godt
//             alert("Successfully deleted category: " + catToBeDeleted.name)
//         } else {
//             alert("Could not find category with id: " + id);
//         }
//     }

//     const handleOnUpdateCategory = (cat: Category) => {
//         setSelectedCategory(cat);
//         onOpenUpdate();
//     }

//     if (categoryStore.Categories)
//         return (
//             <Container className="CategoryListContainer">
//                 <Row style={{ width: "100%", justifyContent: "end" }}>
//                     <Button style={{ width: "12rem" }} variant='outline-primary' onClick={onOpenCreate}>{languageStore.currentLanguage.createCategoryModalTitle}</Button>
//                 </Row>
//                 <Row style={{ width: "100%", marginTop: "1rem" }}>
//                     <Table striped bordered hover>
//                         <thead>
//                             <tr>
//                                 <th className="CenterAligned_th">{languageStore.currentLanguage.createCategoryTitle}</th>
//                                 <th className="CenterAligned_th">{languageStore.currentLanguage.createCategoryDescription}</th>
//                                 <th className="CenterAligned_th">{languageStore.currentLanguage.createCategoryOrder}</th>
//                                 <th></th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {categoryStore.Categories.map((category) => (
//                                 <tr id={"listId_" + category.id} key={"item_" + category.id}>
//                                     <td style={{ width: "12rem" }}>{category.name}</td>
//                                     <td>{category.description ? category.description : null}</td>
//                                     <td style={{ width: "8rem" }}>{category.order ? category.order : null}</td>
//                                     <td style={{ width: "10rem" }}>
//                                         <Container>
//                                             <Button variant="outline-secondary" onClick={() => handleOnUpdateCategory(category)}><Pencil /></Button>
//                                             <Button variant="outlined" color="error" onClick={() => handleOnUpdateCategory(category)}><Clear /></Button>
//                                         </Container>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                 </Row>
//                 <CreateCategory visible={visibleCreate} onClose={onCloseCreate} />
//                 <UpdateCategory visible={visibleUpdate} onClose={onCloseUpdate} category={selectedCategory} />
//             </Container>
//         )
//     else
//         return (
//             <Loading />
//         )

// }

// export default observer(Categories);

