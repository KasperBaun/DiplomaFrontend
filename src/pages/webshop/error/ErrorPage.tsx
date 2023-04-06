import { Constants } from "@utils/Constants";
import "./ErrorPage.scss";

export default function ErrorPage() {

  return (
    <div id="error-page" >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        Please buy stuff anyway.
      </p>
      <a href={Constants.companyUrl} >Go back</a>
    </div>
  );
}