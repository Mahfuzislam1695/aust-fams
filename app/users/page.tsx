"use client"

import { useState } from "react"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Shield, UserCheck, UserX, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MainLayout from "@/components/layout/main-layout"

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@aust.edu",
    role: "System Administrator",
    department: "IT Department",
    status: "Active",
    lastLogin: "2024-01-15 10:30 AM",
    permissions: ["All Modules", "User Management", "System Settings"],
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@aust.edu",
    role: "Asset Manager",
    department: "Finance Department",
    status: "Active",
    lastLogin: "2024-01-15 09:15 AM",
    permissions: ["Asset Registry", "Transfers", "Disposal", "Reports"],
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@aust.edu",
    role: "Department Head",
    department: "HR Department",
    status: "Active",
    lastLogin: "2024-01-14 02:45 PM",
    permissions: ["Department Assets", "Transfer Approvals", "Reports"],
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@aust.edu",
    role: "Asset Custodian",
    department: "Admin Department",
    status: "Inactive",
    lastLogin: "2024-01-10 11:20 AM",
    permissions: ["Asset Updates", "Transfer Requests", "Basic Reports"],
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 5,
    name: "Robert Brown",
    email: "robert.brown@aust.edu",
    role: "Asset Custodian",
    department: "Design Department",
    status: "Active",
    lastLogin: "2024-01-15 08:00 AM",
    permissions: ["Asset Updates", "Transfer Requests", "Basic Reports"],
    avatar: "/placeholder-user.jpg",
  },
]

const roles = [
  {
    name: "System Administrator",
    description: "Full system access and user management",
    permissions: [
      "User Management",
      "System Settings",
      "Asset Registry",
      "Depreciation",
      "Movement",
      "Disposal",
      "Reports",
      "Audit Logs",
    ],
    userCount: 1,
  },
  {
    name: "Asset Manager",
    description: "Asset lifecycle and workflow management",
    permissions: ["Asset Registry", "Depreciation", "Movement", "Disposal", "Reports"],
    userCount: 3,
  },
  {
    name: "Department Head",
    description: "Department asset oversight and approvals",
    permissions: ["Department Assets", "Transfer Approvals", "Reports", "Basic Settings"],
    userCount: 5,
  },
  {
    name: "Asset Custodian",
    description: "Asset maintenance and basic operations",
    permissions: ["Asset Updates", "Transfer Requests", "Basic Reports"],
    userCount: 12,
  },
]

const userStats = {
  total: users.length,
  active: users.filter((u) => u.status === "Active").length,
  inactive: users.filter((u) => u.status === "Inactive").length,
  admins: users.filter((u) => u.role === "System Administrator").length,
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isNewUserOpen, setIsNewUserOpen] = useState(false)
  const [isRoleManagementOpen, setIsRoleManagementOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("users")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesDepartment = selectedDepartment === "all" || user.department === selectedDepartment
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus

    return matchesSearch && matchesRole && matchesDepartment && matchesStatus
  })

  const getStatusVariant = (status: string) => {
    return status === "Active" ? "default" : "secondary"
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "System Administrator":
        return "bg-red-100 text-red-800"
      case "Asset Manager":
        return "bg-blue-100 text-blue-800"
      case "Department Head":
        return "bg-green-100 text-green-800"
      case "Asset Custodian":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">Manage users, roles, and permissions</p>
          </div>
          <div className="flex items-center space-x-2">
            <Dialog open={isRoleManagementOpen} onOpenChange={setIsRoleManagementOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Shield className="mr-2 h-4 w-4" />
                  Manage Roles
                </Button>
              </DialogTrigger>
            </Dialog>
            <Dialog open={isNewUserOpen} onOpenChange={setIsNewUserOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
              <Shield className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.total}</div>
              <p className="text-xs text-gray-600">Registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.active}</div>
              <p className="text-xs text-gray-600">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Inactive Users</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.inactive}</div>
              <p className="text-xs text-gray-600">Inactive accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Administrators</CardTitle>
              <Shield className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.admins}</div>
              <p className="text-xs text-gray-600">System admins</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Search & Filter Users</CardTitle>
                <CardDescription>Find users using various criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="System Administrator">System Administrator</SelectItem>
                      <SelectItem value="Asset Manager">Asset Manager</SelectItem>
                      <SelectItem value="Department Head">Department Head</SelectItem>
                      <SelectItem value="Asset Custodian">Asset Custodian</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="IT Department">IT Department</SelectItem>
                      <SelectItem value="HR Department">HR Department</SelectItem>
                      <SelectItem value="Finance Department">Finance Department</SelectItem>
                      <SelectItem value="Admin Department">Admin Department</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Users ({filteredUsers.length})</CardTitle>
                    <CardDescription>Manage user accounts and permissions</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-gray-600">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                        </TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(user.status)}>{user.status}</Badge>
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Shield className="mr-2 h-4 w-4" />
                                Manage Permissions
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            {/* Roles Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roles.map((role, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{role.name}</CardTitle>
                    <CardDescription>{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Users: {role.userCount}</p>
                        <p className="text-sm text-gray-600">Permissions: {role.permissions.length}</p>
                      </div>
                      <div className="space-y-2">
                        {role.permissions.slice(0, 3).map((permission) => (
                          <Badge key={permission} variant="outline" className="mr-1 mb-1">
                            {permission}
                          </Badge>
                        ))}
                        {role.permissions.length > 3 && (
                          <Badge variant="outline">+{role.permissions.length - 3} more</Badge>
                        )}
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Edit Role
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* New User Dialog */}
        <Dialog open={isNewUserOpen} onOpenChange={setIsNewUserOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account with appropriate permissions</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input placeholder="Enter last name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input type="email" placeholder="user@aust.edu" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">System Administrator</SelectItem>
                      <SelectItem value="manager">Asset Manager</SelectItem>
                      <SelectItem value="head">Department Head</SelectItem>
                      <SelectItem value="custodian">Asset Custodian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">IT Department</SelectItem>
                      <SelectItem value="hr">HR Department</SelectItem>
                      <SelectItem value="finance">Finance Department</SelectItem>
                      <SelectItem value="admin">Admin Department</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sendEmail" />
                <Label htmlFor="sendEmail">Send welcome email with login credentials</Label>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsNewUserOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">Create User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
