import FormBtn from '../components/FormBtn'
import Input from '../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {loginUser} from '../store/action/authAction'
import { useEffect } from 'react'

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authState = useSelector(state => state.auth)
    const { register, handleSubmit, formState: { errors } } = useForm()

    // handle submit
    const onSubmit = data => {
        dispatch(loginUser(data))    
    }

    // if loggedin redirect to home
    useEffect(() => {
        if(authState.isLoggedIn) {
            navigate('/')
        }
    }, [authState])

    // error message
    let emailErrMsg = errors.email && errors.email.type === 'required' && "Email is required" || authState.errors && authState.errors.email && authState.errors.email.msg
    let passErrMsg = errors.password && errors.password.type === 'required' && "Password is required" || authState.errors && authState.errors.password && authState.errors.password.msg

    return (
        <div className="bg-white h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <h1 className="form-title">Login</h1>
                <Input
                    name="email"
                    register={register}
                    placeholder={'Your email'}
                    error={emailErrMsg}
                />
                <Input 
                    name="password" 
                    register={register} 
                    placeholder={'Your password'} 
                    error={passErrMsg}
                />
                <p className="text-slate-500 text-sm">Don't have an account? <Link className='text-blue-500' to='/signup'>SignUp</Link> here</p>
                <FormBtn />
            </form>
        </div>
    )
}

export default Login
