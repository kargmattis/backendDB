import Product from "./product";

export async function createProduct() {
  try {
    const newProduct = await Product.create({
      name: "Product Name", // Produktname
      price: 100.0, // Produktpreis
    });

    console.log(`Product created with ID: ${newProduct.id}`);
  } catch (error) {
    console.error("Error creating product:", error);
  }
}
