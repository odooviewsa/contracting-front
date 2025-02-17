import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import { v4 as uuidv4 } from "uuid";
import ProductTable from "../productTable/ProductTable";
import ProductForm from "../productForm/ProductForm";
import { useEffect } from "react";
import { Grid, Pagination } from "@mui/material";

import { url } from "../../../axios/axios";

const ProductsManagement = () => {
  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    supplier: "",
  });
  // Pagination state
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let urlNew = `${url}/api/products`;
        if (page) {
          urlNew = `${url}/api/products?page=${page}`;
        }
        const response = await fetch(urlNew, {
          credentials: "include",
        });
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

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsFormVisible(true);
  };
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsFormVisible(true);
  };

  const handleDeleteProduct = async (productId) => {
    const res = await fetch(`${url}/api/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.ok) {
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
    // setData(products.filter((product) => product.id !== productId));
  };

  const handleFormSubmit = async (product) => {
    if (!product._id) {
      const res = await fetch(`${url}/api/products`, {
        method: "POST",
        body: JSON.stringify({ ...product }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.ok) {
        setIsFormVisible(false);
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      }
    } else {
      const res = await fetch(`${url}/api/v1/products/${product._id}`, {
        method: "PUT",
        body: JSON.stringify({ ...product }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setIsFormVisible(false);
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  return (
    <div style={styles.container}>
      <div style={styles.actions}>
        <Link to="/" style={styles.backLink} aria-label="Go back to main menu">
          &larr; Back to Main Menu
        </Link>
        <button
          onClick={handleAddProduct}
          style={styles.addButton}
          aria-label="Add a new product"
        >
          + Add Product
        </button>
      </div>
      <div style={styles.filterContainer}>
        <div style={styles.filterGroup}>
          <div style={styles.filterItem}>
            <label style={styles.label} htmlFor="name">
              <i className="fas fa-search" style={styles.icon}></i> Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Search by name"
              value={filters.name}
              onChange={handleFilterChange}
              style={styles.input}
            />
          </div>
          <div style={styles.filterItem}>
            <label style={styles.label} htmlFor="category">
              <i className="fas fa-tags" style={styles.icon}></i> Category
            </label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              style={styles.select}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Clothing">Clothing</option>
            </select>
          </div>
          <div style={styles.filterItem}>
            <label style={styles.label} htmlFor="supplier">
              <i className="fas fa-user" style={styles.icon}></i> Supplier
            </label>
            <select
              id="supplier"
              name="supplier"
              value={filters.supplier}
              onChange={handleFilterChange}
              style={styles.select}
            >
              <option value="">All Suppliers</option>
              <option value="Supplier A">Supplier A</option>
              <option value="Supplier B">Supplier B</option>
              <option value="Supplier C">Supplier C</option>
            </select>
          </div>
        </div>
        <button style={styles.searchButton} aria-label="Apply filters">
          <i className="fas fa-filter" style={styles.searchIcon}></i> Search
        </button>
      </div>
      <ProductTable
        products={filteredProducts}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
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
      {isFormVisible && (
        <div style={styles.overlay}>
          <div style={styles.formContainer}>
            <ProductForm
              product={selectedProduct}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsFormVisible(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    background: "#f4f6f9",
    minHeight: "100vh",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  backLink: {
    color: "#007bff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  addButton: {
    background: "#28a745",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
    marginLeft: "auto",
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: "15px",
    margin: "20px 0",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
  },
  filterGroup: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    alignItems: "center",
    flexGrow: 1,
  },
  filterItem: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 200px",
    gap: "5px",
  },
  label: {
    fontSize: "14px",
    color: "#333",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  icon: {
    fontSize: "14px",
    color: "#666",
  },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  select: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  searchButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    transition: "background-color 0.2s",
  },
  searchIcon: {
    fontSize: "16px",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  formContainer: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    maxWidth: "500px",
    width: "100%",
  },
};

export default ProductsManagement;

// PropType validation
ProductTable.propTypes = {
  products: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

ProductForm.propTypes = {
  product: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
