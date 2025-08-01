"use client";
import { useQuery } from "@tanstack/react-query";
import SearchComponent from "../atoms/search";
import Image from "next/image";
const base_url = process.env.NEXT_PUBLIC_BASE_URL;

async function fetchPlaces() {
  const response = await fetch(`${base_url}/plan/places`);
  if (!response.ok) throw new Error("Failed to fetch places");
  return response.json();
}

const SearchGroup = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["places"],
    queryFn: () => fetchPlaces(),
  });
  console.log(data);
  const products = [
    {
      id: 1,
      image: "https://example.com/product1.jpg",
      title: "Wireless Headphones",
      description: "Noise cancelling over-ear headphones",
      price: 199.99,
      category: "Audio",
    },
    {
      id: 2,
      image: "https://example.com/product2.jpg",
      title: "Smart Watch",
      description: "Fitness tracker with heart rate monitor",
      price: 159.99,
      category: "Wearables",
    },
    // More items...
  ];
  const handleSelect = (product) => {
    console.log("Selected product:", product);
  };

  const renderProduct = (product) => (
    <div className="flex items-center p-3 hover:bg-gray-100 cursor-pointer">
      <div className="w-12 h-12 rounded-md overflow-hidden mr-3 bg-gray-200">
        {product.photoUrl && (
          <Image
            quality={50}
            width={60}
            height={60}
            src={product.photoUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{product.name}</h4>
        <p className="text-sm text-gray-500">
          {product.description.toString().slice(0, 20)}
        </p>
      </div>
    </div>
  );
  return (
    <SearchComponent
      data={data?.data}
      onSelect={handleSelect}
      placeholder="Places to go, hotels, things to do..."
      searchKeys={["title", "description", "category"]}
      renderItem={renderProduct}
    />
  );
};

export default SearchGroup;
