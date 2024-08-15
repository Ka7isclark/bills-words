type FavouriteWordProps = { favouriteText: string };
/**
 * Displays the current favourite word text retrieved from the props. See parent(App.tsx)
 * @export
 * @param {FavouriteWordProps} { favouriteText }
 */
export default function FavouriteWord({ favouriteText }: FavouriteWordProps) {
  return <div className="favouriteText">{favouriteText === "" ? (
    <h1>No favourites yet, keep trying!</h1>
  ) : (
    <h1>Bill's new favourite word is <p><h1>{favouriteText}.</h1></p><p>What a wonderful word!</p></h1>
  )}</div>;
}
