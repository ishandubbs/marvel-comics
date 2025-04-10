import './App.css'
import ComicList from './Components/ComicList';
import DetailView from '../routes/DetailView';
import { useRoutes } from "react-router-dom"


function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <ComicList />
    },
    {
      path: "/comics/:id",
      element: <DetailView />
    }
  ])

  return (
    <div>
      {element}
    </div>
  )
}

export default App;