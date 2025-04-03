import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import md5 from 'md5'
import ComicInfo from './Components/ComicInfo';
import SideNav from './Components/SideNav';

function App() {
  const [comics, setComics] = useState([])
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const publicKey = "0af833b07e711564e2b1c18e67b5526a";
  const privateKey = "27af96fb316dfdc5d0fb1971244fa64e3290088d";
  const ts = new Date().getTime();
  const hash = md5(ts + privateKey + publicKey);

  console.log(hash)

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = comics.filter((comic) => 
        comic.title.toLowerCase().includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(comics);
    }
  };

  useEffect(() => {
    const fetchAllMarvelData = async() => {

      const url = `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
      console.log(url)

      const response = await fetch(url);
      console.log(response);
      const json = await response.json();
      console.log(json)


      setComics(json.data.results);
      setFilteredResults(json.data.results)
    }

    fetchAllMarvelData().catch(console.error);
  }, [])

  console.log(comics);

  return (
    <div className='whole-page'>
      <SideNav />
      <h1>Marvel Comics List</h1>
      <input
        type="text"
        placeholder="Search comics..."
        onChange={(inputString) => searchItems(inputString.target.value)}
      />

      <ul>
        {searchInput.length > 0
          ? filteredResults.map((comic) => (
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
          : comics.map((comic) => (
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
            ))}
      </ul>
    </div>
  );
};

export default App;
