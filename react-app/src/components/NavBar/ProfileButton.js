import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

function ProfileButton({ user }) {
  const [menu, setMenu] = useState(false);

  const openMenu = () => {
    if (menu) return;
    setMenu(true);
  };
  const closeMenu = () => {
    // if (menu) return;
    setMenu(false);
  };

  useEffect(() => {
    if (!menu) return;
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [menu]);

  return (
    <div className="profbtn">
      <div className="profbtn-usname"onClick={() => setMenu(true)}>{user.username}</div>
      {menu && (
        <div className="prof-drpdwn">
          <Link to={`/users/${user.id}`}>My Profile</Link>
          <LogoutButton />
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
