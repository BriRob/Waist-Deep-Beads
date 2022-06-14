import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { getAllCategories, getOneCategory } from "../../store/categories";
import { useEffect, useState } from "react";
import './Category.css'

function Category() {
    const {pathname} = useLocation()
  const { catId } = useParams();
  const dispatch = useDispatch();
  const category = useSelector(
    (state) => state.categoriesReducer?.category_wbs?.category
  );
  const category_wbs = useSelector(
    (state) => state.categoriesReducer?.category_wbs?.wbs_dict
  );

  let wbArr;
  if (category_wbs) {
    wbArr = Object.values(category_wbs);
  }

//   const [isLoaded, setIsLoaded] = useState(false)

  console.log('category \n\n', category);
  console.log('wbArr \n\n', wbArr);

  useEffect(() => {
    //   (async () => {
        dispatch(getAllCategories())
        dispatch(getOneCategory(catId));

    // })()
    // if (pathname !== `/categories/${catId}`) {

    //     window.location.reload()
    // }

    // return () => setIsLoaded(true)

}, [dispatch]);

// if (!isLoaded) {

    //   return (
    //       <h1>Loading...</h1>
    //   )
//   }
  return (
    //   null
    <>
      {category && category_wbs && (
        <div>
          <h1 className="catNameTitle">Waistbeads for "{category.category_name}"</h1>
          <div className="splashPosts catPosts">
            {wbArr?.map((bead, idx) => (
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
