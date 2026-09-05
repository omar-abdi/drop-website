
import { useUserStore } from "../userStore/user";
function Profile() {
  const { user } = useUserStore();


  return (
    <div>

        <h1>Profile</h1>
        <p>Username: {user?.email}</p>
        <p>Phone Number: {user?.phoneNumber}</p>
        <p>Gender: {user?.gender}</p>
        <p>Address: {user?.address}</p>
        <p>Is Admin: {user?.isAdmin ? "Yes" : "No"}</p>
        
      
    </div>
  )
}

export default Profile
