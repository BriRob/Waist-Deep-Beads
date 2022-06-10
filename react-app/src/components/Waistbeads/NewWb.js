import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { newWaistbeadThunk } from "../../store/waistbeads";

function NewWb() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);


  const [beadImgUrl, setBeadImgUrl] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [inStock, setInStock] = useState(true);

  const [errors, setErrors] = useState([]);

  if (!user) {
    return <Redirect to='/login' />
  }

  // useEffect(() => {
  //   dispatch(getOneWaistbead(beadId));
  // }, [dispatch]);

  // let categories;
  // if (waistbead) {
  //   categories = Object.values(waistbead?.categories);
  //   // console.log("category", Object.values(waistbead.categories))
  // }

  const updateImage = async (e) => {
    const file = e.target.files[0]
    setBeadImgUrl(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bead_img_url = beadImgUrl;
    const in_stock = inStock;
    const description = desc;
    const form = { bead_img_url, name, price, description, in_stock };

    const post = await dispatch(newWaistbeadThunk(user.id, form));

    // console.log(post);
    if (post.errors) {
      // console.log("there are errors");
      setErrors(post.errors);
    } else {
      history.push(`/waistbeads/${post.id}`);
    }
  };

  // console.log(errors)

  return (
    <>
      <p>Your New Creation</p>
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
    </>
  );
}

export default NewWb;
