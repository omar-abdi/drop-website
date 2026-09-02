import Link from "next/link";

function Navbar() {
  return (
    <div>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">My App</div>
            <div className="space-x-4">
             <Link href="/">Home</  Link>
              <Link href="/login">Login</Link>
              <Link href="/signup">Signup</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
