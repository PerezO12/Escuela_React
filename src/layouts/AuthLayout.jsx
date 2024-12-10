import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="bg-gradient-to-r from-gray-100 via-gray-300 to-gray-400">
        <main className="container mx-auto mt-5 md:flex md:justify-center ">
            <div className="md:w-2/3 lg:w-2/5">
                <Outlet />
            </div>
        </main>
    </div>
  )
}

export default AuthLayout