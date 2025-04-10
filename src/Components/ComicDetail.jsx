import React, { Component, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ComicPriceChart from "./ComicPriceChart";
import ComicSeriesDistribution from "./ComicSeriesDistribution";
import md5 from "md5";
const publicKey = "0af833b07e711564e2b1c18e67b5526a";
const privateKey = "27af96fb316dfdc5d0fb1971244fa64e3290088d";

const ComicDetail = () => {
    const { id } = useParams();
    const [comic, setComic] = useState(null);

    useEffect(() => {
        const getComicDetail = async () => {
            const ts = new Date().getTime();
            const hash = md5(ts + privateKey + publicKey);

            const url = `https://gateway.marvel.com/v1/public/comics/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`

            const response = await fetch (url)
            const data = await response.json();
            console.log(id)

            if (data.data && data.data.results.length > 0) {
                setComic(data.data.results[0])
            }
        }

        getComicDetail().catch(console.error)
    }, [id])

    return (
        <div className="whole-page">
            {comic ? (
                <>
                    <h1>{comic.title}</h1>
                    <img 
                    className="icons" 
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
                    alt={`Thumbnail for ${comic.title} comic.`} 
                    />
                    <table>
                        <tbody> 
                            <tr>
                            <th>Title </th>
                            <td>{comic.title} </td>
                            </tr>
                            <tr>
                            <th>Issue Number </th>
                            <td>{comic.issueNumber} </td>
                            </tr>
                            <tr>
                            <th>Page Count </th>
                            <td>{comic.pageCount || "N/A"} </td>
                            </tr>
                            <tr>
                            <th>Price </th>
                            <td>{comic.prices.length > 0 ? `$${comic.prices[0].price}` : "Not available"} </td>
                            </tr>
                            <tr>
                            <th>Series </th>
                            <td>{comic.series?.name || "N/A"} </td>
                            </tr>
                            <tr>
                            <th>Creators </th>
                            <td>{comic.creators.items.length > 0 ? comic.creators.items.map((c) => c.name).join(", ") : "N/A"} </td>
                            </tr>
                            <tr>
                            <th>Characters</th>
                            <td>{comic.characters.items.length > 0 ? comic.characters.items.map((ch) => ch.name).join(", ") : "N/A"} </td>
                            </tr>
                        </tbody>
                    </table>
                    <ComicPriceChart id={id} />
                    <ComicSeriesDistribution id={id} />

                    <Link to="description" className="scroll-link">Go to Description</Link>
                    <div id="description">
                        <h2>Description</h2>
                        <p>{comic.description || "No description available."}</p>
                    </div>

                    <Link to={`/comics/${parseInt(id) + 1}`}>Next Comic</Link>
                    <br />
                </>
            ) : (
                <p>Loading comic details...</p>
            )}
        </div>
    )
}

export default ComicDetail