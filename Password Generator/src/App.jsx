import { useState } from "react";
import usePasswordGenerator from "./hooks/use-password-generator";
import PasswordStrengthIndicator from "./components/StrengthChecker";
import Button from "./components/Button";
import "./App.css";
import Checkbox from "./components/Checkbox";

function App() {
  const { password, errorMessage, generatePassword } = usePasswordGenerator();
  const [characterLength, setCharacterLength] = useState(4);
  const [copied, setCopied] = useState(false);

  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  const handleCharacterLengthChange = (value) => {
    setCharacterLength(value);
  };

  const handleCheckBox = (index) => {
    const updatedCheckboxState = [...checkboxData];
    updatedCheckboxState[index].state = !updatedCheckboxState[index].state;
    setCheckboxData(updatedCheckboxState);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="container">
      {errorMessage && <span className="errorMessage">{errorMessage}</span>}
      {password && (
        <div className="header">
          <div className="title">{password}</div>

          <Button
            customClass="copyBtn"
            title={copied ? "Copied" : "Copy"}
            onClick={handleCopy}
          />
        </div>
      )}

      {/* Character Length */}

      <div className="charlength">
        <span>
          <label>Character Length</label>
          <label>{characterLength}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={characterLength}
          onChange={(e) => handleCharacterLengthChange(e.target.value)}
        />
      </div>

      <div className="checkboxes">
        {checkboxData.map((item, index) => {
          return (
            <Checkbox
              key={index}
              title={item.title}
              onChange={() => handleCheckBox(index)}
            />
          );
        })}
      </div>

      <PasswordStrengthIndicator password={password} />

      <Button
        customClass="generateBtn"
        title={"Generate Password"}
        onClick={() => generatePassword(checkboxData, characterLength)}
      />
    </div>
  );
}

export default App;
