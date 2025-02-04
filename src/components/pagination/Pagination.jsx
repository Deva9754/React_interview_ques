import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Pagination = () => {
  const [products, setProducts] = useState([]); 
  const [page, setPage] = useState(1);
  const navigate=useNavigate();


 const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json(); 
    console.log("data", data);

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);  

  const totalPages = Math.ceil(products.length / 10);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
       <button
          type="button"
          onClick={()=>navigate('/admin')}
          className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 font-semibold"
        >
          &larr; Back to admin
        </button>
      <h1 className="text-3xl font-bold  text-center mt-6 mb-6">Product Listings</h1>
      
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(page * 10 - 10, page * 10).map((item) => (
          <li key={item.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
            <h2 className="text-lg font-semibold text-gray-800">{item?.title}</h2>
            <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover mt-4 rounded-md"/>
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-8">
        {/* Pagination Tab */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              className={`px-4 py-2 rounded-lg text-lg transition-colors 
                ${page === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-100"
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
