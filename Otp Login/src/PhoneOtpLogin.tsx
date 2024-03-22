import { ChangeEvent, useState } from "react";
import OtpInput from "./OtpInput";

const PhoneOtpLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(true);

  const handlePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }
    setShowOtpInput(true);
  };

  const onOtpSubmit = (otp: string) => {
    console.log(otp);
  };
  return (
    <div>
      {!showOtpInput ? (
        <form onSubmit={handlePhoneSubmit}>
          <input
            value={phoneNumber}
            type="text"
            onChange={handlePhoneNumber}
            placeholder="Enter Phone Number"
          />
          <button type="submit" onClick={handlePhoneSubmit}>
            Submit
          </button>
        </form>
      ) : (
        <div>
          Otp Sent
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
};

export default PhoneOtpLogin;
