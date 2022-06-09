import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  editWaistbeadThunk,
  getOneWaistbeadThunk,
} from "../../store/waistbeads";

function EditWb({hideEdit}) {
  const { beadId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  // const sessionUser = useSelector((state) => state.session.user);
  const waistbead = useSelector((state) => state.waistbeadsReducer?.waistbead);

  const [beadImgUrl, setBeadImgUrl] = useState(waistbead?.bead_img_url);
  const [name, setName] = useState(waistbead?.name);
  const [price, setPrice] = useState(waistbead?.price);
  const [desc, setDesc] = useState(waistbead?.description);
  const [inStock, setInStock] = useState(waistbead?.in_stock);

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getOneWaistbeadThunk(beadId));
  }, [dispatch]);

  const updateImage = async (e) => {
    const file = e.target.files[0]
    setBeadImgUrl(file)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    hideEdit()
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const bead_img_url = beadImgUrl;
    const in_stock = inStock;
    const description = desc;
    const form = { bead_img_url, name, price, description, in_stock };

    const post = await dispatch(editWaistbeadThunk(beadId, form));

    // console.log(post);
    if (post.errors) {
      // console.log("there are errors");
      setErrors(post.errors);
    } else {
      // history.push(`/waistbeads/${post.id}`);
      hideEdit()
    }
  };

  return (
    <>
      <div>Editing!!!!!</div>
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
        <label>
          In Stock?
          <input
            type="checkbox"
            onChange={(e) => setInStock(!inStock)}
            checked={inStock}
          ></input>
        </label>
        <button>Post</button>
        <button onClick={handleCancel}>Cancel</button>
        <div>*Required</div>
      </form>
    </>
  );
}

export default EditWb;
