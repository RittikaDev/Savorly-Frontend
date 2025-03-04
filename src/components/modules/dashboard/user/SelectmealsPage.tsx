"use client";

import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TablePagination from "@/components/ui/core/NMTable/TablePagination";

const SelectmealsPage = ({ trackOrder, meta }: any) => {
  const Orders = trackOrder;

  const statusColors = {
    Confirmed: "bg-green-500",
    Pending: "bg-yellow-500",
    Cancelled: "bg-red-500",
  };

  return (
    <>
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
          {Orders.map((booking: any) =>
            // Loop through each mealId
            booking.mealId.map((meal: any, index: number) => (
              <TableRow key={`${booking.id}-${index}`}>
                <TableCell>{meal.name}</TableCell>
                <TableCell>{meal.cuisineType}</TableCell>
                <TableCell>{booking.spiceLevel[index]}</TableCell>
                <TableCell>{meal.portionSize}</TableCell>
                <TableCell>{booking.quantity[index]}</TableCell>
                <TableCell>{booking.totalPrice}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      statusColors[booking.status as keyof typeof statusColors]
                    } text-white px-2 py-1 rounded-md`}
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination totalPage={meta?.totalPages} />
    </>
  );
};

export default SelectmealsPage;
