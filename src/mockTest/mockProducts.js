import casual from 'casual';

const generateMockProducts = () => {
  const mockProducts = [];

  for (let i = 1; i <= 100; i++) {
    const product = {
      title: casual.title,
      description: casual.sentences(3),
      stock: casual.integer(1, 100),
      price: casual.double(1, 1000).toFixed(2),
      code: casual.uuid,
      thumbnail: casual.url,
      category: casual.word,
    };

    mockProducts.push(product);
  }

  return mockProducts;
};

export default generateMockProducts;