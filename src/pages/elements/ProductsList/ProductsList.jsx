import { Grid, Pagination, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { url } from "../../../axios/axios";

const ProductsList = ({ onSelect }) => {
  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);
  // Pagination state
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    supplier: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let urlNew = `${url}/api/products`;
        if (page) {
          urlNew = `${url}/api/products?page=${page}`;
        }
        const response = await fetch(urlNew);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setData(data);
        setProducts(data?.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchData();
  }, [page]);
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        (filters.name === "" ||
          product.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.category === "" || product.category === filters.category) &&
        (filters.supplier === "" || product.supplier === filters.supplier)
      );
    });
  }, [products, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Fields we want to display
  const fields = ["sku", "name", "uom", "category", "price", "quantity"];

  return (
    <div>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ my: 3 }}
      >
        <TextField
          label="Search Product by name"
          style={{ flex: 1 }}
          variant="outlined"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          InputProps={{
            startAdornment: <SearchIcon color="action" />,
          }}
        />
      </Grid>
      <table style={styles.table}>
        <thead style={styles.tableHeader}>
          <tr>
            {fields.map((field) => (
              <th key={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </th>
            ))}
            <th>Supplier</th>
            <th>Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product._id}>
                {fields.map((field) => (
                  <td key={field}>
                    {field === "category"
                      ? product[field]?.name || "-" // Display category name
                      : field === "price"
                      ? `$${product[field]?.toFixed(2) || "0.00"}`
                      : product[field] || "-"}
                  </td>
                ))}
                {/* Display supplier and id */}
                <td>{product.supplier || "-"}</td>
                <td>{product._id || "-"}</td>
                <td>
                  <button
                    onClick={() => onSelect(product)}
                    style={styles.selectButton}
                    aria-label={`Edit ${product.name || "product"}`}
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={fields.length + 3} style={styles.noData}>
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Grid
        container
        alignItems="center"
        justifyContent={"center"}
        sx={{ mt: 3 }}
      >
        <Pagination
          count={data?.pages || 1} // Total number of pages
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      </Grid>
    </div>
  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    border: "1px solid #ccc",
  },
  tableHeader: {
    backgroundColor: "#003366",
    color: "#fff",
    textAlign: "left",
  },
  selectButton: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
    marginRight: "5px",
    transition: "background-color 0.3s ease",
  },
  noData: {
    textAlign: "center",
    color: "#999",
    fontStyle: "italic",
  },
  loading: {
    textAlign: "center",
    color: "#007bff",
  },
  error: {
    textAlign: "center",
    color: "#dc3545",
  },
};
export default ProductsList;
