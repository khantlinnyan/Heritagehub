"use client";
import { useQuery } from "@tanstack/react-query";
import SearchComponent from "../atoms/search";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
const base_url = process.env.NEXT_PUBLIC_BASE_URL;

async function fetchPlaces() {
  const response = await fetch(`${base_url}/plan/places`);
  if (!response.ok) throw new Error("Failed to fetch places");
  return response.json();
}

const SearchGroup = () => {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["places"],
    queryFn: () => fetchPlaces(),
  });
  console.log(data);

  const handleSelect = (product: any) => {
    router.push(`/place/${product.id}`);
  };

  const renderProduct = (product: any) => (
    <div className="flex items-center p-3 hover:bg-gray-100 cursor-pointer">
      <div className="w-12 h-12 rounded-md overflow-hidden mr-3 bg-gray-200">
        {product.photoUrl && (
          // <Image
          //   quality={50}
          //   width={60}
          //   height={60}
          //   src={product.photoUrl}
          //   alt={product.name}
          //   className="w-full h-full object-cover"
          // />
          <CldImage
            width={60}
            height={60}
            src={product.photoUrl} // Use the public ID here
            alt={product.name}
            crop="fill"
            gravity="auto"
            quality={40}
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
      placeholder="Places to go, things to do..."
      searchKeys={["title", "description", "category"]}
      renderItem={renderProduct}
    />
  );
};

export default SearchGroup;
