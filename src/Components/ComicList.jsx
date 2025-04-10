import React, { useEffect, useState } from "react";
import md5 from "md5";
import SideNav from "./SideNav";
import { Link } from "react-router-dom";

const ComicList = () => {
    const [comics, setComics] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("")
    const [view, setView] = useState("dashboard")
    const [error, setError] = useState(null);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        applyFilters(searchValue, categoryFilter)
    };

    const applyFilters = (searchValue, category) => {
        let filteredData = comics;

        if (category) {
        filteredData = filteredData.filter((comic) => comic.format.toLowerCase().includes(category.toLowerCase()))
        }

        if (searchValue) {
        filteredData = filteredData.filter((comic) => 
            comic.title.toLowerCase().includes(searchValue.toLowerCase())
        )
        } 
        setFilteredResults(filteredData);
    }

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setCategoryFilter(category);
        applyFilters(searchInput, category)
    }

    const handleViewChange = (newView) => {
        setView(newView)
    }

    useEffect(() => {
        const fetchAllMarvelData = async() => {

            const publicKey = "0af833b07e711564e2b1c18e67b5526a";
            const privateKey = "27af96fb316dfdc5d0fb1971244fa64e3290088d";
            const ts = new Date().getTime();
            const hash = md5(ts + privateKey + publicKey);


            const url = `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to catch data")
                }
                console.log(response);
                const json = await response.json();
                console.log("Marvel Data:", json)

                if (!json.data || json.data.results.length === 0) {
                    setError("No comics found.")
                    return;
                }
                console.log(json)


                setComics(json.data.results);

                setFilteredResults(json.data.results)
            } catch (error) {
                setError("Error fetching comics.");
            }
        }

        fetchAllMarvelData().catch(console.error);
    }, [])

    console.log(comics);

    return (
        <div className="whole-page">
        <SideNav handleViewChange={handleViewChange} /> 
        <h1>Marvel Comics</h1>

        <input
            type="text"
            placeholder="Search comics..."
            onChange={(inputString) => searchItems(inputString.target.value)}
        />

        <select onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            <option value="Comic">Comic</option>
            <option value="Handbook">Handbook</option>
        </select>

        {view === "dashboard" && (
            <div>
            <h2>Comics Dashboard</h2>
            <ul>
                {filteredResults.length > 0 ? (
                filteredResults.map((comic) => (
                    <li key={comic.id}>
                        <Link to={`/comics/${comic.id}`}>
                            <img
                                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                alt={`Thumbnail for ${comic.title}`}
                                style={{ width: "100px", height: "auto" }}
                            />
                            {comic.title}
                    </Link>
                    <span className="tab"></span>
                    {comic.prices.length > 0
                        ? `$${comic.prices[0].price}`
                        : "Price not available"}
                    </li>
                ))
                ) : (
                <p>No comics found.</p>
                )}
            </ul>
            </div>
        )}

        {view === "handbooks" && (
            <div>
            <h2>Handbooks</h2>
            <ul>
                {filteredResults.length > 0 ? (
                filteredResults
                    .filter((comic) => comic.format === "Handbook")
                    .map((comic) => (
                    <li key={comic.id}>
                        <Link to={`/comics/${comic.id}`}>
                            <img
                            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                            alt={`Thumbnail for ${comic.title}`}
                            style={{ width: "100px", height: "auto" }}
                            />
                            {comic.title}
                        </Link>
                        <span className="tab"></span>                        
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
        )}
    </div>
    );
}

export default ComicList