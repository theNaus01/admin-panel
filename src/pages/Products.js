import React, { useEffect, useState } from "react";
import { getProducts, addProduct, deleteProduct } from "../firebase";
import { Button, TextField, Typography, Paper, Box } from "@mui/material";

// Předpřipravené pole pro informace k produktu
function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: 0,
    sku: "",
    quantity: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  const handleAddProduct = async () => {
    await addProduct(newProduct);
    setProducts([...products, newProduct]); // Aktualizuje se / Přidá se produkt do seznamu
    setNewProduct({ name: "", category: "", price: 0, sku: "", quantity: 0 }); // Vymaže se pole pro další přidání
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product.id !== id)); // Aktualizuje se seznam produktů po odstranění jednoho z nich
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Product Inventory
      </Typography>
      <Paper sx={{ padding: "1rem", marginBottom: "1rem" }}>
        <Typography variant="h6">Add New Product</Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
          }
        />
        <TextField
          label="SKU"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newProduct.sku}
          onChange={(e) =>
            setNewProduct({ ...newProduct, sku: e.target.value })
          }
        />
        <TextField
          label="Quantity"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={newProduct.quantity}
          onChange={(e) =>
            setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })
          }
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddProduct}
          sx={{ marginTop: "1rem" }}>
          Add Product
        </Button>
      </Paper>

      <Paper sx={{ padding: "1rem" }}>
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}>
            <Box>
              <Typography variant="subtitle1">{product.name}</Typography>
              <Typography variant="body2">Price: {product.price} Kč</Typography>
              <Typography variant="body2">SKU: {product.sku}</Typography>
              <Typography variant="body2">
                Quantity: {product.quantity}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </Button>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}

export default Products;
