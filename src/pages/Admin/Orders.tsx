import React from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { adminAPI } from '@/api'
import { useToast } from '@/hooks/use-toast'
import { useQuery } from '@tanstack/react-query'

interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  totalPrice: number;
  status: string;
  createdAt: string;
}

const AdminOrders = () => {
  const { toast } = useToast();
  
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      try {
        const response = await adminAPI.getAllOrders();
        return response.data;
      } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
      }
    }
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'default'; // blue
      case 'processing': return 'secondary'; // purple
      case 'shipped': return 'outline'; // outlined
      case 'delivered': return 'default'; // default instead of success
      case 'cancelled': return 'destructive'; // red
      default: return 'default';
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Orders Management</h1>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Orders Management</h1>
          <div className="bg-red-100 p-4 rounded-md text-red-700">
            Error loading orders. Please try again later.
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Orders Management</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order: Order) => (
                <TableRow key={order._id}>
                  <TableCell>#{order._id.slice(-6)}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  )
}

export default AdminOrders
