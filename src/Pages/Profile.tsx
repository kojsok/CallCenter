import { selectProfile } from "@/store/authSlices/authSlice";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector(selectProfile)
  console.log(user)
  return (
    <div className="text-app">Profile</div>
  );
}

export default Profile;