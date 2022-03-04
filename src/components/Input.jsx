const Input = ({ placeholder, error, name, register }) => {

    return (
        <>
            <input
                className={error ? "inp" : "inp my-2"}
                type={name === 'password' || name === 'confirmPass' ? 'password' : name === 'email' ? 'email' : 'text'}
                placeholder={placeholder}
                {...register(name, {required: true})}
            />
            {error &&  <p className="mr-auto -my-1 ml-9 text-xs text-red-600">{error}</p>}
        </>
    )
}

export default Input
