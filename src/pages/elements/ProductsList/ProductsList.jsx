import { Grid, Pagination, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { axiosInstance, url } from "../../../axios/axios";
import { useTranslation } from "react-i18next";

const ProductsList = ({ onSelect }) => {
  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);
  // Language
  const { t } = useTranslation();
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
        let urlNew = `/api/products`;
        if (page) {
          urlNew = `/api/products?page=${page}`;
        }
        const response = await axiosInstance.get(urlNew);
        if (!response) {
          throw new Error("Failed to fetch products");
        }
        setData(response.data);
        setProducts(response.data.products);
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
  const fields = ["sku", "name", "category", "price", "uom", "quantity"];
  return (
    <div className="w-full">
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ my: 3 }}>
        <TextField
          label={t("ProductsList.searchBar")}
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
      <div className="scrollbar overflow-x-auto">
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              {t("ProductsList.table", { returnObjects: true }).map(
                (item, key) => (
                  <th key={key}>{item}</th>
                )
              )}
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
                      aria-label={`Edit ${product.name || "product"}`}>
                      {t("ProductsList.selectButton")}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={fields.length + 3} style={styles.noData}>
                  {t("ProductsList.noFound")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Grid
        container
        alignItems="center"
        justifyContent={"center"}
        sx={{ mt: 3 }}>
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
