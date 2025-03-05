import ManageMenusPage from "@/components/modules/dashboard/provider/ManageMenusPage";
import { getProviderSpecificMeals } from "@/services/Meals";

const ViewOrders = async ({
	searchParams,
}: {
	searchParams: Promise<{ page: string }>;
}) => {
	const { page } = await searchParams;

	const { data, paginationMetaData } = await getProviderSpecificMeals(
		page,
		"3"
	);

	return <ManageMenusPage mealList={data} meta={paginationMetaData} />;
};

export default ViewOrders;
