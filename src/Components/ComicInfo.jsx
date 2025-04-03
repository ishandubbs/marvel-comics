import React, { useEffect, useState } from 'react';
import md5 from 'md5';

const privateKey = "27af96fb316dfdc5d0fb1971244fa64e3290088d"
const publicKey = "0af833b07e711564e2b1c18e67b5526a"

const ComicInfo = ({ image, title, id }) => {
    const [comic, setcomic] = useState(null);

    useEffect(() => {
        const fetchcomic = async() => {
            const ts = new Date().getTime();
            const hash = md5(ts + privateKey + publicKey);

            const response = await fetch(
                `https://gateway.marvel.com/v1/public/comics/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
            );

            const json = await response.json()
            if (json.data && json.data.results.length > 0) {
                setcomic(json.data.results[0]);
            } 
        };

        fetchcomic().catch(console.error);
    }, [id]);


    return (
        <div className='comic-container'>
            {comic ? ( // rendering only if API call actually returned us data
                <li className="main-list" key={comic.id}>
                    <img 
                        className='icons' 
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
                        alt={`Thumbnail for ${comic.title} comic.`} 
                    />
                    <span className='comic-title'>{comic.title}</span>
                    <span className='tab'></span>
                    <span className='comic-price'>
                        {comic.prices.length > 0
                            ? `$${comic.prices[0].price}` 
                            : "Price not available"}
                        </span>
                </li>
            ) : (
                <span>Loading comic details...</span>
            )
        }
        </div>
    );
}

export default ComicInfo;