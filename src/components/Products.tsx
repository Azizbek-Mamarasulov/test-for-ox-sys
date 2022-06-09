import { Link } from "react-router-dom";
import { DetailsForThirdTask } from "./Details";
import ProductTable from "./Table";

function Products() {
  return (
    <div className="container">
      <DetailsForThirdTask />
      <ProductTable />
    </div>
  );
}

export default Products;
