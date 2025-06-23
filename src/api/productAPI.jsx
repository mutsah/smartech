const URL = 'http://localhost:3000/product/';

export async function getAllProducts() {
  try {
    const response = await fetch(`${URL}get-products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', data);
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data.data || [];
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function addProduct(productData) {
  try {
    const formData = new FormData();

    formData.append('title', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('stock', productData.stock);
    formData.append('category', productData.category);

    if (productData.image) {
      formData.append('image', productData.image);
    }

    const response = await fetch(`${URL}add-product`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.log('API Error:', data);
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.log('API Add Product Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function updateProduct(productData, id) {
  try {
    const formData = new FormData();

    formData.append('title', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('stock', productData.stock);
    formData.append('category', productData.category);

    if (productData.image) {
      formData.append('image', productData.image);
    }

    const response = await fetch(`${URL}update-product/${id}`, {
      method: 'PUT',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.log('API Error:', data);
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.log('API Update Product Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function removeProduct(productId) {
  try {
    const response = await fetch(`${URL}remove-product/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', data);
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }
    // console.log(data);

    return data || [];
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}
