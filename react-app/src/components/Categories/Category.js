import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllCategories, getOneCategory } from "../../store/categories";
import { useEffect } from "react";
function Category() {
  const { catId } = useParams();
  const dispatch = useDispatch();
  const category = useSelector(
    (state) => state.categoriesReducer?.categories[catId]
  );
  const category_wbs = useSelector(
    (state) => state.categoriesReducer?.category_wbs
  );

  let wbArr;
  if (category_wbs) {
    wbArr = Object.values(category_wbs);
  }
  console.log(category);
  console.log(wbArr);

  useEffect(() => {
      dispatch(getAllCategories())
    dispatch(getOneCategory(catId));
  }, [dispatch]);

  return (
    <>
      {category && category_wbs && (
        <div>
          <h1>Results for "{category.category_name}"</h1>
          <div className="splashPosts">
            {wbArr.map((bead, idx) => (
              <Link
                to={`/waistbeads/${bead.id}`}
                key={idx}
                className="eachPost"
              >
                <img src={bead.bead_img_url} alt="waistbeads"></img>
                <h3>{bead.name}</h3>
                {/* <div>Average Rating: {bead.rating}</div> */}
                {/* <div>${bead.price}</div> */}
                <div>
                  {bead.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Category;
