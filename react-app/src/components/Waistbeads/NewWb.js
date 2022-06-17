import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { getAllReviewsThunk } from "../../store/reviews";
import { newWaistbeadThunk } from "../../store/waistbeads";
import Loading from "../Loading/Loading";
import "./NewWb.css";

function NewWb({ setShowModal }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const categories = useSelector(
    (state) => state.categoriesReducer?.categories
  );

  // console.log(categories);
  let categoriesArr;
  if (categories) {
    categoriesArr = Object.values(categories);
    // console.log(categoriesArr);
  }

  const [beadImgUrl, setBeadImgUrl] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [inStock, setInStock] = useState(true);

  const [selCates, setSelCates] = useState({});

  const [showPreview, setShowPreview] = useState(false);
  const [previewURL, setPreviewUrl] = useState("");

  const [errors, setErrors] = useState([]);

  const [isLoading, setIsLoading] = useState(false)

  // if (!user) {
  //   return <Redirect to='/login' />
  // }

  // useEffect(() => {
  //   dispatch(getOneWaistbead(beadId));
  // }, [dispatch]);

  // let categories;
  // if (waistbead) {
  //   categories = Object.values(waistbead?.categories);
  //   // console.log("category", Object.values(waistbead.categories))
  // }

  const updateImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      setPreviewUrl(reader.result);
    };

    setBeadImgUrl(file);
    setShowPreview(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(selCates);
    setIsLoading(true)

    for (let key in selCates) {
      if (!selCates[key]) {
        // console.log('key is =>', key)
        delete selCates[key];
        // console.log('new selcates', selCates)
      }

      // console.log('selcates[key]', selCates[key])
    }

    // console.log(selCates)
    const newCateArr = Object.keys(selCates);
    // console.log('\n\n sending to backend!!!', newCateArr)

    const bead_img_url = beadImgUrl;
    const in_stock = inStock;
    const description = desc;
    const form = { bead_img_url, name, price, description, in_stock };

    const post = await dispatch(newWaistbeadThunk(user.id, form, newCateArr));

    // console.log(post);
    if (post.errors) {
      // console.log("there are errors");
      // setErrors(post.errors);
      await setErrors(post.errors);
      await setIsLoading(false)
    } else {
      // history.push(`/waistbeads/${post.id}`);
      // await dispatch(getAllReviewsThunk(post.id));
      // setShowModal(false);
      await dispatch(getAllReviewsThunk(post.id));
      await setIsLoading(false)
      await setShowModal(false);
      history.push(`/waistbeads/${post.id}`);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    // hideRev()
    // close modal
    setShowModal(false);
  };

  const handleSelChange = (e) => {
    setSelCates({ ...selCates, [e.target.name]: e.target.checked });
  };
  // console.log('selCates ====> ', selCates)
  // console.log(errors)


  if (isLoading) {
    return (
      <Loading />
    )
  } else {

    return (
      <div className="bigNewWb">
        <h2>Your New Creation</h2>
        {/* {isLoading} */}
        <form onSubmit={handleSubmit}>
          <label className="uploadPhotoBtn">
            Upload One Photo<span>*</span>
            <input
              type="file"
              name="bead_img_url"
              onChange={updateImage}
              // value={beadImgUrl}
              accept=".jpg, .jpeg, .png, .gif"
            ></input>
          </label>
          {showPreview && (
            <img src={previewURL} className="imgPrvw" alt="preview"></img>
          )}
          {errors.map((error, idx) => (
            <div id="errors" key={idx}>
              {error}
            </div>
          ))}
          <div className="namePrice">
            <label>
              Name of Creation<span>*</span>
            </label>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              // placeholder="Name.."
            ></input>
            <label>
              Price<span>*</span>
            </label>
            <input
              type="number"
              step={0.01}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              min={1}
              max={10000}
              value={price}
            ></input>
          </div>
          <label className="newWbTxtALabel">
            <textarea
              className="newWbTxtA"
              name="description"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              placeholder="Optional description here..."
            ></textarea>
            <div className="less5000">(less than 5000 characters)</div>
          </label>
          <div className="bigCateg">
            <div className="innerCateg">
              <div className="catTitle">Choose Categories</div>
              <div className="categs">
                {categoriesArr?.map((cat, idx) => (
                  <div key={idx}>
                    <label>
                      <input
                        type="checkbox"
                        name={cat.category_name}
                        checked={
                          selCates[cat.category_name] !== undefined &&
                          selCates[cat.category_name] !== false
                        }
                        onChange={handleSelChange}
                      ></input>
                      {cat.category_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <label className="inStock">
            In Stock?
            <input
              type="checkbox"
              onChange={(e) => setInStock(!inStock)}
              checked={inStock}
            ></input>
          </label>
          <div className="postCancelbtns">
            <button className="postbtn">Post</button>
            <button className="cancelbtn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
          <div>*Required</div>
        </form>
      </div>
    );
  }

}

export default NewWb;
