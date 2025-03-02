import { getUserSpeceficOrders } from "@/services/Order";
import {
  BookCheckIcon,
  Check,
  CheckCheck,
  CircleEllipsis,
  CircleX,
} from "lucide-react";
import OverviewCard from "./OverViewCard";
import OverviewProgress from "./OverviewProgress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const CreateTrackOrder = async () => {
  const data = await getUserSpeceficOrders();
  console.log(data);
  const Orders = data.data;

  const pendingOrders = {
    data: Orders?.filter(
      (booking: { status: string }) => booking.status === "Pending"
    ),
  };

  const progressOrders = {
    data: Orders?.filter(
      (booking: { status: string }) => booking.status === "In progress"
    ),
  };

  const deliveredOrders = {
    data: Orders?.filter(
      (booking: { status: string }) => booking.status === "Delivered"
    ),
  };

  const cancelledOrders = {
    data: Orders?.filter(
      (booking: { status: string }) => booking.status === "Cancelled"
    ),
  };

  const totalOrdersCount =
    (pendingOrders?.data?.length || 0) +
      (progressOrders?.data?.length || 0) +
      (cancelledOrders?.data?.length || 0) +
      deliveredOrders?.data?.length || 0;

  const userOverview = [
    {
      icon: <BookCheckIcon size={32} />,
      count: totalOrdersCount,
      label: "Total Orders",
      iconClassName: "text-blue-600",
    },
    {
      icon: <CircleEllipsis size={32} />,
      count: pendingOrders?.data?.length || 0,
      label: "Pending",
      iconClassName: "text-primary",
    },
    {
      icon: <Check size={32} />,
      count: progressOrders?.data?.length || 0,
      label: "Shipped",
      iconClassName: "text-green-400",
    },
    {
      icon: <CheckCheck size={32} />,
      count: deliveredOrders?.data?.length || 0,
      label: "Delivered",
      iconClassName: "text-green-600",
    },
    {
      icon: <CircleX size={32} />,
      count: cancelledOrders?.data?.length || 0,
      label: "Cancelled",
      iconClassName: "text-red-600",
    },
  ];

  //   if (isLoading) {
  //     return <LoadingPage />;
  //   }

  const statusColors = {
    Confirmed: "bg-green-500",
    Pending: "bg-yellow-500",
    Cancelled: "bg-red-500",
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cards Section - 3 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 col-span-2">
          {userOverview.map((item, index) => (
            <OverviewCard
              key={index}
              {...item}
              iconClassName={item.iconClassName}
            />
          ))}
        </div>

        {/* Progress Section - Takes one column on large screens */}
        <div className="w-full">
          <OverviewProgress
            total={totalOrdersCount}
            pending={pendingOrders?.data?.length || 0}
            delivered={deliveredOrders?.data?.length || 0}
            progress={progressOrders?.data?.length || 0}
            cancelled={cancelledOrders?.data?.length || 0}
          />
        </div>
      </div>

      <Table className="min-w-full border rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Order Name</TableHead>
            <TableHead>Cuisine</TableHead>
            <TableHead>Spice Level</TableHead>
            <TableHead>Portion</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Orders.map(
            (booking: {
              id: string;
              name: string;
              date: string;
              time: string;
              status: "Confirmed" | "Pending" | "Cancelled";
            }) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.mealId.name}</TableCell>
                <TableCell>{booking.mealId.cuisineType}</TableCell>
                <TableCell>{booking.mealId.portionSize}</TableCell>
                <TableCell>{booking.spiceLevel[0]}</TableCell>
                <TableCell>{booking.quantity[0]}</TableCell>
                <TableCell>{booking.totalPrice}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      statusColors[booking.status]
                    } text-white px-2 py-1 rounded-md`}
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CreateTrackOrder;
