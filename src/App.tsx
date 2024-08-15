import { useState } from "react";
import "./App.css";
import InputBox from "./components/inputBox";
import FavouriteWord from "./components/favouriteWord";
import VowelsList from "./components/vowelsList";
import './App.css';

/**
 *This app allows the user to enter words
 *that compile a list which can then be
 *checked for the word which has the
 *most double vowels and displays it as
 *the favourite. 
 */
function App() {
  const [wordList, setWordList] = useState([""]);
  const [userInput, setUserInput] = useState("");
  const [favouriteWord, setFavouriteWord] = useState("");
  const [nonSensicalWords, setNonSensicalWords] = useState([""]);
  const [showFavourite, setShowFavourite] = useState(false);
  const vowels: string[] = ["a", "e", "i", "o", "u"];

  /**Clear the list and Favourite text */
  const ClearList = () => {
    setWordList([]);
    setShowFavourite(false);
  };

  
  /**
   *Checks to make sure the string is not empty
   *then adds the word submission to the word list.
   * @param {string} submission
   */
  const CheckSubmission = (submission: string) => {
    if (submission !== "") {
      let newWords: string[] = wordList;
      newWords.push(submission.toLowerCase());
      setShowFavourite(false);
      setWordList(newWords);
      setUserInput("");
    }
  };


  /**
   *Update the user input state.
   *
   * @param {string} input
   */
  const UpdateUserInput = (input: string) => {
    setUserInput(input);
  };

  /**
   *Find and set the new favourite word
   *based on the number of double vowels and characters it has.
   */
  const FindFavouriteWord = () => {
    let topVowelPairs: number = 0;
    let competingWords: string[] = [""];
    let favouriteWord: string = "";

    wordList.forEach((word) => {
      let vowelPairs: number = ConsecutiveVowelPairs(word);
      if (vowelPairs > topVowelPairs) {
        topVowelPairs = vowelPairs;
        competingWords.push(word);
      }
    });

    if (competingWords.length === 0) {
      if (competingWords[0] === "") {
        competingWords[0] = "None of these make the cut!";
      }
    } else {
      //If more than one word has the same number of double vowels
      //the one with the most number of characters will be chosen.
      favouriteWord = competingWords.sort(function (a, b) {
        return b.length - a.length;
      })[0];
    }
    setFavouriteWord(favouriteWord);
    setShowFavourite(true);
  };

  /**
   *Find consecutive pairs of vowels
   *in the given word by checking if the previous letter is the same
   *and the letter is included in the vowels array.
   *Returns the number of double vowels.
   * @param {string} word
   * @return {number}
   */
  const ConsecutiveVowelPairs = (word: string) => {
    let result: number = 0;
    let nonsensicals: string[] = nonSensicalWords;

    for (let i: number = 0; i < word.length; i++) {
      if (word[i] === word[i - 1]) {
        if (word[i] === word[i + 1]) {
          //Triple consecutive identicle vowels, discard word.
          console.log("Triple Vowel!")
          nonsensicals.push(word);
          console.log(nonSensicalWords);
          result = 0;
          break;
        } else if (vowels.includes(word[i])) {
          result++;
        }
      }
    }

    setNonSensicalWords(nonsensicals);
    return result;
  };

  return (
    <div className="App">
      <InputBox GetInput={UpdateUserInput} GetSubmission={() => CheckSubmission(userInput)} textInput={userInput} />

      <VowelsList words={wordList} nonsensicals={nonSensicalWords} />

      {wordList.length > 0 ? (
          <div className="ControlButtons">
            <button className="ClearButton" onClick={ClearList}>Clear</button>
            <button className="FindButton" onClick={FindFavouriteWord}>
              Find my new favourite word
            </button>
        </div>
      ) : (
        <></>
      )}

      {showFavourite ? <FavouriteWord favouriteText={favouriteWord} /> : <></>}
    </div>
  );
}

export default App;
