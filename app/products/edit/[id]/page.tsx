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

  return (
    <>
      <EditForm product={product} categories={categories} />
    </>
  );
};

export default EditPage;
