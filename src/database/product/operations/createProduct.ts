import { errorChecking } from "../../../utilities/errorChecking";
import Product from "../product";

export async function createProduct(): Promise<Product> {
  try {
    const newProduct = await Product.create({
      title: "Orangenmenü 1",
      price: 5.99,
      image: ""
    });
    return newProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw errorChecking(error);
  }
}
