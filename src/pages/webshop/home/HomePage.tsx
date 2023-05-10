import { observer } from "mobx-react-lite"
import React from "react";
import './homepage.scss';
import { SelectedProductItems } from "./SelectedProductItems";
import { SelectedCategories } from "./SelectedCategories";
import { Container } from "@mui/material";

const HomePage: React.FC = observer(function HomePage() {

    return (
        <Container style={{ textAlign: "center" }}>
            <SelectedProductItems />
            <SelectedCategories />
        </Container>
    );
});

export default HomePage;



