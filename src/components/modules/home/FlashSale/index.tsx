import { Button } from "@/components/ui/button";
import SavorlyContainer from "@/components/ui/core/SavorlyContainer";
import MealCard from "@/components/ui/core/MealCard";
import { getFlashSaleProducts } from "@/services/FlashSale";
import { IProduct } from "@/types";
import Link from "next/link";
import CountDown from "./CountDown";

const FlashSale = async () => {
  const { data: products } = await getFlashSaleProducts();

  return (
    <div className=" bg-white bg-opacity-50 pt-6 pb-8">
      <SavorlyContainer className="my-16">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-8">
            <h2 className="text-3xl font-bold">Flash Sale</h2>
            <CountDown />
          </div>

          <Link href="/products">
            <Button variant="outline" className="rounded-full">
              All Collection
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-10">
          {products?.slice(0, 4)?.map((product: IProduct, idx: number) => (
            <MealCard key={idx} product={product} />
          ))}
        </div>
      </SavorlyContainer>
    </div>
  );
};

export default FlashSale;
