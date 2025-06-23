// utils/imageLoader.js
export const loadImage = async (imgUrl) => {
  try {
    const response = await fetch(imgUrl, { mode: "cors" });
    if (!response.ok) throw new Error("Image load failed");
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Image load error:", error);
    return null; // Return null or a placeholder image URL
  }
};
