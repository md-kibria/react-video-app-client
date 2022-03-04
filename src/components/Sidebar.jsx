import { useEffect} from 'react'
import ListHoc from './hoc/ListHoc'
import AuthHoc from './hoc/AuthHoc'
import { Link } from 'react-router-dom'

const Sidebar = ({ open, setOpen, auth, list }) => {

    // handle open or close sidebar
    const handleOpen = () => {
        setOpen(!open)
    }

    // in small device sidebar will auto close
    useEffect(() => {
        if (window.innerWidth < 640) {
            setOpen(true)
        }
    }, [setOpen])

    // destracturing from loggedin user
    const { name, email, img } = auth.user

    return (
        <div className={open ? `sidebar-container -ml-side` : `sidebar-container ml-0`} >
            {auth.isLoggedIn
                ? (
                    <>
                        <div className="h-auto w-full pt-8">
                            <img src={`/uploads/${img}`} alt="/" className='h-24   w-24  m-auto  rounded-full ring-4 ring-green-400 shadow-md' />
                            <p className='font-bold text-xl text-gray-900 text-center mt-2'>{name}</p>
                            <p className="text-gray-700 text-sm text-center">{email}</p>
                        </div>
                        <div className="px-6 py-6">
                            <h3 className='font-bold text-xl text-slate-900'>Favourit List </h3>
                            <hr className='my-2' />
                            {list.length === 0 ? (
                                <p className="text-slate-500">No favourite video</p>
                            )
                            : (
                            <ul className='text-slate-800 overflow-y-auto h-72'>
                                {list.map(vid => (
                                    <Link to={`/video/${vid._id}`} key={vid._id}>
                                        <li><i className='fa fa-link'></i> {vid.title}</li>
                                    </Link>
                                ))}
                            </ul>
                            )}

                        </div>
                    </>
                )
                : (
                    <div className="text-center mt-16">
                        <Link to='/login'>
                            <button className='bg-green-700 hover:bg-green-800 sidebar-btn'>
                                Login
                            </button>
                        </Link>
                        <p className='sidebar-or'>or</p>
                        <Link to='/signup'>
                            <button className='bg-slate-700 hover:bg-slate-800 sidebar-btn'>
                                Signup
                            </button>
                        </Link>
                    </div>
                )}
            <div className="sidebar-icon z-10" onClick={handleOpen}>
                {open
                    ? <i className="fa fa-chevron-right"></i>
                    : <i className="fa fa-chevron-left"></i>}
            </div>
        </div>
    )
}

export default AuthHoc(ListHoc(Sidebar))
