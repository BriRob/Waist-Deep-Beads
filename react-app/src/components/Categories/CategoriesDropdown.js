import { useEffect, useState } from "react";
import { getAllCategories, getOneCategory } from "../../store/categories";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import './CategoriesDropdown.css'

function CategoriesDropdown() {
  const dispatch = useDispatch();
  const history = useHistory();
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
    setShowCat(true);
  };
  const closeMenu = () => {
    setShowCat(false);
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!showCat) return;
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showCat]);

  const dispatchingAgain = async (e, catId) => {
    e.stopPropagation();
    await dispatch(getOneCategory(catId));
    closeMenu();
    history.push(`/categories/${catId}`);
  };

  return (
    <div className="outerDropdown">
        <>
          <div className="catDropdown" onClick={openMenu}>Categories</div>
      {categoriesArr && showCat && (
          <div className="catDropdownMenu">
            {showCat &&
              categoriesArr.map((cat, idx) => (
                <div key={idx} onClick={(e) => dispatchingAgain(e, cat.id)}>
                  {cat.category_name}
                </div>
              ))}
          </div>
      )}
      </>
    </div>
  );
}

export default CategoriesDropdown;
