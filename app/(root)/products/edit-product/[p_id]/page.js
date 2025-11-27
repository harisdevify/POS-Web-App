'use client';

import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ProductForm } from '@/components/product/edit-product/ProductForm';
import { VariantForm } from '@/components/product/edit-product/VariantForm';
import { VariantsTable } from '@/components/product/edit-product/VariantsTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { apiFetch } from '@/lib/api';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function EditProduct() {
  const { p_id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // State
  const [products, setProducts] = useState([]);
  const [productCatTypes, setProductCatTypes] = useState([]);
  const [productSubcategories, setProductSubcategories] = useState([]);
  const [file, setFile] = useState(null);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [variantColors, setVariantColors] = useState([]);
  const [openVariantPopup, setOpenVariantPopup] = useState(false);

  // Form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
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

  // Variant Form
  const {
    register: registerVariant,
    handleSubmit: handleSubmitVariant,
    reset: resetVariant,
    formState: { errors: errorsVariant },
  } = useForm();

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

  // Fetch subcategories
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

  // Fetch variant colors
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

  // Fetch product variants
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

  // Submit product form
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

  // Add variant submit
  const onAddVariant = async (data) => {
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

      if (res?.status === true) {
        toast.success(res.message);
        setOpenVariantPopup(false);
        router.refresh();
        // Refresh variants list
        const variantsRes = await apiFetch('/product-variant', {
          method: 'POST',
          cache: 'no-store',
          body: JSON.stringify({ product_id: p_id }),
        });
        if (variantsRes) {
          setProducts(variantsRes?.data || []);
        }
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Product Form Card */}
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="border-b">
          <CardTitle>Edit Product</CardTitle>
        </CardHeader>

        <CardContent>
          <ProductForm
            onSubmit={onSubmit}
            register={register}
            control={control}
            watch={watch}
            setValue={setValue}
            errors={errors}
            handleSubmit={handleSubmit}
            file={file}
            setFile={setFile}
            productCatTypes={productCatTypes}
            productSubcategories={productSubcategories}
            fetchSubcategories={fetchSubcategories}
            initialData={watch()}
          />
        </CardContent>
      </Card>

      {/* Variants Card */}
      <Card className="border rounded-md shadow-sm mt-6">
        <CardHeader className="border-b py-2 flex justify-between items-center">
          <CardTitle>Product Variants</CardTitle>

          <Dialog open={openVariantPopup} onOpenChange={setOpenVariantPopup}>
            <DialogTrigger asChild onClick={() => setOpenVariantPopup(true)}>
              <button className="button-relative group">
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

              <VariantForm
                onSubmit={onAddVariant}
                register={registerVariant}
                handleSubmit={handleSubmitVariant}
                errors={errorsVariant}
                variantColors={variantColors}
                onCancel={() => resetVariant()}
              />
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <VariantsTable
            products={products}
            productId={p_id}
            onAddVariant={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  );
}
