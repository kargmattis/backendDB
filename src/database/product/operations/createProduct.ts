import Product from "../product";

export async function createProduct(): Promise<void> {
  try {
    const newProduct = await Product.create({
      title: "Orangenmenü",
      price: 5.99,
      image: ""
    });
  } catch (error) {
    console.error("Error creating product:", error);
  }
}
