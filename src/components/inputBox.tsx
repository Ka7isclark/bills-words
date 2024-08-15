import { FormEvent, useEffect, useState } from "react";
import '../styles/inputBox.css';

interface IBoxProps {
  GetInput: (inputData: string) => void;
  GetSubmission: (inputData: string) => void;
  textInput: string;
}

/**
 *
 *Records the users input text and sends it to the parent component.
 * @param {IBoxProps} { GetInput, textInput }
 */
const InputBox = ({ GetInput, GetSubmission, textInput }: IBoxProps) => {
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

  const SubmitForm = (e: FormEvent) => {
    e.preventDefault();
    GetSubmission(userInput);
  }
  

  
  /**Clear input text on render */
  useEffect(() => {
    if (textInput === "") {
      setUserInput("");
    }
  }, [textInput]);

  return (
    <div className="InputField">
    <h1>Bill's Beautiful Double-Vowel Finder</h1>
    <form onSubmit={(e) => SubmitForm(e)}>
      <input className="WordInput"
        key="searchBox"
        type="text"
        placeholder=" Vowels Search..."      
        value={userInput}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      </form>
    </div>
  );
};

export default InputBox;
