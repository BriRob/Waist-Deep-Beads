import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAllWaistbeadsThunk,
  getOneWaistbeadThunk,
} from "../../store/waistbeads";
import "./Search.css";

function Search() {
  const dispatch = useDispatch();
  const history = useHistory();

  const waistbeads = useSelector(
    (state) => state.waistbeadsReducer?.waistbeads
  );
  console.log("waistbeads", waistbeads);

  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    (async () => {
      await dispatch(getAllWaistbeadsThunk());
      //   setIsLoading(false);
    })();

    // return () => dispatch(clearAllWbs());
  }, [dispatch]);

  const handleChange = (e) => {
    // setSearching(e.target.value)
    const searching = e.target.value;
    // console.log("searching", searching === "");
    setSearchInput(e.target.value);
    if (searching === "") {
      setResults([]);
    } else {
      const searchingWbArr = waistbeads.filter((wb) =>
        wb.name.toLowerCase().includes(searching.toLowerCase())
      );
      // console.log("searching waistbeads arr", searchingWbArr)
      setResults(searchingWbArr);
    }
  };

  const toWaistbead = async (res) => {
    await dispatch(getOneWaistbeadThunk(res.id));
    history.push(`/waistbeads/${res.id}`);
    setSearchInput("");
    setResults([]);
  };

  //   console.log('results', results);

  return (
    <div className="searchNav">
      {/* <form> */}
      <input
        type="text"
        placeholder="search"
        onChange={handleChange}
        value={searchInput}
        className="searchInput"
      ></input>
      {results.length != 0 && (
        <div className="dynRes">
          {results.map((res, idx) => (
            <div
              key={idx}
              onClick={() => toWaistbead(res)}
              className="eachDynRes"
            >
              {res.name}
            </div>
          ))}
        </div>
      )}
      {/* <div className="dynRes">
        {results.length != 0 &&
          // <div>Hello</div>
          results.map((res, idx) => (
            <div
              key={idx}
              onClick={() => toWaistbead(res)}
              className="eachDynRes"
            >
              {res.name}
            </div>
          ))}
      </div> */}
      {/* </form> */}
    </div>
  );
}

export default Search;
