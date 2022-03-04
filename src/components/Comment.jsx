const Comment = ({comment}) => {

    return (
        <div className='w-4/5 flex my-2'>
            <div className='h-12 bg-green-600 min-w-12 rounded-full'>
                <img src={`/uploads/${comment.author.img}`} alt="" className='h-full w-full rounded-full'/>
            </div>
            <div className='bg-slate-400 p-2 rounded-lg mx-2'>
                <h3 className='font-bold text-slate-800'>{comment.author.name}</h3>
                <p className="text-slate-600">{comment.text}</p>
            </div>
        </div>
    )
}

export default Comment
