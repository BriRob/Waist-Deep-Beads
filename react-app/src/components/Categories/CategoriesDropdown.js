import { useEffect, useState } from "react";
import { getAllCategories } from "../../store/categories";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

  const openMenu = () => {
      setShowCat(true)
  }
  const closeMenu = () => {
      setShowCat(false)
  }
  
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
      if (!showCat) return
      document.addEventListener("click", closeMenu);
      return () => document.removeEventListener("click", closeMenu);

  }, [showCat])

  return (
    <div>
      {categoriesArr && (
        <>
          <div onClick={openMenu}>Categories Here</div>
          {showCat && (categoriesArr.map((cat, idx) => (
            <Link key={idx} to={`/categories/${cat.id}`}>
                {cat.category_name}
            </Link>
          )))}
        </>
      )}
    </div>
  );
}

export default CategoriesDropdown;
