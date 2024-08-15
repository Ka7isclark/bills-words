import { useEffect, useState } from "react";
import '../styles/inputBox.css';

interface IBoxProps {
  GetInput: (inputData: string) => void;
  textInput: string;
}

/**
 *
 *Records the users input text and sends it to the parent component.
 * @param {IBoxProps} { GetInput, textInput }
 */
const InputBox = ({ GetInput, textInput }: IBoxProps) => {
  const [userInput, setUserInput] = useState("");

  /**
   *Handles the input and prevents non letters from being entered.
   * @param {string} inputValue
   */
  const handleInputChange = (inputValue: string) => {
    const result: string = inputValue.replace(/[^a-z]/gi, "");
    setUserInput(result);
    GetInput(result);
  };

  
  /**Clear input text on render */
  useEffect(() => {
    if (textInput === "") {
      setUserInput("");
    }
  }, [textInput]);

  return (
    <div className="InputField">
    <h1>Bill's Beautiful Double-Vowel Finder</h1>
      <input className="WordInput"
        value={userInput}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
};

export default InputBox;
