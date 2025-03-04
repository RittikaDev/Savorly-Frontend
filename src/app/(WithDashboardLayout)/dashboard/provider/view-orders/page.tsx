import ViewOrdersPage from "@/components/modules/dashboard/provider/ViewOrdersPage";
import { getProviderSpecificOrders } from "@/services/Order";
import React from "react";

const ViewOrders = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  const { data, paginationMetaData } = await getProviderSpecificOrders(
    page,
    "4"
  );
  return (
    <ViewOrdersPage providerSpecificOrder={data} meta={paginationMetaData} />
  );
};

export default ViewOrders;
