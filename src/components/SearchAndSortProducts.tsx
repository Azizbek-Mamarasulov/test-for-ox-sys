import { Input } from "antd";
import { useState } from "react";
import { DetailsForFouthTask } from "./Details";
import ProductTable from "./Table";

function SearchAndSortProducts() {
  const [search, setSearch] = useState("");

  return (
    <div className="container">
      <DetailsForFouthTask />
      <Input.Search
        placeholder="Search"
        allowClear
        onSearch={(value: string) => {
          setSearch(value);
        }}
      />
      <ProductTable search={search} />
    </div>
  );
}

export default SearchAndSortProducts;
