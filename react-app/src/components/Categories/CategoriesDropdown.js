import { useEffect, useState } from "react";
import { getAllCategories } from "../../store/categories";
import { useDispatch, useSelector } from "react-redux";

function CategoriesDropdown() {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.categoriesReducer?.categories
  );

  const [showCat, setShowCat] = useState(false);

  console.log("\n\n categories obj here", categories);
  let categoriesArr;
  if (categories) {
    categoriesArr = Object.values(categories);
  }
  console.log("categoriesArr", categoriesArr);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  //   const catMenu = (<div>Hello</div>)
  return (
    <div>
      {categoriesArr && (
        <>
          <div onClick={() => setShowCat(!showCat)}>Categories Here</div>
          {showCat && (categoriesArr.map((cat, idx) => (
            <div key={idx}>
                {cat.category_name}
            </div>
          )))}
        </>
      )}
    </div>
  );
}

export default CategoriesDropdown;
