exports.getValidImageUrl = async (filename, name) => {
  if (filename === "" || filename === undefined || filename === null) {
    filename =
      "https://ui-avatars.com/api/?name=" +
      name +
      "&rounded=true&background=00b4d8&color=fff"
  }
  return filename
}
