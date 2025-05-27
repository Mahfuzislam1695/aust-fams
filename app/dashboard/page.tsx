"use client"

import { Package, TrendingDown, AlertTriangle, Trash2, ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import MainLayout from "@/components/layout/main-layout"

const stats = [
  {
    name: "Total Assets",
    value: "2,847",
    change: "+12%",
    changeType: "increase",
    icon: Package,
    color: "text-blue-600",
  },
  {
    name: "Depreciated Value",
    value: "৳45.2M",
    change: "+8.2%",
    changeType: "increase",
    icon: TrendingDown,
    color: "text-red-600",
  },
  {
    name: "Inactive Assets",
    value: "127",
    change: "-3%",
    changeType: "decrease",
    icon: AlertTriangle,
    color: "text-yellow-600",
  },
  {
    name: "Disposed Assets",
    value: "89",
    change: "+15%",
    changeType: "increase",
    icon: Trash2,
    color: "text-gray-600",
  },
]

const recentActions = [
  {
    id: 1,
    type: "Transfer",
    asset: "Dell Laptop - DL001",
    from: "IT Department",
    to: "Finance Department",
    status: "Pending",
    date: "2024-01-15",
    user: "John Doe",
  },
  {
    id: 2,
    type: "Disposal",
    asset: "HP Printer - HP045",
    from: "Admin Department",
    to: "-",
    status: "Approved",
    date: "2024-01-14",
    user: "Jane Smith",
  },
  {
    id: 3,
    type: "Transfer",
    asset: "Office Chair - OC123",
    from: "HR Department",
    to: "IT Department",
    status: "Completed",
    date: "2024-01-13",
    user: "Mike Johnson",
  },
  {
    id: 4,
    type: "Addition",
    asset: "MacBook Pro - MB078",
    from: "-",
    to: "Design Department",
    status: "Completed",
    date: "2024-01-12",
    user: "Sarah Wilson",
  },
]

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your assets.</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.name}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-gray-600">
                  {stat.changeType === "increase" ? (
                    <ArrowUp className="mr-1 h-3 w-3 text-green-600" />
                  ) : (
                    <ArrowDown className="mr-1 h-3 w-3 text-red-600" />
                  )}
                  <span className={stat.changeType === "increase" ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Actions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Actions</CardTitle>
                <CardDescription>Latest asset transfers, disposals, and additions</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Asset</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActions.map((action) => (
                  <TableRow key={action.id}>
                    <TableCell>
                      <Badge
                        variant={
                          action.type === "Transfer"
                            ? "default"
                            : action.type === "Disposal"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {action.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{action.asset}</TableCell>
                    <TableCell>{action.from}</TableCell>
                    <TableCell>{action.to}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          action.status === "Completed"
                            ? "default"
                            : action.status === "Approved"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {action.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{action.date}</TableCell>
                    <TableCell>{action.user}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
