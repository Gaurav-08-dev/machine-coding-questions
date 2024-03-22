import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({
  length,
  onOtpSubmit,
}: {
  length: number;
  onOtpSubmit: (val: string) => void;
}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // trigger submit

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    // move to next input

    if (value && index < length - 1 && inputRefs.current[index + 1])
      inputRefs.current[index + 1].focus();
  };

  const handleClick = (index: number) => {
    inputRefs.current[index].setSelectionRange(1, 1);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  return (
    <div className="otpInput_wrapper">
      {otp.map((val, index) => {
        return (
          <input
            ref={(input) => (inputRefs.current[index] = input!)}
            onChange={(e) => handleChange(e, index)}
            key={index}
            type="text"
            value={val}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="otpInput"
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
