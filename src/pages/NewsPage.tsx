import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "../redux/store"
import { useEffect, useState } from "react";
import { fetchNews } from "../redux/news/operations";
import type {JSX} from "react";
import SearchField from "../components/SearchField";
import NewsList from "../components/NewsList";
import Pagination from "../components/Pagination";
import { selectNewsPage, selectNewsTotalPages } from "../redux/news/selector";


const NewsPage = (): JSX.Element => {

  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    dispatch(fetchNews({ keyword, page: currentPage }))
  }, [dispatch, currentPage, keyword])
  
  const newsPage = useSelector(selectNewsPage);
  const newsTotalPages = useSelector(selectNewsTotalPages);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (searchKeyword: string) => {
    setKeyword(searchKeyword);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8 max-sm:flex-col">
        <h1 className="text-[54px] mb-[60px] font-bold max-sm:mb-3">News</h1>
        <SearchField onSearch={handleSearch} />
      </div>
      
      <NewsList />

      {newsTotalPages > 1 && (
        <Pagination
          currentPage={newsPage || currentPage}
          totalPages={newsTotalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}
export default NewsPage
