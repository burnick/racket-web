const ImageUrlCheck = async (url: string) => {
  try {
    const response = await fetch(url, { mode: 'no-cors' });
    const status = response.status;
    if (status === 0) {
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
