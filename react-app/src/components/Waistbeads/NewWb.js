import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { newWaistbeadThunk } from "../../store/waistbeads";
import "./NewWb.css";

function NewWb({ setShowModal }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const categories = useSelector(
    (state) => state.categoriesReducer?.categories
  );

  console.log(categories);
  let categoriesArr;
  if (categories) {
    categoriesArr = Object.values(categories);
    console.log(categoriesArr);
  }

  const [beadImgUrl, setBeadImgUrl] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [inStock, setInStock] = useState(true);

  const [selCates, setSelCates] = useState({});

  const [errors, setErrors] = useState([]);

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
    setBeadImgUrl(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selCates)

    for (let key in selCates) {
      if (!selCates[key]) {

        // console.log('key is =>', key)
        delete selCates[key]
        // console.log('new selcates', selCates)
      }

      // console.log('selcates[key]', selCates[key])
    }

    console.log(selCates)
    const newCateArr = Object.keys(selCates)
    console.log('\n\n sending to backend!!!', newCateArr)

    const bead_img_url = beadImgUrl;
    const in_stock = inStock;
    const description = desc;
    const form = { bead_img_url, name, price, description, in_stock };

    const post = await dispatch(newWaistbeadThunk(user.id, form, newCateArr));

    // console.log(post);
    if (post.errors) {
      // console.log("there are errors");
      setErrors(post.errors);
    } else {
      history.push(`/waistbeads/${post.id}`);
      setShowModal(false);
    }
  };

  const handleSelChange = (e) => {
    setSelCates({...selCates, [e.target.name]: e.target.checked})
  }
  console.log('selCates ====> ', selCates)
  // console.log(errors)

  return (
    <div className="bigNewWb">
      <h2>Your New Creation</h2>
      <form onSubmit={handleSubmit}>
        {errors.map((error, idx) => (
          <div id="errors" key={idx}>
            {error}
          </div>
        ))}
        <label>
          Upload Photo<span>*</span>
          <input
            type="file"
            name="bead_img_url"
            onChange={updateImage}
            // value={beadImgUrl}
            accept=".jpg, .jpeg, .png, .gif"
          ></input>
        </label>
        <label>
          Name of Creation<span>*</span>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            // placeholder="Name.."
          ></input>
        </label>
        <label>
          Price<span>*</span>
          <input
            type="number"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            min={1}
            value={price}
          ></input>
        </label>
        <label>
          <textarea
            name="description"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            placeholder="Optional description here..."
          ></textarea>
        </label>
        <div>Choose Categories</div>
        {categoriesArr?.map((cat, idx) => (
          <div key={idx}>
            <label>
              {cat.category_name}
              <input
                type="checkbox"
                name={cat.category_name}
                checked={selCates[cat.category_name] !== undefined && selCates[cat.category_name] !== false}
                onChange={handleSelChange}
              ></input>
            </label>
          </div>
        ))}
        <label>
          In Stock?
          <input
            type="checkbox"
            onChange={(e) => setInStock(!inStock)}
            checked={inStock}
          ></input>
        </label>
        <button>Post</button>
        <div>*Required</div>
      </form>
    </div>
  );
}

export default NewWb;
