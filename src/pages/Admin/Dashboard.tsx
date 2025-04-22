
import React from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">128</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">64</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">256</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">$12,480</div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
