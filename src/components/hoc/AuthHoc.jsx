import { useSelector } from 'react-redux'
import {} from '../../store/action/authAction'

function AuthHoc(OriginalComponent) {

    const NewComponent = (props) => {
        const authState = useSelector(state => state.auth)

        return <OriginalComponent {...props} auth={authState} />
    }
    return NewComponent
}

export default AuthHoc