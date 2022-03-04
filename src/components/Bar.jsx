const Bar = ({close}) => {
    return (
        <div className={close ? 'bar': 'bar close'}>
            <p></p>
            <p></p>
            <p></p>
        </div>
    )
}

export default Bar
