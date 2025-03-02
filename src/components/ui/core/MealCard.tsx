"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { addmeal } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

import { IMeal } from "@/types";

import { ShoppingCart } from "lucide-react";

const MealCard = ({ meal }: { meal: IMeal }) => {
	const dispatch = useAppDispatch();

	// console.log("from product cart", meal);

	const handleAddProduct = (meal: IMeal) => {
		dispatch(addmeal(meal));
	};

	return (
		// <Card className="p-3">
		//   <CardHeader className="relative p-0 h-48">
		//     {/* <Image
		// 			src={
		// 				product?.imageUrls[0] ||
		// 				"https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
		// 			}
		// 			width={500}
		// 			height={500}
		// 			alt="product image"
		// 			className="rounded-sm h-48 object-cover"
		// 		/> */}
		//     {product?.stock === 0 && (
		//       <div className="absolute left-2 top-0 bg-red-500 text-white px-2 rounded-full">
		//         Out of Stock
		//       </div>
		//     )}
		//   </CardHeader>

		//   <CardContent className=" p-0 mt-2">
		//     <Link href={`/products/${product?._id}`} passHref>
		//       <CardTitle
		//         title={product?.name}
		//         className="font-semibold cursor-pointer text-sm"
		//       >
		//         {product?.name.length > 20
		//           ? product?.name?.slice(0, 20) + "..."
		//           : product?.name}
		//       </CardTitle>
		//     </Link>

		//     <div className="flex items-center justify-between my-2">
		//       <p className="text-sm text-gray-600">
		//         {product?.offerPrice ? (
		//           <>
		//             <span className="font-semibold mr-2 text-orange-400">
		//               $ {product?.offerPrice.toFixed(2)}
		//             </span>
		//             <del className="font-semibold text-xs">
		//               $ {product?.price.toFixed(2)}
		//             </del>
		//           </>
		//         ) : (
		//           <span className="font-semibold">
		//             $ {product?.price.toFixed(2)}
		//           </span>
		//         )}
		//       </p>

		//       <div className="flex items-center justify-center gap-1">
		//         <Star className="w-4 h-4" fill="orange" stroke="orange" />
		//         <span className="text-sm font-medium text-gray-700">
		//           {product?.averageRating}
		//         </span>
		//       </div>
		//     </div>
		//   </CardContent>

		//   <CardFooter className="block p-0">
		//     <div className="flex gap-2 items-center justify-between">
		//       <Button
		//         disabled={product?.stock === 0}
		//         size="sm"
		//         variant="outline"
		//         className="w-32"
		//       >
		//         Buy Now
		//       </Button>
		//       <Button
		//         onClick={() => handleAddProduct(product)}
		//         disabled={product?.stock === 0}
		//         variant="outline"
		//         size="sm"
		//         className="w-8 h-8 p-0 flex items-center justify-center rounded-full"
		//       >
		//         <ShoppingCart />
		//       </Button>
		//       <Button
		//         variant="outline"
		//         size="sm"
		//         className="w-8 h-8 p-0 flex items-center justify-center rounded-full"
		//       >
		//         <Heart />
		//       </Button>
		//     </div>
		//   </CardFooter>
		// </Card>

		<Card key={meal?._id} className="relative p-4 shadow-lg rounded-2xl">
			{/* <div className="absolute top-2 left-2 bg-white p-1 rounded-full shadow">
        <Heart size={18} className="text-gray-500" />
      </div> */}
			<Button
				onClick={() => handleAddProduct(meal)}
				className="absolute top-2 right-2 bg-white p-3 rounded-full shadow hover:bg-primary group border-2 border-primary"
			>
				<ShoppingCart
					size={18}
					className="text-primary group-hover:text-white"
				/>
			</Button>

			<div className="flex justify-center -mt-12">
				<Image
					src={meal?.image[0]}
					alt={meal?.name}
					width={80}
					height={80}
					className="rounded-full border-4 border-green-500 w-20 h-20 object-cover"
				/>
			</div>
			<CardContent className="text-center">
				<h3 className="text-lg font-semibold mt-4">{meal?.name}</h3>
				<div className="flex justify-center gap-1 mt-2">
					<span className="bg-gray-100 text-sm px-2 py-1 rounded-full">
						{meal?.cuisineType}
					</span>
					{meal.dietaryPreferences.map((diet: any, i: any) => (
						<span
							className="bg-gray-100 text-sm px-2 py-1 rounded-full"
							key={i}
						>
							{diet}
						</span>
					))}
				</div>
				<p className="text-gray-600 text-sm mt-2">{meal?.description}</p>
				<div className="flex justify-between items-center mt-4">
					<span className="text-xl font-bold">BDT {meal?.price}</span>
					<Button className="bg-green-500 hover:bg-green-600 text-white">
						Buy Now
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default MealCard;
