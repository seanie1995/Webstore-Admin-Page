"use client";
import { CreateProduct } from "@/lib/actions";
import Form from "next/form";
import { useRouter } from "next/navigation";

const CreateForm = () => {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      await CreateProduct(formData);

      router.back;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      action={handleSubmit}
      className="grid  bg-neutral-200 border-neutral-400 p-12 rounded-xl"
    >
      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center bg-neutral-200 border-neutral-400 p-12 rounded-xl ">
        <label className="font-semibold" htmlFor="title">
          Title
        </label>
        <input
          className="border p-2 bg-white"
          type="text"
          id="title"
          name="title"
          minLength={3}
          maxLength={20}
          required
        />
        <label className="font-semibold" htmlFor="brand">
          Brand
        </label>
        <input
          className="border p-2 bg-white"
          type="text"
          id="brand"
          name="brand"
          required
        />
        <label className="font-semibold" htmlFor="price">
          Price
        </label>
        <input
          className="border p-2 bg-white "
          type="number"
          min="0.5"
          step="0.01"
          id="price"
          name="price"
          required
        />
        <label className="font-semibold" htmlFor="stock">
          Stock
        </label>
        <input
          className="border p-2 bg-white"
          type="number"
          id="stock"
          name="stock"
          required
        />
        <label className="font-semibold" htmlFor="categoryId">
          Category ID
        </label>
        <input
          className="border p-2 bg-white"
          type="number"
          id="categoryId"
          name="categoryId"
          required
        />
        <label className="font-semibold" htmlFor="description">
          Description
        </label>
        <textarea
          className="border p-2 bg-white"
          id="description"
          name="description"
          minLength={5}
          maxLength={400}
          required
        />
        <label className="font-semibold" htmlFor="thumbnail">
          Thumbnail
        </label>
        <input
          className="border p-2 bg-white"
          type="url"
          id="thumbnail"
          name="thumbnail"
          required
        />
      </div>
      <div className="grid-rows-2 flex flex-row justify-evenly">
        <button
          type="submit"
          className="text-black w-1/3 bg-green-400 py-2 rounded-xl hover:bg-green-600 transition-all hover:cursor-pointer "
        >
          Save
        </button>

        <button
          type="button"
          onClick={router.back}
          className="text-black w-1/3  bg-red-400 py-2 rounded-xl hover:bg-red-600 transition-all hover:cursor-pointer "
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
