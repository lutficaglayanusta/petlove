import { useDispatch } from "react-redux"
import type { AppDispatch } from "../redux/store"
import { useEffect } from "react";
import { fetchAllNews } from "../redux/news/operations";
import type {JSX} from "react";
import SearchField from "../components/SearchField";
import NewsList from "../components/NewsList";


const NewsPage = (): JSX.Element => {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllNews())
  },[dispatch])

  return (
    <div className="max-w-5xl mx-auto">
      <div>
        <h1>News</h1>
        <SearchField />
      </div>
      
      <NewsList />

    </div>
  )
}

export default NewsPage
