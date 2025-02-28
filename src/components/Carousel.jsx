import React, { useEffect, useState } from 'react';

export default function Carousel() {
    const [pastaImg, setChickenImg] = useState('');
    const [pizzaImg, setPastaImg] = useState('');
    const [paneerImg, setSaladImg] = useState('');

    useEffect(() => {
        const fetchImage = async (meal, setImage) => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
                const data = await response.json();
                if (data.meals) {
                    setImage(data.meals[0].strMealThumb);
                }
            } catch (error) {
                console.error(`Error fetching ${meal} image:`, error);
            }
        };

        fetchImage('pasta', setChickenImg);
        fetchImage('pizza', setPastaImg);
        fetchImage('paneer', setSaladImg);
    }, []);

    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption" style={{ zIndex: "9" }}>
                        <form className="d-flex justify-content-center">
                            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" />
                            <button className="btn text-white bg-success" type="submit">Search</button>
                        </form>
                    </div>

                    <div className="carousel-item active">
                        {/* <img src={chickenImg} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Chicken Dish" /> */}
                        <img 
                            src={pastaImg} 
                            className="d-block w-100" 
                            style={{ 
                                height: "500px", 
                                objectFit: "cover", 
                                filter: "brightness(60%)" 
                            }} 
                            alt="pasta" 
                            />

                    </div>
                    <div className="carousel-item">
                        {/* <img src={pastaImg} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Pasta Dish" /> */}
                        <img 
                            src={pizzaImg} 
                            className="d-block w-100" 
                            style={{ 
                                height: "500px", 
                                objectFit: "cover", 
                                filter: "brightness(60%)" 
                            }} 
                            alt="pizza" 
                            />

                    </div>
                    <div className="carousel-item">
                        {/* <img src={saladImg} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Salad Dish" /> */}
                        <img 
                            src={paneerImg} 
                            className="d-block w-100" 
                            style={{ 
                                height: "500px", 
                                objectFit: "cover", 
                                filter: "brightness(60%)" 
                            }} 
                            alt="Paneer" 
                            />

                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    );
}
