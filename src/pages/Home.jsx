import Searchbar from "../components/Searchbar"
import Video from "../components/Video"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { loadVideos, searchVideo } from '../store/action/videoAction'

const Home = ({ open }) => {

    const dispatch = useDispatch()
    const videoState = useSelector(state => state.videos)
    const [vidArr, setVidArr] = useState([])
    const [q, setQ] = useState(null)

    // dispatch search video or load random videos
    useEffect(() => {
        if (q) {
            dispatch(searchVideo(q))
        } else {
            dispatch(loadVideos())
        }
    }, [dispatch, q])

    // update video array with videos from server
    useEffect(() => {
        if (videoState.videos.videos) {
            setVidArr(videoState.videos.videos)
        }
    }, [videoState])

    return (
        <div className="w-full">
            <Searchbar setQ={setQ} />
            <p className={videoState.videos.status === 'not found' ? "text-xl mt-4" : "hidden"}>{videoState.videos.msg} {videoState.videos.length}</p>
            <div className={open
                ? "grid gap-1 grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
                : "grid gap-1 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2"
            }>
                {vidArr.length !== 0 && vidArr.map(video => (
                    <Video key={video._id} video={video} />
                ))}
            </div>
        </div>
    )
}

export default Home
