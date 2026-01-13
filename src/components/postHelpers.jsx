const getTextPreview = (html, maxLength = 100) => {
  if (!html) return "";
  const temp = document.createElement("div");
  temp.innerHTML = html;      // convert HTML to text
  const text = temp.textContent || temp.innerText || "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength);
};

const isTooLong = (html, maxLength = 100) => {
  if (!html) return false;
  const temp = document.createElement("div");
  temp.innerHTML = html;
  const text = temp.textContent || temp.innerText || "";
  return text.length > maxLength;
};


export {
  getTextPreview,
  isTooLong,
}