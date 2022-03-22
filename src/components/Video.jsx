import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AuthHoc from './hoc/AuthHoc'
import { ListContext } from '../App'

const Video = ({ video, auth }) => {

    const [comments, setComments] = useState(0)
    const [isFavVid, setIsFavVid] = useState(false)
    const { list, setList } = useContext(ListContext)

    // check is video is added to favourite list or not
    useEffect(() => {
        const fav = list.find(value => {
            return value._id === video._id
        })

        setIsFavVid(Boolean(fav))

    }, [list, video._id])

    // update comments with current data
    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/comment/${video._id}`)
                setComments(data.total)
            } catch (error) {
                setComments(0)
            }
        }

        fetchData()
    }, [video._id])

    // handle add to video to favourite list
    const handleFav = async (id) => {
        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_token')
            await axios.put(`${process.env.REACT_APP_BACKEND_HOST}/api/user/addfav/${id}`)

            // const res = await axios.put(`/api/user/addfav/${id}`)
            // if (res.data.status === 'ok') {
            //     alert(res.data.msg)
            // }
        } catch (error) {
            console.log(error)
            if (error) {
                alert(error.message)
            }
        }
        setIsFavVid(!isFavVid)

        // update sidebar favourite list
        let isExist = list.find(vid => {
            return vid._id === id
        })

        if (!isExist) {
            setList([...list, { _id: id, title: video.title }])
        } else {
            let newFav = list.filter(vid => vid._id !== id)
            setList(newFav)
        }
    }

    return (

        <div className='video-container'>
            <Link to={`/video/${video._id}`}>
                <div className='video-header'>
                    <img
                        src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${video.thumbnail}`}
                        alt={video.title}
                        className='h-32 w-full rounded-tl-md rounded-tr-md'
                    />
                    <div className='play-btn'>
                        <p className="text-2xl ml-1.5 -mt-0.5">
                            <i className="fa fa-play"></i>
                        </p>
                    </div>
                </div>
            </Link>
            <div className='m-2'>
                <Link to={`/video/${video._id}`}>
                    <h1 className='font-bold text-xl text-slate-800'>{video.title}</h1>
                    <p className='text-slate-700 text-sm'>{video.desc.substring(0, 80)}..</p>
                </Link>
                <div className='flex pt-1 pb-2 justify-between'>
                    <p className='text-slate-700'><i className="fa fa-comments"></i> {comments}</p>
                    <p className='text-slate-700'><i className="fa fa-eye"></i> {video.views}</p>
                    {auth.isLoggedIn
                        ? (
                            <div onClick={() => handleFav(video._id)} className='ml-1 text-slate-700 cursor-pointer'>
                                <i className={isFavVid ? "fa fa-heart" : "fa fa-heart-o"}></i>
                            </div>
                        )
                        : (
                            <div onClick={() => alert("Please login at first!")} className='ml-1 text-slate-700 cursor-pointer'>
                                <i className="fa fa-heart-o"></i>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>

    )
}

export default AuthHoc(Video)
