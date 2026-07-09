import { describe, expect, it } from "vitest";
import { createProduct, updateProduct, validateProductForm } from "@/modules/products/productService";

describe("productService", () => {
  it("returns validation errors for invalid payload", () => {
    const errors = validateProductForm({ title: "", price: 0, description: "short" });

    expect(errors.title).toBeDefined();
    expect(errors.price).toBeDefined();
    expect(errors.description).toBeDefined();
  });

  it("creates and updates product", () => {
    const created = createProduct(
      { title: "Notebook", price: 50, description: "A useful daily engineering notebook" },
      () => "product-1"
    );

    const updated = updateProduct(
      [created],
      "product-1",
      { title: "Notebook Pro", price: 55, description: "A useful daily engineering notebook pro" }
    );

    expect(updated[0].title).toBe("Notebook Pro");
    expect(updated[0].price).toBe(55);
  });
});
