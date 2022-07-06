import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllWaistbeadsThunk } from "../../store/waistbeads";

function Search() {
  const dispatch = useDispatch();

  const waistbeads = useSelector(
    (state) => state.waistbeadsReducer?.waistbeads
  );
  console.log("waistbeads", waistbeads)

//   const [searching, setSearching] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    (async () => {
      await dispatch(getAllWaistbeadsThunk());
    //   setIsLoading(false);
    })();

    // return () => dispatch(clearAllWbs());
  }, [dispatch]);

  const handleChange = (e) => {
    // setSearching(e.target.value)
    const searching = e.target.value
    const searchingWbArr = waistbeads.filter(wb => (
        wb.name.toLowerCase().includes(searching.toLowerCase())
    ))
    // console.log("searching waistbeads arr", searchingWbArr)
  }

  return (
    <div>
      <form>
        <input type="text" placeholder="search" onChange={handleChange}></input>
        <div className="dynRes">
            {results.length != 0 && (
                <div>Hello</div>
            )}
        </div>
      </form>
    </div>
  );
}

export default Search;
