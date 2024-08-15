import '../styles/vowelsList.css';
type VowelsListProps = { words: string[], nonsensicals: string[]};

/**
 *Renders a list of words provided by props.
 * @param {VowelsListProps} { words }
 */
const VowelsList = ({ words, nonsensicals }: VowelsListProps) => {
  return (
    <div>
        {words.length > 0 ? 
    <div className="WordList">
      {words.map((word, index) => (
        word !== '' ? 
        <li key={index} className="DoubleVowels">  
            <h4>{word}{nonsensicals.includes(word) ? " *" : <></>}</h4>
        </li>
        : <></>))}
      {nonsensicals.length > 1 ? <h5>*This word offends Bill's senses and will not be counted....sorry!</h5> : <></>}
      </div>
: <></>}
      </div>
  );
};
export default VowelsList;
      