import { apiFetch } from '@/lib/api';

export const productAPI = async ({ page = 1, per_page = 10, search = '' }) => {
  return apiFetch('/get-all-product', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({
      page,
      per_page,
      search,
    }),
  });
};

export function subCateAPI({ page = 1 }) {
  return apiFetch('/get-product-sub-cate', {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify({ page }),
  });
}

export function getBanner({ page = 1 }) {
  return apiFetch('/get-banner-sliders', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({ page }),
  });
}

export function getProduct(product_id) {
  return apiFetch('/get-product', {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify({ product_id }),
  });
}

export function subCatbyCat(categoryId) {
  return apiFetch('/subcategories-by-category', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({ category_id: Number(categoryId) }),
  });
}

export function updateProdct(formData) {
  return apiFetch('/update-product', {
    method: 'POST',
    cache: 'no-store',
    body: formData,
  });
}

export function productVar(product_id) {
  return apiFetch('/product-variant', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({ product_id }),
  });
}

export function storeProduct(body) {
  return apiFetch('/store-product-variant', {
    method: 'POST',
    cache: 'no-store',
    body,
  });
}

export function addProducts(formData) {
  return apiFetch('/add-products', {
    method: 'POST',
    body: formData,
  });
}

export function getColors() {
  return apiFetch('/get-all-colors', { method: 'POST', cache: 'no-store' });
}

export function updatePromImg(payload) {
  return apiFetch('/update-promotional-image', {
    method: 'POST',
    cache: 'no-store',
    body: payload,
  });
}

export function getSingleProm(pi_id) {
  return apiFetch('/single-promotional', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({ pi_id }),
  });
}

export function getSingleBanner(bs_id) {
  return apiFetch(`/get-single-banner-slider`, {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({ bs_id }),
  });
}

export function updateSingleBanner(body) {
  return apiFetch('/update-banner', {
    method: 'POST',
    cache: 'no-store',
    body,
  });
}

export function addSlider(body) {
  return apiFetch('/add-banner', {
    method: 'POST',
    cache: 'no-store',
    body,
  });
}

export function productVarById(p_v_id) {
  return apiFetch('/product-variant-by-id', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({ p_v_id }),
  });
}

export function updateVar(body) {
  return apiFetch('/update-varient', {
    method: 'POST',
    cache: 'no-store',
    body,
  });
}

export function deleteVarImg(p_img_id) {
  return apiFetch(`/delete-varient-images`, {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({ p_img_id }),
  });
}

export function getProductCate() {
  return apiFetch('/get-product-cate', {
    cache: 'no-store',
    method: 'POST',
  });
}

export function addProductCate(formData) {
  return apiFetch('/add-product-categories', {
    method: 'POST',
    cache: 'no-store',
    body: formData,
  });
}

export function getSingleCate(p_category_id) {
  return apiFetch('/get-single-cate', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({ p_category_id }),
  });
}

export function updateSingleCate(formData) {
  return apiFetch('/update-product-cate', {
    cache: 'no-store',
    method: 'POST',
    body: formData,
  });
}

export function addProductSubCat(body) {
  return apiFetch('/add-product-sub-category', {
    cache: 'no-store',
    method: 'POST',
    body,
  });
}

export function getSingleSubCate(s_cat_id) {
  return apiFetch('/get-single-sub-cate', {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify({ s_cat_id }),
  });
}

export function updateSingleSubCate(body) {
  return apiFetch('/update-product-sub-cate', {
    method: 'POST',
    body,
  });
}

export function allPromoImg() {
  return apiFetch('/all-promotional-image', {
    method: 'POST',
    cache: 'no-store',
  });
}
