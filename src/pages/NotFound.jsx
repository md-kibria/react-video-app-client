import { useNavigate } from "react-router-dom"

const NotFound = () => {

    // navigate
    const navigate = useNavigate()

    return (
        <div className="">
            <div className="m-auto text-center mt-56">
                <h1 className="text-slate-800 m-auto text-7xl">404</h1>
                <p className="text-slate-600 m-auto text-4xl py-2">Not found!</p>
                <p onClick={() => navigate(-1)} className="text-slate-500 cursor-pointer underline hover:no-underline"><i className="fa fa-arrow-circle-left"></i> Go back</p>
            </div>
            {/* <code className="hover:fav-color bg-green-700 md:my-bg">Hello</code> */}
        </div>
    )
}

export default NotFound
