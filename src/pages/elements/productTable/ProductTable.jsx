import React from "react";
import { useTranslation } from "react-i18next";
const ProductTable = ({ onEdit, onDelete, products }) => {
  const { t } = useTranslation();
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
    <div className="scrollbar overflow-x-auto">
      <table style={styles.table}>
        <thead style={styles.tableHeader}>
          <tr>
            {t("ProductsPage.table", { returnObjects: true }).map(
              (item, key) => (
                <th key={key}>{item}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {products?.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                {fields.map((field) => (
                  <td key={field}>
                    {field === "price"
                      ? `$${product[field]?.toFixed(2) || "0.00"}`
                      : field === "category"
                      ? product.category.name
                      : product[field] || "-"}
                  </td>
                ))}
                {/* Display supplier and id */}
                <td>{product.supplier || "-"}</td>
                <td>{product._id || "-"}</td>
                <td className="flex gap-5">
                  <button
                    onClick={() => onEdit(product)}
                    style={styles.editButton}
                    aria-label={`Edit ${product.name || "product"}`}>
                    {t("ProductsPage.editButton")}
                  </button>
                  <button
                    onClick={() => onDelete(product._id)}
                    style={styles.deleteButton}
                    aria-label={`Delete ${product.name || "product"}`}>
                    {t("ProductsPage.deleteButton")}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={fields.length + 3} style={styles.noData}>
                {t("ProductsPage.noFound")}
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
