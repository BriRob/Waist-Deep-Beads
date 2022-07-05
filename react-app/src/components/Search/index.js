import { useState } from "react";
import { useSelector } from "react-redux";

function Search() {
  const waistbeads = useSelector(
    (state) => state.waistbeadsReducer?.waistbeads
  );
  console.log(waistbeads)

  const [results, setResults] = useState([])

  return (
    <div>
      <form>
        <input type="text" placeholder="search"></input>
      </form>
    </div>
  );
}

export default Search;
