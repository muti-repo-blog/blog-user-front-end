const postTooLong = (number, string) => {
  if (string.length < number) return false
  return true
}

const showFirstPartOfPost = (number, string) => {
  if (!string) return "";
  if (string.length < number) return string
  return string.slice(0, number)
};

export {
  showFirstPartOfPost,
  postTooLong,
}