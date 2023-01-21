const ImageUrlCheck = async (url: string) => {
  try {
    const response = await fetch(url, { mode: 'no-cors' });
    const type = response.headers.get('content-type');
    if (type && type.startsWith('image')) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default ImageUrlCheck;
