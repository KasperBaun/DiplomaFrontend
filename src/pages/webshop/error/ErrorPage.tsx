import { Constants } from "@utils/Constants";

export default function ErrorPage() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '50px' }}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        Please buy stuff anyway.
      </p>
      <a href={Constants.companyUrl} >Go back</a>
    </div>
  );
}