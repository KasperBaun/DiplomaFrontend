import { observer } from "mobx-react-lite"

interface IConfirmationPageProps {

}

const ConfirmationPage: React.FC<IConfirmationPageProps> = observer(function ConfirmationPage(props: IConfirmationPageProps) {

    return (
        <h1>ConfirmationPage</h1>
    )

});

export default ConfirmationPage;