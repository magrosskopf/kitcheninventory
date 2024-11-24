function create(image: Buffer) {
  console.log("iiimage", image);
  
  if (!image) return "";
  const base64Image = image ? Buffer.from(image).toString("base64") : "";
  if (base64Image == "") return "";
  return `data:image/png;base64,${base64Image}`;
}

const dataUrl = {
  create,
};

export default dataUrl;
