import { observer } from "mobx-react-lite"

interface IBasketPageProps {

}

const BasketPage: React.FC<IBasketPageProps> = observer(function BasketPage(props: IBasketPageProps) {

    return (
        <h1>BasketPage</h1>
    )

});

export default BasketPage;