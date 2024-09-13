import { AsyncPaginate, LoadOptions } from "react-select-async-paginate";
import { useState, useEffect } from "react";
import { GEO_API_URL, geoAPIOptions } from "../../api";

interface City {
  value: string;
  label: string;
}

interface SearchProps {
  onSearchChange: (searchData: City) => void;
}

export default function Search({ onSearchChange }: SearchProps) {
    const defaultCity = { value: "-1.286389 36.817223", label: "Nairobi, KE" };
    const [search, setSearch] = useState<City | null>(defaultCity);

    useEffect(() => {
        onSearchChange(defaultCity);
      }, []);

  const loadOptions: LoadOptions<City, any, any> = async (
    inputValue: string
  ) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoAPIOptions
      );
      const result = await response.json();

      // Return the correct structure for AsyncPaginate
      return {
        options: result.data.map((city: any) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (error) {
      console.error(error);
      return {
        options: [],
      };
    }
  };

  const handleOnChange = (searchData: City | null) => {
    setSearch(searchData);
    if (searchData) {
      onSearchChange(searchData);
    }
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
}
