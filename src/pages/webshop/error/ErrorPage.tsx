import { useRouteError } from "react-router-dom";
import { Constants } from "../../../utils/Constants";
import  "./ErrorPage.scss";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        Please buy stuff anyway.
        {/* <i>{error.statusText || error.message}</i> */}
      </p>
      <a href={Constants.companyUrl} >Go back</a>
    </div>
  );
}