import { observer } from "mobx-react-lite"

interface IHomePageProps{

}

const HomePage: React.FC<IHomePageProps> = observer(function HomePage(props: IHomePageProps){

    return(
        <div style={{height: '600px'}}>
            <h1>This is the landing page / homepage</h1>
        </div>
    )

} );

export default HomePage;