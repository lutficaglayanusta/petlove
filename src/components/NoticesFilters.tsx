
import type { JSX } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import {
  selectNoticesCategories,
  selectNoticesSex,
  selectNoticesSpecies,
} from "../redux/notices/selector";
import { selectCities } from "../redux/cities/selector";
import SearchField from "./SearchField";

type NoticesFiltersProps = {
  filters: {
    keyword: string;
    category: string;
    sex: string;
    species: string;
    sort: string;
    locationId: number | null;
  };
  onFilterChange: (filters: Partial<typeof filters>) => void;
  onReset: () => void;
};

const NoticesFilters = ({
  filters,
  onFilterChange,
  onReset,
}: NoticesFiltersProps): JSX.Element => {
  const categories = useSelector(selectNoticesCategories);
  const sexOptions = useSelector(selectNoticesSex);
  const speciesOptions = useSelector(selectNoticesSpecies);
  const cities = useSelector(selectCities);

  const handleSearch = (keyword: string) => {
    onFilterChange({ keyword });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ category: e.target.value });
  };

  const handleSexChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ sex: e.target.value });
  };

  const handleSpeciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ species: e.target.value });
  };

  const handleLocationChange = (option: any) => {
    onFilterChange({ locationId: option?.value || null });
  };

  const handleSortChange = (sortType: string) => {
    onFilterChange({
      sort: filters.sort === sortType ? "" : sortType,
    });
  };

  // Prepare city options for react-select
  const cityOptions = cities
    ? cities.map((city: any) => ({
        value: city._id,
        label: city.cityEn || city.stateEn,
      }))
    : [];

  const selectedCity = cityOptions.find((opt) => opt.value === filters.locationId);

  return (
    <div className="bg-amber-50 rounded-lg p-6 mb-8">
      {/* Search Field */}
      <div className="mb-6">
        <SearchField onSearch={handleSearch} placeholder="Search notices..." />
      </div>

      {/* Main Filters */}
      <div className="flex gap-4 mb-6 flex-wrap items-end">
        <div className="flex-1 min-w-64">
          <label className="block text-sm font-semibold mb-2">Category</label>
          <select
            value={filters.category}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="">All Categories</option>
            {categories &&
              categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
          </select>
        </div>

        <div className="flex-1 min-w-64">
          <label className="block text-sm font-semibold mb-2">By Gender</label>
          <select
            value={filters.sex}
            onChange={handleSexChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="">All Genders</option>
            {sexOptions &&
              sexOptions.map((sex) => (
                <option key={sex} value={sex}>
                  {sex}
                </option>
              ))}
          </select>
        </div>

        <div className="flex-1 min-w-64">
          <label className="block text-sm font-semibold mb-2">By Type</label>
          <select
            value={filters.species}
            onChange={handleSpeciesChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="">All Types</option>
            {speciesOptions &&
              speciesOptions.map((species) => (
                <option key={species} value={species}>
                  {species}
                </option>
              ))}
          </select>
        </div>

        <div className="flex-1 min-w-64">
          <label className="block text-sm font-semibold mb-2">Location</label>
          <Select
            options={cityOptions}
            value={selectedCity}
            onChange={handleLocationChange}
            isClearable
            placeholder="Search by location..."
            className="react-select-container"
            classNamePrefix="react-select"
            styles={{
              control: (base) => ({
                ...base,
                borderColor: "#d1d5db",
                "&:hover": {
                  borderColor: "#d1d5db",
                },
                "&:focus-within": {
                  borderColor: "#fbbf24",
                  boxShadow: "0 0 0 2px rgba(251, 191, 36, 0.1)",
                },
              }),
            }}
          />
        </div>
      </div>

      {/* Sort Radio Buttons */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-3">Sort By</label>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => handleSortChange("popular")}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              filters.sort === "popular"
                ? "bg-amber-400 text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => handleSortChange("unpopular")}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              filters.sort === "unpopular"
                ? "bg-amber-400 text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Unpopular
          </button>
          <button
            onClick={() => handleSortChange("cheap")}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              filters.sort === "cheap"
                ? "bg-amber-400 text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Cheap
          </button>
          <button
            onClick={() => handleSortChange("expensive")}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              filters.sort === "expensive"
                ? "bg-amber-400 text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Expensive
          </button>
        </div>
      </div>

      {/* Reset Button */}
      <div>
        <button
          onClick={onReset}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default NoticesFilters;
