'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { apiFetch, IMAGE_BASE_URL } from '@/lib/api';
import { Edit, Plus } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function EditProduct() {
  const { p_id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [products, setProducts] = useState([]);
  const [productCatTypes, setProductCatTypes] = useState([]);
  const [productSubcategories, setProductSubcategories] = useState([]);
  const [file, setFile] = useState(null);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [variantColors, setVariantColors] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,

    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      product_id: '',
      keywords: '',
      meta_title: '',
      meta_desc: '',
      product_name: '',
      product_details: '',
      category_id_fk: '',
      subcat_id_fk: '',
      is_youtube_video: '',
      youtube_video_url: '',
      youtube_video_id: '',
      in_stock: '',
      is_featured: '',
      alt_content: '',
      is_deleted: 0,
    },
  });

  const watchCategory = watch('category_id_fk');
  const watchSubCategory = watch('subcat_id_fk');

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await apiFetch('/get-product', {
          cache: 'no-store',
          method: 'POST',
          body: JSON.stringify({ product_id: p_id }),
        });
        if (res?.data) {
          reset(res.data);
          if (res?.data?.category_id_fk) {
            await fetchSubcategories(res.data.category_id_fk);
          }
          setInitialDataLoaded(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [p_id, reset]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiFetch('/get-product-cate', {
          cache: 'no-store',
          method: 'POST',
        });

        if (res?.data) setProductCatTypes(res.data.categories || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (!initialDataLoaded) return;
    fetchSubcategories(watchCategory);
  }, [watchCategory, initialDataLoaded]);

  const fetchSubcategories = async (categoryId) => {
    if (!categoryId) return;
    try {
      const res = await apiFetch('/subcategories-by-category', {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({ category_id: Number(categoryId) }),
      });

      if (res?.data?.data && Array.isArray(res.data.data)) {
        setProductSubcategories(res.data.data);
      } else {
        setProductSubcategories([]);
      }
    } catch {
      setProductSubcategories([]);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await apiFetch('/get-all-colors', {
          method: 'POST',
          cache: 'no-store',
        });

        if (res?.status) {
          setVariantColors(res?.data?.colors || []);
        } else {
          toast.error(res?.message);
        }
      } catch (error) {
        toast.error(error?.message);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await apiFetch('/product-variant', {
          method: 'POST',
          cache: 'no-store',
          body: JSON.stringify({ product_id: p_id }),
        });
        if (res) {
          setProducts(res?.data || []);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    loadData();
  }, [p_id]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      // Text fields
      formData.append('product_id', data.product_id);
      formData.append('youtube_video_url', data.youtube_video_url || '');
      formData.append('youtube_video_id', data.youtube_video_id ?? '');
      formData.append('keywords', data.keywords || '');
      formData.append('meta_title', data.meta_title || '');
      formData.append('meta_desc', data.meta_desc || '');
      formData.append('product_name', data.product_name || '');
      formData.append('product_details', data.product_details || '');
      formData.append('category_id_fk', data.category_id_fk || '');
      formData.append('subcat_id_fk', data.subcat_id_fk || '');
      formData.append('alt_content', data.alt_content || '');
      formData.append('user_id', userId || '');

      formData.append('is_deleted', Number(data.is_deleted));
      formData.append('in_stock', Number(data.in_stock));
      formData.append('is_featured', Number(data.is_featured));
      formData.append('is_youtube_video', data.is_youtube_video);

      // File
      if (file) {
        formData.append('product_image', file);
      }

      const res = await apiFetch('/update-product', {
        method: 'POST',
        cache: 'no-store',
        body: formData,
      });
      console.log(res);
      if (res?.status === true) {
        toast.success(res.message);
        router.push('/products');
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // add variant submit
  const onAdd = async (data) => {
    const body = new FormData();
    body.append('product_id_fk', p_id);
    body.append('p_v_name', data.variant_name);
    body.append('product_weight', data.variant_weight);
    body.append('product_original_price', data.original_price);
    body.append('product_price', data.price);
    body.append('discount_percent', data.discount);
    body.append('total_quantity', data.total_qty);
    body.append('available_quantity', data.available_qty);
    body.append('color_id_fk', data.variant_color);
    body.append('rimg_alt_content', data.rimg_alt_content);

    // Files
    if (data.image_path && data.image_path.length > 0) {
      for (const file of data.image_path) {
        body.append('image_path', file);
      }
    }

    try {
      const res = await apiFetch('/store-product-variant', {
        method: 'POST',
        cache: 'no-store',
        body,
      });
      console.log(res);
      if (res?.status === true) {
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="border-b">
          <CardTitle>Edit Product</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Image Upload + Alt Content */}
            <div className="flex justify-center items-center gap-3 w-full">
              <div className="flex flex-col md:flex-row justify-center items-center border rounded-lg overflow-hidden h-32 w-2/5 relative">
                {file ? (
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    width={120}
                    height={120}
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src={`${IMAGE_BASE_URL}/${watch('product_image') || ''}`}
                    alt="Preview"
                    width={120}
                    height={120}
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center w-full">
                <Label className="mb-1 text-sm font-medium">Alt Content</Label>
                <Textarea
                  placeholder="Enter Alt Content"
                  {...register('alt_content')}
                  className="w-full h-24"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <Label className="mb-1 text-sm font-medium">Select Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="w-full cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium">Keywords</label>
                <Input placeholder="Enter keywords" {...register('keywords')} />
              </div>

              <div>
                <label className="text-sm font-medium">Meta Title</label>
                <Input
                  placeholder="Enter meta title"
                  {...register('meta_title')}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Meta Description</label>
                <Input
                  placeholder="Enter meta description"
                  {...register('meta_desc')}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Product Title</label>
                <Input
                  placeholder="Enter Product Title"
                  {...register('product_name', { required: true })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Select Category</Label>
                <select
                  {...register('category_id_fk')}
                  className="form-control w-full"
                  onChange={async (e) => {
                    const selectedCat = e.target.value;
                    setValue('category_id_fk', selectedCat);
                    setValue('subcat_id_fk', '');
                    await fetchSubcategories(selectedCat);
                  }}
                  value={watchCategory || ''}
                >
                  <option value="Select Category">Select Category</option>
                  {productCatTypes?.map((pc_type) => (
                    <option
                      key={pc_type.p_category_id}
                      value={pc_type.p_category_id}
                    >
                      {pc_type.p_category_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2">
                <Label>Select Sub Category</Label>
                <select
                  {...register('subcat_id_fk')}
                  className="form-control w-full"
                  onChange={(e) => {
                    const selectedSub = e.target.value;
                    setValue('subcat_id_fk', selectedSub);
                  }}
                  value={watchSubCategory || ''}
                >
                  <option value="">Select Subcategory</option>
                  {productSubcategories?.length > 0 ? (
                    productSubcategories.map((subcat) => (
                      <option key={subcat.s_cat_id} value={subcat.s_cat_id}>
                        {subcat.p_sub_category_name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No Subcategories</option>
                  )}
                </select>
              </div>

              <div className="grid gap-2">
                <label className="block font-medium">Youtube Video</label>
                <select
                  className="form-control w-full"
                  value={watch('is_youtube_video') ?? ''}
                  onChange={(e) =>
                    setValue('is_youtube_video', Number(e.target.value))
                  }
                >
                  <option value="">Select</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label>Youtube Video URL</Label>
                <Input placeholder="URL" {...register('youtube_video_url')} />
              </div>

              <div className="grid gap-2">
                <Label>Youtube Video ID</Label>
                <Input
                  placeholder="Video ID"
                  {...register('youtube_video_id')}
                />
              </div>
              <div className="grid gap-2">
                <label className="block font-medium">In Stock</label>
                <Controller
                  name="in_stock"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="form-control w-full"
                      value={field.value ? 'true' : 'false'}
                      onChange={(e) =>
                        field.onChange(e.target.value === 'true')
                      }
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <label className="block font-medium">Featured</label>
                <Controller
                  name="is_featured"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="form-control w-full"
                      value={field.value ? 'true' : 'false'}
                      onChange={(e) =>
                        field.onChange(e.target.value === 'true')
                      }
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  )}
                />
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Controller
                  name="is_deleted"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={!field.value}
                        onChange={(e) => field.onChange(!e.target.checked)}
                      />
                      {!field.value ? 'Active' : 'Deactive'}
                    </label>
                  )}
                />
              </div>
              <Button type="submit">Update Product</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Product Variants Table */}
      <Card className="border rounded-md shadow-sm mt-6">
        <CardHeader className="border-b py-2 flex justify-between items-center">
          <CardTitle>Product Variants</CardTitle>

          {/* Add Variant Button (DialogTrigger) */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="button-relative group ">
                <span className="button-absolute group-hover:opacity-0">
                  Add
                </span>
                <Plus
                  size={18}
                  className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-green-500"
                />
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl w-full">
              <DialogHeader>
                <DialogTitle>Add Variant</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit(onAdd)}>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {/* Variant Images */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Variant Images
                    </label>
                    <input
                      type="file"
                      multiple
                      {...register('image_path', { required: true })}
                      className="form-control file-control"
                    />
                  </div>

                  {/* Variant Alt Content */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Variant Alt Content
                    </label>
                    <input
                      type="text"
                      {...register('rimg_alt_content', { required: true })}
                      placeholder="Enter Alt Content"
                      className="form-control"
                    />
                    {errors.rimg_alt_content && (
                      <p className="text-red-500 text-xs">
                        Alt content is required
                      </p>
                    )}
                  </div>

                  {/* Variant Color */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Variant Color
                    </label>
                    <select
                      {...register('variant_color', { required: true })}
                      className="form-control"
                    >
                      <option value="">Select Color</option>
                      {variantColors?.map((v_color) => (
                        <option key={v_color.color_id} value={v_color.color_id}>
                          {v_color.color_name}
                        </option>
                      ))}
                    </select>
                    {errors.variant_color && (
                      <p className="text-red-500 text-xs">Color is required</p>
                    )}
                  </div>

                  {/* Variant Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Variant Name
                    </label>
                    <input
                      type="text"
                      {...register('variant_name', { required: true })}
                      placeholder="Enter Variant Name"
                      className="form-control"
                    />
                  </div>

                  {/* Variant Weight */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Variant Weight (Grams)
                    </label>
                    <input
                      type="number"
                      {...register('variant_weight', { required: true })}
                      placeholder="Enter Weight"
                      className="form-control"
                    />
                  </div>

                  {/* Original Price */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Original Price
                    </label>
                    <input
                      type="number"
                      {...register('original_price', { required: true })}
                      placeholder="Enter Original Price"
                      className="form-control"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      {...register('price', { required: true })}
                      placeholder="Enter Price"
                      className="form-control"
                    />
                  </div>

                  {/* Discount */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Discount Percent (%)
                    </label>
                    <input
                      type="number"
                      {...register('discount', { required: true })}
                      placeholder="Enter Discount"
                      className="form-control"
                    />
                  </div>

                  {/* Total Quantity */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Total Quantity
                    </label>
                    <input
                      type="number"
                      {...register('total_qty', { required: true })}
                      placeholder="Enter Total Quantity"
                      className="form-control"
                    />
                  </div>

                  {/* Available Quantity */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Available Quantity
                    </label>
                    <input
                      type="number"
                      {...register('available_qty', { required: true })}
                      placeholder="Enter Available Quantity"
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="modal-footer mt-4 flex justify-end gap-3">
                  <Button
                    variant="outline"
                    type="button"
                    className="deActive-btn text-xs"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="add-btn text-xs">
                    Add Variant
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto table_scroll">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Available Quantity</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products?.map((p) => (
                    <tr key={p.p_v_id} className="border-t">
                      <td>{p.p_v_id || '--'}</td>
                      <td>{p.p_v_name || '--'}</td>
                      <td>{p.final_price || '--'}</td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded text-xs
                          `}
                        >
                          {p.available_quantity || '--'}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded text-xs border ${
                            p.is_deleted == false ? 'active' : 'deactive'
                          }`}
                        >
                          {p.is_deleted == false ? 'Active' : 'Deactive'}
                        </span>
                      </td>
                      <td className="text-center">
                        <Link
                          href={`/products/edit-product/${p_id}/edit-prod-variant/${p.p_v_id}`}
                          className="button-relative group"
                        >
                          <span className="button-absolute group-hover:opacity-0">
                            Edit
                          </span>
                          <Edit
                            size={18}
                            className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-sky-500"
                          />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center p-4">
                      No variants found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
