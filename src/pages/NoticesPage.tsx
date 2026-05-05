import type { JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { useEffect, useState } from "react";
import { fetchNotices, fetchNoticesCategories, fetchNoticesSex, fetchNoticesSpecies } from "../redux/notices/operation";
import { fetchAllCities } from "../redux/cities/operation";
import { selectNoticesTotalPages } from "../redux/notices/selector";
import NoticesFilters from "../components/NoticesFilters";
import NoticesList from "../components/NoticesList";
import Pagination from "../components/Pagination";
import { fetchUserInfo } from "../redux/users/operation";
import { selectAuthenticated } from "../redux/auth/selector";

const NoticesPage = (): JSX.Element => {


  const isAuthenticated = useSelector(selectAuthenticated)

  const dispatch = useDispatch<AppDispatch>();
  const totalPages = useSelector(selectNoticesTotalPages);

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    keyword: "",
    category: "",
    sex: "",
    species: "",
    sort: "", // "popular" | "unpopular" | "cheap" | "expensive"
    locationId: null as number | null,
  });

  // Fetch filter options on mount
  useEffect(() => {
    dispatch(fetchNoticesCategories());
    dispatch(fetchNoticesSex());
    dispatch(fetchNoticesSpecies());
    dispatch(fetchAllCities());
  }, [dispatch]);
  
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserInfo());
    }
    
  },[dispatch,isAuthenticated])

  // Fetch notices when filters or page changes
  useEffect(() => {
    dispatch(
      fetchNotices({
        keyword: filters.keyword || undefined,
        category: filters.category || undefined,
        sex: filters.sex || undefined,
        species: filters.species || undefined,
        locationId: filters.locationId || undefined,
        byPopularity: filters.sort === "popular" ? true : filters.sort === "unpopular" ? false : undefined,
        byPrice: filters.sort === "cheap" ? true : filters.sort === "expensive" ? false : undefined,
        page: currentPage,
      })
    );
  }, [dispatch, filters, currentPage]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleReset = () => {
    setFilters({
      keyword: "",
      category: "",
      sex: "",
      species: "",
      sort: "",
      locationId: null,
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-[54px] mb-[60px] font-bold">Find your favorite pet</h1>

      <NoticesFilters filters={filters} onFilterChange={handleFilterChange} onReset={handleReset} />

      <NoticesList />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default NoticesPage;
