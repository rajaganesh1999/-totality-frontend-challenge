// // src/Components/PropertyList.js
// import React, { useState } from 'react';
// import './PropertyList.css'; // Optional: Import CSS for styling

// const PropertyList = () => {
//     const [properties] = useState([
//         {
//             id: 1,
//             title: "Cozy Cottage",
//             description: "A charming cottage in the countryside.",
//             price: 120,
//             location: "Countryside",
//             bedrooms: 2,
//             amenities: ["Wi-Fi", "Parking"],
//             image: "https://via.placeholder.com/150"
//         },
//         {
//             id: 2,
//             title: "Luxury Apartment",
//             description: "A modern apartment in the city center.",
//             price: 250,
//             location: "City Center",
//             bedrooms: 3,
//             amenities: ["Wi-Fi", "Pool", "Gym"],
//             image: "https://via.placeholder.com/150"
//         },
//         // Add more properties as needed
//     ]);

//     const [filters, setFilters] = useState({
//         location: "",
//         priceRange: [0, 500],
//         bedrooms: 0,
//     });

//     const handleFilterChange = (e) => {
//         const { name, value } = e.target;
//         setFilters((prev) => ({
//             ...prev,
//             [name]: name === "priceRange" ? value.split(",").map(Number) : value,
//         }));
//     };

//     const filteredProperties = properties.filter((property) => {
//         const { location, priceRange, bedrooms } = filters;
//         return (
//             (location ? property.location.includes(location) : true) &&
//             (property.price >= priceRange[0] && property.price <= priceRange[1]) &&
//             (bedrooms ? property.bedrooms >= bedrooms : true)
//         );
//     });

//     return (
//         <div className="property-list">
//             <h1>Property Listings</h1>

//             <div className="filters">
//                 <input
//                     type="text"
//                     name="location"
//                     placeholder="Location"
//                     value={filters.location}
//                     onChange={handleFilterChange}
//                 />
//                 <input
//                     type="text"
//                     name="priceRange"
//                     placeholder="Price Range (min,max)"
//                     value={filters.priceRange.join(",")}
//                     onChange={handleFilterChange}
//                 />
//                 <input
//                     type="number"
//                     name="bedrooms"
//                     placeholder="Minimum Bedrooms"
//                     value={filters.bedrooms}
//                     onChange={handleFilterChange}
//                 />
//             </div>

//             <div className="property-cards">
//                 {filteredProperties.map((property) => (
//                     <div key={property.id} className="property-card">
//                         <img src={property.image} alt={property.title} />
//                         <h2>{property.title}</h2>
//                         <p>{property.description}</p>
//                         <p>Price: ${property.price} per night</p>
//                         <p>Location: {property.location}</p>
//                         <p>Bedrooms: {property.bedrooms}</p>
//                         <button className="book-button">Book Now</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default PropertyList;
