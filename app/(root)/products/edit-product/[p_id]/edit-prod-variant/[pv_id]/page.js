'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { apiFetch, IMAGE_BASE_URL } from '@/lib/api';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

export default function ProductVariant({ params }) {
  const { pv_id } = use(params);
  const [variantColors, setVariantColors] = useState([]);
  const [variantImages, setVariantImages] = useState([]);
  const router = useRouter();
  const { register, reset, handleSubmit, control } = useForm({
    defaultValues: {
      product_id_fk: '',
      pv_id: '',
      p_v_name: '',
      product_weight: '',
      purchase_price: '',
      sale_price: '',
      discount_percent: 0,
      total_quantity: 0,
      available_quantity: 0,
      variant_color: '',
      in_stock: 0,
      is_deleted: 0,
    },
  });

  const watchFiles = useWatch({ control, name: 'image_path' });

  // Fetch variant details
  const loadVariant = async () => {
    try {
      const res = await apiFetch('/product-variant-by-id', {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({ p_v_id: pv_id }),
      });
      if (res?.data) {
        const d = res.data;
        reset({
          product_id_fk: d.product_id_fk || '',
          p_v_id: d.p_v_id || '',
          p_v_name: d.p_v_name || '',
          product_weight: d.product_weight || '',
          purchase_price: d.product_original_price || '',
          sale_price: d.product_price || '',
          discount_percent: d.discount_percent || 0,
          total_quantity: d.total_quantity || 0,
          available_quantity: d.available_quantity || 0,
          variant_color: d.color_id_fk || '',
          in_stock: Number(d.in_stock),
          is_deleted: Number(d.is_deleted),
        });

        setVariantImages(d.bm_product_images || []);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load variant data');
    }
  };

  useEffect(() => {
    loadVariant();
  }, [pv_id, reset]);

  // Fetch colors
  useEffect(() => {
    const loadColors = async () => {
      try {
        const res = await apiFetch('/get-all-colors', {
          method: 'POST',
          cache: 'no-store',
        });
        if (res?.status) {
          setVariantColors(res?.data?.colors || []);
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to load colors');
      }
    };
    loadColors();
  }, []);

  const onSubmit = async (data) => {
    console.log('data:', data);
    const body = new FormData();

    body.append('product_id_fk', data.product_id_fk);
    body.append('p_v_id', data.p_v_id);
    body.append('p_v_name', data.p_v_name);
    body.append('product_weight', data.product_weight);
    body.append('product_price', data.sale_price);
    body.append('product_original_price', data.purchase_price);
    body.append('discount_percent', data.discount_percent);
    body.append('total_quantity', data.total_quantity);
    body.append('available_quantity', data.available_quantity);
    body.append('color_id_fk', data.variant_color);
    body.append('in_stock', Number(data.in_stock));
    body.append('is_deleted', Number(data.is_deleted));

    if (variantImages.length > 0 && data.rimg_alt_content) {
      Object.entries(data.rimg_alt_content).forEach(([index, alt]) => {
        const img = variantImages[index];
        if (img?.p_img_id) {
          body.append('p_img_id[]', img.p_img_id);
          body.append('rimg_alt_content[]', alt || '');
        }
      });
    }

    // New uploaded files + their alt
    if (data.image_path && data.image_path.length > 0) {
      const newAltArray =
        data.new_alt_content && typeof data.new_alt_content === 'object'
          ? Object.values(data.new_alt_content)
          : [];

      for (let i = 0; i < data.image_path.length; i++) {
        body.append('image_path', data.image_path[i]);
        body.append('new_alt_content[]', newAltArray[i] || '');
      }
    }

    try {
      const res = await apiFetch('/update-varient', {
        method: 'POST',
        cache: 'no-store',
        body,
      });
      if (res?.status === true) {
        toast.success(res.message);
        await loadVariant();
        router.push(`/products/edit-product/${data.product_id_fk}`);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleDeleteImage = async (p_img_id) => {
    try {
      const res = await apiFetch(`/delete-varient-images`, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({ p_img_id }),
      });
      if (res?.message) {
        toast.success(res.message);
        setVariantImages((prev) =>
          prev.filter((img) => img.p_img_id !== p_img_id)
        );
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error('Error deleting variant image');
    }
  };

  return (
    <section className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Images Card */}
        <Card>
          <CardHeader>
            <CardTitle>Product Variant Images</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
              {variantImages.map((variantImag, index) => (
                <div
                  key={variantImag.p_img_id}
                  className="group relative rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  <div className="relative w-full h-40 ">
                    <Image
                      src={`${IMAGE_BASE_URL}/${variantImag.image_path}`}
                      alt={variantImag.rimg_alt_content}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(variantImag.p_img_id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 "
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="p-2 border-t">
                    <Textarea
                      {...register(`rimg_alt_content.${index}`)}
                      defaultValue={variantImag.rimg_alt_content}
                      rows={1}
                      className="text-xs"
                    />

                    <input
                      type="hidden"
                      {...register(`p_img_id.${index}`)}
                      value={variantImag.p_img_id}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Upload Section */}
            <div className="my-6">
              <label className="block text-sm font-medium mb-2">
                Add New Images
              </label>

              <Input type="file" multiple {...register('image_path')} />

              {watchFiles && watchFiles.length > 0 && (
                <div className="mt-3 space-y-1">
                  {Array.from(watchFiles).map((file, i) => (
                    <Input
                      key={i}
                      type="text"
                      placeholder={`Alt text for ${file.name}`}
                      {...register(`new_alt_content.${i}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Edit Product Variant Details</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Variant Color */}
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Variant Color
                </label>

                <Controller
                  name="variant_color"
                  control={control}
                  render={({ field }) => (
                    <select
                      className="w-full border rounded-md p-2"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    >
                      <option value="">Select Color</option>
                      {variantColors.map((color) => (
                        <option key={color.color_id} value={color.color_id}>
                          {color.color_name}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>

              {/* Variant Name */}
              <div>
                <label className="block mb-1">Variant Name</label>
                <Input {...register('p_v_name')} />
              </div>

              <div>
                <label className="block mb-1">Variant Weight (Grams)</label>
                <Input type="number" {...register('product_weight')} />
              </div>

              <div>
                <label className="block mb-1">Purchase Price</label>
                <Input type="number" {...register('purchase_price')} />
              </div>

              <div>
                <label className="block mb-1">Sale Price</label>
                <Input type="number" {...register('sale_price')} />
              </div>

              <div>
                <label className="block mb-1">Discount (%)</label>
                <Input type="number" {...register('discount_percent')} />
              </div>

              <div>
                <label className="block mb-1">Total Quantity</label>
                <Input type="number" {...register('total_quantity')} />
              </div>

              <div>
                <label className="block mb-1">Available Quantity</label>
                <Input type="number" {...register('available_quantity')} />
              </div>

              {/* In Stock */}
              <div>
                <label className="block mb-1">In Stock</label>

                <Controller
                  name="in_stock"
                  control={control}
                  render={({ field }) => (
                    <select
                      className="w-full border rounded-md p-2"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    >
                      <option value="">Select</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-6">
              {/* Active / Deactive */}
              <Controller
                name="is_deleted"
                control={control}
                render={({ field }) => (
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={!field.value}
                      onChange={(e) => field.onChange(!e.target.checked)}
                    />
                    {!field.value ? 'Active' : 'Deactive'}
                  </label>
                )}
              />

              <Button type="submit">Update Variant</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </section>
  );
}
