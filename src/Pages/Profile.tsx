import LayoutSecond from "@/Layouts/LayoutSecond";
import { selectProfile } from "@/store/authSlices/authSlice";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector(selectProfile)
  console.log(user)
  return (
    <LayoutSecond>
      <div className="text-app">Profile</div>
    </LayoutSecond>
  );
}

export default Profile;