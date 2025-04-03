import React from 'react';

const getHandbook = ({ comics }) => {
    const handbooks = comics.filter(comic => comic.title.toLowerCase().includes('Handbook'))

    return (
        <div>
            <h1>Marvel Handbooks</h1>
            <ul>
                {handbooks.length > 0 ? (
                    handbooks.map((comic) => (
                        <li key={comic.id}>
                            <img
                                className='icons'
                                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                alt={`Thumbnail for ${comic.title} comic.`}
                                />
                                {comic.title} <span className="tab"></span>
                                {comic.prices.length > 0
                                ? `$${comic.prices[0].price}`
                                : "Price not available"}
                        </li>
                    ))
                ) : (
                    <p>No handbooks found.</p>
                )}
            </ul>
        </div>
    )
    
}

export default getHandbook;