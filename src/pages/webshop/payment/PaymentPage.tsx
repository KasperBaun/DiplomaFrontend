import { observer } from "mobx-react-lite"

interface IPaymentPageProps {

}

const PaymentPage: React.FC<IPaymentPageProps> = observer(function PaymentPage(props: IPaymentPageProps) {

    return (
        <h1>PaymentPage</h1>
    )

});

export default PaymentPage;