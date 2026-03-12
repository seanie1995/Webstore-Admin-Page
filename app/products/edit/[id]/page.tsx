import { Product } from "@/app/types";
import EditForm from "@/components/product-form-components/edit-form";
import { FetchSingleProductById } from "@/lib/actions";
import { FetchAllCategories } from "@/lib/actions";

type EditPageProps = {
  params: {
    id: string;
  };
};

const EditPage = async ({ params }: EditPageProps) => {
  const { id } = await params;

  const product: Product = await FetchSingleProductById(id);
  const categories = await FetchAllCategories();

  const today = new Date();
  const formattedDate = today.toLocaleDateString();

  return (
    <main className="p-8">
      <header className="flex flex-row justify-between align-middle mb-8">
        <span className="text-4xl">Edit Product</span>
        <span className="text-2xl">{formattedDate}</span>
      </header>
      <EditForm product={product} categories={categories} />
    </main>
  );
};

export default EditPage;
