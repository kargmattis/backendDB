import Product from "./product";

export async function createProduct(): Promise<void> {
  try {
    const newProduct = await Product.create({
      name: "Product Name",
      price: 100.0,
      hello: "Hello World"
    });
    await Product.findOne({ where: { id: newProduct.id } });
    console.log(`Product created with ID: ${newProduct.id}`);
  } catch (error) {
    console.error("Error creating product:", error);
  }
}
