import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  editWaistbeadThunk,
  getOneWaistbeadThunk,
} from "../../store/waistbeads";
import "./EditWb.css";

function EditWb({ hideEdit }) {
  const { beadId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  // const sessionUser = useSelector((state) => state.session.user);
  const waistbead = useSelector((state) => state.waistbeadsReducer?.waistbead);
  // categories from state
  const categories = useSelector(
    (state) => state.categoriesReducer?.categories
  );

  let categoriesArr;
  if (categories) {
    categoriesArr = Object.values(categories);
    // console.log('categoriesArr', categoriesArr);
  }

  const [beadImgUrl, setBeadImgUrl] = useState(waistbead?.bead_img_url);
  const [name, setName] = useState(waistbead?.name);
  const [price, setPrice] = useState(waistbead?.price);
  const [desc, setDesc] = useState(waistbead?.description);
  const [inStock, setInStock] = useState(waistbead?.in_stock);

  const [selCates, setSelCates] = useState({});

  // categories from page's WB

  const [showPreview, setShowPreview] = useState(false);
  const [previewURL, setPreviewUrl] = useState("");

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getOneWaistbeadThunk(beadId));
  }, [dispatch]);

  useEffect(() => {
    const cateObj = waistbead.categories;

    // console.log('wb categories obj', cateObj)
    const cateArr = Object.values(cateObj);
    // console.log('cateArr \n\n', cateArr)
    cateArr.forEach((ctg) => {
      selCates[ctg.category_name] = true;
      // console.log('CTG!!!!!', ctg.category_name)
    });
    // console.log("new selCates \n\n", selCates);
  }, []);

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

  const handleSelChange = (e, categName) => {
    // console.log("event", e);
    // console.log(categName);

    if (selCates[categName]) {
      // delete selCates[categName]
      const newSelCatesObj = { ...selCates };
      delete newSelCatesObj[categName];
      // console.log("newSelCatesObj", newSelCatesObj);
      setSelCates(newSelCatesObj);
      // e.target.checked = !e.target.checked
      // setSelCates({...selCates, [categName]: e.target.checked})
    } else {
      selCates[categName] = true;
      // setSelCates({...selCates, [categName]: true})
      setSelCates({ ...selCates, [categName]: e.target.checked });
    }
    // console.log('selCates after new if statement', selCates)

    // if (selCates[e.target.name]) {
    //   // e.target.checked = false
    //   selCates[e.target.name] = false;
    //   console.log(
    //     "selCates at target name is now false \n\n",
    //     selCates[e.target.name]
    //   );
    // } else {
    //   selCates[e.target.name] = true;
    //   console.log(
    //     "selCates at target name is now true \n\n",
    //     selCates[e.target.name]
    //   );
    // }

    // console.log("e target name", e.target.name);
    // console.log("checked", e.target.checked);

    // console.log(selCates[e.target.name] === selCates[categName]);
    // console.log(categName, 'categName')
    // console.log(e.target.name === categName, 'e.target.name === categName');
    // console.log(e.target.name === "Children");
    // selCates[e.target.name] = false
    // e.target.checked = false
    // setSelCates({...selCates, [e.target.name]: e.target.checked})
    // setSelCates({...selCates, [e.target.name]: e.target.checked})
    // console.log("selCates ====> ", selCates);
  };

  // console.log("selCates ====> ", selCates);

  const handleCancel = (e) => {
    e.preventDefault();
    hideEdit();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("in handle submit!!! \n\n", selCates);
    const newCateArr = Object.keys(selCates);

    const bead_img_url = beadImgUrl;
    const in_stock = inStock;
    const description = desc;
    const form = { bead_img_url, name, price, description, in_stock };

    const post = await dispatch(editWaistbeadThunk(beadId, form, newCateArr));

    // console.log(post);
    if (post.errors) {
      // console.log("there are errors");
      setErrors(post.errors);
    } else {
      // history.push(`/waistbeads/${post.id}`);
      hideEdit();
    }
  };

  return (
    <div className="editWbBig">
      <h3>Edit Your Creation</h3>
      <form onSubmit={handleSubmit}>

        <div className="photoUploadEdit">
          <label className="uploadPhotoBtn" id="upldPhoBtn">
            Upload New Photo
            <input
              type="file"
              name="bead_img_url"
              onChange={updateImage}
              // value={beadImgUrl}
              accept=".jpg, .jpeg, .png, .gif"
            ></input>
          </label>
          {showPreview && (
            <img src={previewURL} className="imgPrvwEdit" alt="preview"></img>
          )}
        </div>
        {errors.map((error, idx) => (
          <div id="errors" key={idx}>
            {error}
          </div>
        ))}
        <div className="namePriceEdit">
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
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            min={1}
            max={10000}
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
        </label>
        <div className="bigCateg">
          <div className="innerCateg">
            <div className="catTitle">Choose Categories</div>
            <div className="categs">
              {categoriesArr?.map((cat, idx) => (
                <div key={idx}>
                  <label>
                    {cat.category_name}
                    <input
                      type="checkbox"
                      name={cat.category_name}
                      checked={selCates[cat.category_name] !== undefined}
                      // checked={selCates[cat.category_name] !== undefined && selCates[cat.category_name] !== false}
                      onChange={(e) => handleSelChange(e, cat.category_name)}
                    ></input>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <div> */}
        <label className="inStock">
          In Stock?
          <input
            type="checkbox"
            onChange={(e) => setInStock(!inStock)}
            checked={inStock}
          ></input>
        </label>
        {/* </div> */}
        <div className="postCancelbtns">
        <button className="postBtnEdit">Post</button>
          <button className="cancelbtn" onClick={handleCancel}>Cancel</button>
        </div>
        <div>*Required</div>
      </form>
    </div>
  );
}

export default EditWb;
