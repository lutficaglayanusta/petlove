import { useSelector } from "react-redux"
import { selectNews } from "../redux/news/selector"
import NewsItem from "./NewsItem";


const NewsList = () => {

    const news = useSelector(selectNews);

  return (
    <div className="flex flex-wrap gap-5 max-sm:flex-col">
          {
            news.map((item) => (
              <NewsItem key={item._id} item={item} />
            ))
          }
    </div>
  )
}

export default NewsList
