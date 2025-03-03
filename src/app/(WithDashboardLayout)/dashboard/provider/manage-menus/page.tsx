import { getProviderSpecificMeals } from "@/services/Product";
import ManageMenusPage from "@/components/modules/dashboard/provider/ManageMenusPage";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ViewOrders = async ({ searchParams }: { searchParams: SearchParams }) => {
	const query = await searchParams;

	const { data: meals } = await getProviderSpecificMeals(
		undefined,
		undefined,
		query
	);
	console.log(meals);
	return <ManageMenusPage meals={meals} />;
};

export default ViewOrders;
