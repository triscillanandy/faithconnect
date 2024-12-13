import EmailSide from "./EmailSide";
import ValidationSide from "./ValidationSide";
const Validation = () => {
  return (
    <div className="flex gap-12 px-8 overflow-hidden max-validationBreakPoint:w-full">
      <ValidationSide />
      <EmailSide />
    </div>
  );
};

export default Validation;
