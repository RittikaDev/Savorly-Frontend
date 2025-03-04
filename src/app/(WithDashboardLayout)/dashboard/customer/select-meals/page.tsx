import SelectmealsPage from "@/components/modules/dashboard/user/SelectmealsPage";
import { getUserSpecificOrders } from "@/services/Order";
import React from "react";

const SelectMeals = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  const { data, paginationMetaData } = await getUserSpecificOrders(page, "4");
  return <SelectmealsPage trackOrder={data} meta={paginationMetaData} />;
};

export default SelectMeals;
