import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Bar from './Bar'
import AuthHoc from './hoc/AuthHoc'
import { useDispatch } from 'react-redux'
import {logoutUser} from '../store/action/authAction'

const Navigation = ({ auth }) => {

    const dispatch = useDispatch()
    const [close, setClose] = useState(true)

    // close or open navigation panel in small device
    const handleClose = () => {
        setClose(!close)
    }

    // logout
    const handleLogout = () => {
        dispatch(logoutUser())
    }

    return (
        <nav className='flex justify-between px-6 h-navbar bg-slate-900 text-slate-50'>
            <div className='my-auto'>
                <h1 className='text-lg font-bold'>
                    <NavLink to='/'>VID</NavLink>
                </h1>
            </div>
            <div className='block my-auto sm:hidden' onClick={handleClose}>
                <Bar close={close} />
            </div>
            <ul className={close ? 'nav-items' : 'nav-items left-0'}>
                <li className='px-3 py-1'>
                    <NavLink to='/'>Home</NavLink>
                </li>
                <li className='px-3 py-1'>
                    <NavLink to='/'>About</NavLink>
                </li>
                <li className='px-3 py-1'>
                    <NavLink to='/'>Privacy</NavLink>
                </li>
                {auth.isLoggedIn
                    ? (
                        <li onClick={handleLogout} className="nav-btn bg-red-700 hover:bg-red-900">
                            Logout
                        </li>
                    )
                    : (
                        <NavLink to='/login'>
                            <li className='nav-btn bg-green-700 hover:bg-green-900'>
                                Login
                            </li>
                        </NavLink>
                    )
                }
            </ul>
        </nav>
    )
}

export default AuthHoc(Navigation)
