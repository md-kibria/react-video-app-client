import Comment from "../components/Comment"
// import Searchbar from "../components/Searchbar"
import VideoComp from '../components/Video'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useContext, useRef } from "react"
import { loadVideos, loadSingleVideo } from '../store/action/videoAction'
import { loadComments, addComment } from '../store/action/commentAction'
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import AuthHoc from "../components/hoc/AuthHoc"
import { ListContext } from "../App"
import axios from "axios"

const Video = ({ auth }) => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [vidArr, setVidArr] = useState([])
    const videoState = useSelector(state => state.videos)
    const commentState = useSelector(state => state.comments)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [isFavVid, setIsFavVid] = useState(false)
    const videoRef = useRef()

    const { list, setList } = useContext(ListContext)

    useEffect(() => {
        dispatch(loadSingleVideo(id))
        dispatch(loadComments(id))
        dispatch(loadVideos())
    }, [dispatch, id])

    // update videoArray with videos
    useEffect(() => {
        if (videoState.videos.videos) {
            setVidArr(videoState.videos.videos)
        }
    }, [videoState])

    // reload video component
    useEffect(() => {
        videoRef.current.load()
    }, [videoState.video.video])

    // check is video is added to favourite list or not
    useEffect(() => {
        const fav = list.find(value => {
            return value._id === videoState.video._id
        })

        setIsFavVid(Boolean(fav))

    }, [list, videoState.video._id])

    // handle add to favourite video
    const handleFav = async (id) => {
        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_token')
            await axios.put(`/api/user/addfav/${id}`)
            
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
            setList([...list, { _id: id, title: videoState.video.title }])
        } else {
            let newFav = list.filter(vid => vid._id !== id)
            setList(newFav)
        }
    }

    // handle comment submit
    const onSubmit = data => {
        if (auth.isLoggedIn) {
            dispatch(addComment(id, data))
        } else {
            alert('Please login first!')
        }
    }

    // comment error message
    let commentErrMsg = errors.comment && errors.comment.type === 'required' && 'Please write your comment'

    return (
        <div className="">
            {/* <Searchbar /> */}
            <div className="flex mt-6">
                <div className="w-full md:w-3/5">
                    <video ref={videoRef} className="w-full" controls autoPlay>
                        {videoState.video.video && (
                            <source src={`/uploads/${videoState.video.video}`} />
                        )}
                    </video>
                    <div className="m-2">
                        <h1 className="font-bold text-2xl text-slate-900 py-2">{videoState.video.title}</h1>
                        <p className="text-slate-600">{videoState.video.desc}</p>
                        <div className='flex py-5 justify-between'>
                            <p className='text-slate-700'><i className="fa fa-comments"></i> {commentState.comments.length} Comments</p>
                            <p className='text-slate-700'><i className="fa fa-eye"></i> {videoState.video.views} Views</p>
                            {auth.isLoggedIn
                                ? (
                                    <div onClick={() => handleFav(videoState.video._id)} className='ml-1 text-slate-700'>
                                        <i className={isFavVid ? "fa fa-heart" : "fa fa-heart-o"}></i>
                                    </div>
                                )
                                : (
                                    <div onClick={() => alert("Please login first")} className='ml-1 text-slate-700'>
                                        <i className="fa fa-heart-o"></i>
                                    </div>
                                )}
                        </div>
                    </div>
                    <div className="comments">
                        <h2 className="text-slate-700 font-bold text-2xl mb-6">Comments</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex align-middle">
                            <textarea
                                className="comment-inp"
                                name=""
                                id=""
                                cols="50"
                                rows="1"
                                placeholder="Your comment here.."
                                {...register('comment', { required: true })}
                            />
                            <input
                                className="comment-btn"
                                type="submit"
                                value="Send"
                            />
                        </form>
                        <p className="text-red-600 text-sm">{commentErrMsg}</p>
                        {commentState.comments.length === 0
                            ? <p className="text-slate-700">No comments available for this video</p>
                            : (
                                <div>
                                    {commentState.comments.map(comment => (
                                        <Comment key={comment._id} comment={comment} />
                                    ))}
                                </div>
                            )
                        }

                    </div>
                </div>
                <div className="!w-80 ml-6 hidden md:block">
                    {vidArr.length !== 0 && vidArr.map(video => (
                        <VideoComp key={video._id} video={video} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AuthHoc(Video)
