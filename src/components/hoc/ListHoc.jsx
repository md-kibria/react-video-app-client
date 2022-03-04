import { useEffect, useContext } from 'react'
import axios from 'axios'
import { ListContext } from '../../App'

const ListHoc = (OriginalComponent) => {
    const NewComponent = (props) => {
        const { list, setList } = useContext(ListContext)
        const { auth } = props

        // update favourite list with data from server
        useEffect(() => {
            async function fetchUserFavList() {
                const res = await axios.get(`/api/user/${auth.user._id}`)
                setList(res.data.user.list)
            }

            fetchUserFavList()
        }, [auth.user._id, setList])

        return <OriginalComponent {...props} list={list} />
    }
    return NewComponent
}

export default ListHoc