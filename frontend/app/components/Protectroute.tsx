import { useUserStore } from "../userStore/user"
import Link from "next/link"
const Protectroute = () => {
//user
const {     user } = useUserStore()
if(!user){  
return <div>
<Link href="/login">Login</Link>
</div>
}   
  return (
    <div>
      
    </div>
  )
}

export default Protectroute
