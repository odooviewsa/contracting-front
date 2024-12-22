import React from "react";

const ProductTable = ({ onEdit, onDelete, products }) => {
  // Fields we want to display
  const fields = [
    "sku",
    "name",
    "category",
    "price",
    "quantity",
    "uom",
    "description",
  ];

  return (
    <div>
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
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                {fields.map((field) => (
                  <td key={field}>
                    {field === "price"
                      ? `$${product[field]?.toFixed(2) || "0.00"}`
                      : product[field] || "-"}
                  </td>
                ))}
                {/* Display supplier and id */}
                <td>{product.supplier || "-"}</td>
                <td>{product._id || "-"}</td>
                <td>
                  <button
                    onClick={() => onEdit(product)}
                    style={styles.editButton}
                    aria-label={`Edit ${product.name || "product"}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product._id)}
                    style={styles.deleteButton}
                    aria-label={`Delete ${product.name || "product"}`}
                  >
                    Delete
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
  editButton: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
    marginRight: "5px",
    transition: "background-color 0.3s ease",
  },
  deleteButton: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
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

export default ProductTable;
