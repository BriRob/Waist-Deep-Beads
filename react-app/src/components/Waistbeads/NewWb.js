import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function NewWb() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [beadImgUrl, setBeadImgUrl] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [inStock, setInStock] = useState(true);

  const [errors, setErrors] = useState([]);

  // useEffect(() => {
  //   dispatch(getOneWaistbead(beadId));
  // }, [dispatch]);

  // let categories;
  // if (waistbead) {
  //   categories = Object.values(waistbead?.categories);
  //   // console.log("category", Object.values(waistbead.categories))
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <p>Your New Creation</p>
      <form onSubmit={handleSubmit}>
        <label>
          Upload Photo
          <input
            type="text"
            name="bead_img_url"
            onChange={(e) => setBeadImgUrl(e.target.value)}
            value={beadImgUrl}
            accept=".jpg, .jpeg, .png, .gif"
          ></input>
        </label>
        <label>
          Name of Creation
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            // placeholder="Name.."
          ></input>
        </label>
        <label>
          Price
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
            placeholder="Description here..."
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
      </form>
    </>
  );
}

export default NewWb;
