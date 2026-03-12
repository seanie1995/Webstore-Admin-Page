import CreateForm from "@/components/product-form-components/create-form";
import { FetchAllCategories } from "@/lib/actions";

const CreateProduct = async () => {
  const today = new Date();

  const categories = await FetchAllCategories();

  console.log(categories);

  const formattedDate = today.toLocaleDateString();
  return (
    <main className="p-8">
      <header className="flex flex-row justify-between align-middle mb-8">
        <span className="text-4xl">Add Product</span>
        <span className="text-2xl ">{formattedDate}</span>
      </header>
      <CreateForm categories={categories} />
    </main>
  );
};

export default CreateProduct;
