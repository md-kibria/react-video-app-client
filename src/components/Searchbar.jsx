import React, { useState } from 'react'

const Searchbar = ({setQ}) => {

    const [inp, setInp] = useState({ q: '' })

    // handle chenge value
    const handleChange = event => {
        setInp({
            q: event.target.value
        })
    }

    // submit 
    const handleSubmit = (e) => {
        e.preventDefault()
        setQ(inp.q)
    }

    return (
        <form className='w-full flex justify-center sm:block mb-4' onSubmit={(e) => handleSubmit(e)}>
            <input
                className="inp-search"
                type="search"
                name="q"
                id="q"
                placeholder='Search video...'
                value={inp.q}
                onChange={handleChange}
            />
            <input
                className='btn-search'
                type="submit"
                value="Search"
            />
        </form>
    )
}

export default Searchbar
