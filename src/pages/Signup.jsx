import FormBtn from '../components/FormBtn'
import Input from '../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {signupUser} from '../store/action/authAction'
import { useEffect } from 'react'

const Signup = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authState = useSelector(state => state.auth)
    const {register, handleSubmit, formState: {errors}} = useForm()

    // handle submit
    const onSubmit = data => {
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('password', data.password)
        formData.append('confirmPassword', data.confirmPass)
        formData.append('img', data.img[0])

        dispatch(signupUser(formData))
    }

    // error message
    let nameErrMsg = errors.name && errors.name.type === 'required' && 'Name is required' || authState.errors && authState.errors.name && authState.errors.name.msg
    let emailErrMsg = errors.email && errors.email.type === 'required' && 'Email is required' || authState.errors && authState.errors.email && authState.errors.email.msg
    let passwordErrMsg = errors.password && errors.password.type === 'required' && 'Password is required' || authState.errors && authState.errors.password && authState.errors.password.msg
    let confirmPassErrMsg = errors.confirmPass && errors.confirmPass.type === 'required' && 'Confirmation password is required' || authState.errors && authState.errors.confirmPassword && authState.errors.confirmPassword.msg
    let imgErrMsg = errors.img && errors.img.type === 'required' && 'Please select a image' || authState.errors && authState.errors.img && authState.errors.img.msg

    // if loggedin redirect to home
    useEffect(() => {
        if(authState.isLoggedIn) {
            navigate('/')
        }
    }, [authState])

    return (
        <div className="bg-white h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <h1 className="form-title">SignUp</h1>
                <Input
                    name="name"
                    placeholder="Your name"
                    register={register}
                    error={nameErrMsg}
                />
                <Input
                    name="email"
                    placeholder="Your email"
                    register={register}
                    error={emailErrMsg}
                />
                <Input
                    name="password"
                    placeholder="Your password"
                    register={register}
                    error={passwordErrMsg}
                />
                <Input
                    name="confirmPass"
                    placeholder="Your confirmation password"
                    register={register}
                    error={confirmPassErrMsg}
                />
                <input
                    type="file"
                    name=""
                    id=""
                    className='p-2 py-1 w-64'
                    {...register('img', {required: true})}
                />
                {imgErrMsg &&  <p className="mr-auto -my-1 ml-9 text-xs text-red-600">{imgErrMsg}</p>}
                <p className="text-slate-500 text-sm">Already have an account? <Link className='text-blue-500' to='/login'>Login</Link> here</p>
                <FormBtn />
            </form>
        </div>
    )
}

export default Signup
