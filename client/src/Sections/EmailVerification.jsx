/* eslint-disable react/no-children-prop */
import EmailSide from "./Component/EmailSide";
import Validation from "./Component/Validation";

const EmailVerification = () => {
  return (
    <div>
      <Validation children={<EmailSide></EmailSide>}></Validation>
    </div>
  );
};
export default EmailVerification;
