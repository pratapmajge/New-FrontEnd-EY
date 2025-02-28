import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel'; // Import the fixed Carousel component

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadFoodItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/foodData", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();
      setFoodItems(data[0]);
      setFoodCat(data[1]);
    } catch (error) {
      console.error("Error fetching food data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <Navbar />
      <Carousel /> {/* Using the fixed Carousel component */}

      <div className="container">
        {loading ? <p>Loading food items...</p> : (
          foodCat.length > 0 ? foodCat.map((data, index) => (
            <div key={index} className="row mb-3">
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left, rgb(0, 255, 137), rgb(0, 0, 0))" }} />
              {foodItems.length > 0 ? foodItems
                .filter(item => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                .map(item => (
                  <div key={item.id} className="col-12 col-md-6 col-lg-3">
                    <Card foodName={item.name} item={item} options={item.options[0]} ImgSrc={item.img} />
                  </div>
                ))
                : <p>No items found</p>}
            </div>
          )) : <p>No categories available</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
