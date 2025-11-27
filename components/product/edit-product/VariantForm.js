'use client';

import { Button } from '@/components/ui/button';

export function VariantForm({
  onSubmit,
  register,
  handleSubmit,
  errors,
  variantColors,
  onCancel,
}) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            <p className="text-red-500 text-xs">Alt content is required</p>
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
          <label className="block text-sm font-medium mb-1">Variant Name</label>
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
          <label className="block text-sm font-medium mb-1">Price</label>
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
        <Button type="submit" className="text-xs">
          Add Variant
        </Button>
      </div>
    </form>
  );
}
