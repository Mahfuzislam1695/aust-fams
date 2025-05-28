"use client"

import { useState } from "react"
import { Plus, Search, Filter, Download, Upload, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
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
import MainLayout from "@/components/layout/main-layout"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const assets = [
  {
    id: 1,
    code: "DL001",
    name: "Dell Laptop Inspiron 15",
    category: "IT Equipment",
    department: "IT Department",
    status: "Active",
    purchaseValue: "৳85,000",
    purchaseDate: "2023-06-15",
    custodian: "John Doe",
  },
  {
    id: 2,
    code: "HP045",
    name: "HP LaserJet Printer",
    category: "Office Equipment",
    department: "Admin Department",
    status: "Inactive",
    purchaseValue: "৳25,000",
    purchaseDate: "2022-03-20",
    custodian: "Jane Smith",
  },
  {
    id: 3,
    code: "OC123",
    name: "Executive Office Chair",
    category: "Furniture",
    department: "HR Department",
    status: "Active",
    purchaseValue: "৳15,000",
    purchaseDate: "2023-01-10",
    custodian: "Mike Johnson",
  },
  {
    id: 4,
    code: "MB078",
    name: "MacBook Pro 16-inch",
    category: "IT Equipment",
    department: "Design Department",
    status: "Active",
    purchaseValue: "৳250,000",
    purchaseDate: "2024-01-05",
    custodian: "Sarah Wilson",
  },
  {
    id: 5,
    code: "AC089",
    name: "Split AC Unit 1.5 Ton",
    category: "HVAC",
    department: "Finance Department",
    status: "Active",
    purchaseValue: "৳45,000",
    purchaseDate: "2023-08-12",
    custodian: "Robert Brown",
  },
]

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false)
  const [isViewAssetOpen, setIsViewAssetOpen] = useState(false)
  const [isEditAssetOpen, setIsEditAssetOpen] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState(null)

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || asset.category === selectedCategory
    const matchesDepartment = selectedDepartment === "all" || asset.department === selectedDepartment
    const matchesStatus = selectedStatus === "all" || asset.status === selectedStatus

    return matchesSearch && matchesCategory && matchesDepartment && matchesStatus
  })

  const handleViewAsset = (asset) => {
    setSelectedAsset(asset)
    setIsViewAssetOpen(true)
  }

  const handleEditAsset = (asset) => {
    setSelectedAsset(asset)
    setIsEditAssetOpen(true)
  }

  const handleDeleteAsset = (asset) => {
    if (confirm(`Are you sure you want to delete ${asset.name}?`)) {
      console.log("Deleting asset:", asset.code)
      // Handle asset deletion
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Asset Registry</h1>
            <p className="text-gray-600">Manage and track all organizational assets</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Bulk Import
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Dialog open={isAddAssetOpen} onOpenChange={setIsAddAssetOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Asset
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>Add New Asset</DialogTitle>
                  <DialogDescription>Enter asset details to add to the registry</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="assetCode">Asset Code</Label>
                      <Input id="assetCode" placeholder="e.g., DL001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assetName">Asset Name</Label>
                      <Input id="assetName" placeholder="e.g., Dell Laptop" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="it-equipment">IT Equipment</SelectItem>
                          <SelectItem value="office-equipment">Office Equipment</SelectItem>
                          <SelectItem value="furniture">Furniture</SelectItem>
                          <SelectItem value="hvac">HVAC</SelectItem>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="purchaseValue">Purchase Value (৳)</Label>
                      <Input id="purchaseValue" type="number" placeholder="85000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="purchaseDate">Purchase Date</Label>
                      <Input id="purchaseDate" type="date" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="custodian">Custodian</Label>
                      <Input id="custodian" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="Room 101, IT Building" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="depreciationMethod">Depreciation Method</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="straight-line">Straight Line</SelectItem>
                          <SelectItem value="reducing-balance">Reducing Balance</SelectItem>
                          <SelectItem value="sum-of-years">Sum of Years Digits</SelectItem>
                          <SelectItem value="units-of-production">Units of Production</SelectItem>
                          <SelectItem value="double-declining">Double Declining Balance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="calculationFrequency">Calculation Frequency</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Asset description and specifications" />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddAssetOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      // Handle asset creation
                      console.log("Creating new asset...")
                      setIsAddAssetOpen(false)
                    }}
                  >
                    Add Asset
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
            <CardDescription>Find assets using various criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="IT Equipment">IT Equipment</SelectItem>
                  <SelectItem value="Office Equipment">Office Equipment</SelectItem>
                  <SelectItem value="Furniture">Furniture</SelectItem>
                  <SelectItem value="HVAC">HVAC</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="IT Department">IT Department</SelectItem>
                  <SelectItem value="Admin Department">Admin Department</SelectItem>
                  <SelectItem value="HR Department">HR Department</SelectItem>
                  <SelectItem value="Finance Department">Finance Department</SelectItem>
                  <SelectItem value="Design Department">Design Department</SelectItem>
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
                  <SelectItem value="Disposed">Disposed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Assets Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Assets ({filteredAssets.length})</CardTitle>
                <CardDescription>Complete list of organizational assets</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Purchase Value</TableHead>
                  <TableHead>Custodian</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.code}</TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.category}</TableCell>
                    <TableCell>{asset.department}</TableCell>
                    <TableCell>
                      <Badge variant={asset.status === "Active" ? "default" : "secondary"}>{asset.status}</Badge>
                    </TableCell>
                    <TableCell>{asset.purchaseValue}</TableCell>
                    <TableCell>{asset.custodian}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleViewAsset(asset)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditAsset(asset)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Asset
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteAsset(asset)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Asset
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
      </div>
      {/* View Asset Dialog */}
      <Dialog open={isViewAssetOpen} onOpenChange={setIsViewAssetOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Asset Details</DialogTitle>
            <DialogDescription>Complete information for {selectedAsset?.name}</DialogDescription>
          </DialogHeader>
          {selectedAsset && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Asset Code</Label>
                  <p className="text-sm font-mono">{selectedAsset.code}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Status</Label>
                  <Badge variant={selectedAsset.status === "Active" ? "default" : "secondary"}>
                    {selectedAsset.status}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Asset Name</Label>
                <p className="text-sm">{selectedAsset.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Category</Label>
                  <p className="text-sm">{selectedAsset.category}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Department</Label>
                  <p className="text-sm">{selectedAsset.department}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Purchase Value</Label>
                  <p className="text-sm">{selectedAsset.purchaseValue}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Purchase Date</Label>
                  <p className="text-sm">{selectedAsset.purchaseDate}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Current Custodian</Label>
                <p className="text-sm">{selectedAsset.custodian}</p>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setIsViewAssetOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Asset Dialog */}
      <Dialog open={isEditAssetOpen} onOpenChange={setIsEditAssetOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Edit Asset</DialogTitle>
            <DialogDescription>Update asset information</DialogDescription>
          </DialogHeader>
          {selectedAsset && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editAssetCode">Asset Code</Label>
                  <Input id="editAssetCode" defaultValue={selectedAsset.code} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editAssetName">Asset Name</Label>
                  <Input id="editAssetName" defaultValue={selectedAsset.name} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editCategory">Category</Label>
                  <Select defaultValue={selectedAsset.category.toLowerCase().replace(" ", "-")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it-equipment">IT Equipment</SelectItem>
                      <SelectItem value="office-equipment">Office Equipment</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="hvac">HVAC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editDepartment">Department</Label>
                  <Select defaultValue={selectedAsset.department.toLowerCase().replace(" department", "")}>
                    <SelectTrigger>
                      <SelectValue />
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editCustodian">Custodian</Label>
                  <Input id="editCustodian" defaultValue={selectedAsset.custodian} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editStatus">Status</Label>
                  <Select defaultValue={selectedAsset.status.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="disposed">Disposed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditAssetOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                console.log("Updating asset:", selectedAsset?.code)
                setIsEditAssetOpen(false)
              }}
            >
              Update Asset
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  )
}
