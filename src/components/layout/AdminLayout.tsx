
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar"
import { LayoutDashboard, Users, ListOrdered, Package } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Package, label: "Products", path: "/admin/products" },
    { icon: ListOrdered, label: "Orders", path: "/admin/orders" },
    { icon: Users, label: "Users", path: "/admin/users" },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-100">
        <Sidebar>
          <SidebarHeader className="border-b border-border p-4">
            <h2 className="text-lg font-semibold">Admin Panel</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                    tooltip={item.label}
                  >
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-8">
          <div className="flex items-center justify-between mb-6">
            <SidebarTrigger />
          </div>
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}

export default AdminLayout
