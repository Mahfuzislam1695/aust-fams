"use client"

import { useState } from "react"
import { Plus, Trash2, DollarSign, Clock, CheckCircle, XCircle, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import MainLayout from "@/components/layout/main-layout"

const disposals = [
  {
    id: 1,
    disposalId: "DSP001",
    assetCode: "HP045",
    assetName: "HP LaserJet Printer",
    department: "Admin Department",
    requestedBy: "Jane Smith",
    requestDate: "2024-01-14",
    disposalType: "Sold",
    estimatedValue: 8000,
    finalValue: 7500,
    reason: "Equipment malfunction beyond repair",
    status: "Approved",
    approvedBy: "Mike Johnson",
    approvalDate: "2024-01-15",
  },
  {
    id: 2,
    disposalId: "DSP002",
    assetCode: "OC089",
    assetName: "Old Office Chair",
    department: "HR Department",
    requestedBy: "Robert Brown",
    requestDate: "2024-01-12",
    disposalType: "Write-Off",
    estimatedValue: 2000,
    finalValue: 0,
    reason: "Damaged beyond repair",
    status: "Pending",
    approvedBy: null,
    approvalDate: null,
  },
  {
    id: 3,
    disposalId: "DSP003",
    assetCode: "AC067",
    assetName: "Old AC Unit",
    department: "Finance Department",
    requestedBy: "Sarah Wilson",
    requestDate: "2024-01-10",
    disposalType: "Sold",
    estimatedValue: 15000,
    finalValue: 12000,
    reason: "Replacement with energy-efficient model",
    status: "Completed",
    approvedBy: "Alice Cooper",
    approvalDate: "2024-01-11",
  },
  {
    id: 4,
    disposalId: "DSP004",
    assetCode: "PR023",
    assetName: "Dot Matrix Printer",
    department: "IT Department",
    requestedBy: "John Doe",
    requestDate: "2024-01-08",
    disposalType: "Write-Off",
    estimatedValue: 1000,
    finalValue: 0,
    reason: "Obsolete technology",
    status: "Rejected",
    approvedBy: "Mike Johnson",
    approvalDate: "2024-01-09",
  },
]

const disposalStats = {
  pending: disposals.filter((d) => d.status === "Pending").length,
  approved: disposals.filter((d) => d.status === "Approved").length,
  completed: disposals.filter((d) => d.status === "Completed").length,
  totalValue: disposals.filter((d) => d.status === "Completed").reduce((sum, d) => sum + d.finalValue, 0),
}

export default function DisposalPage() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [isNewDisposalOpen, setIsNewDisposalOpen] = useState(false)

  const filteredDisposals = disposals.filter((disposal) => {
    const matchesStatus = selectedStatus === "all" || disposal.status === selectedStatus
    const matchesType = selectedType === "all" || disposal.disposalType === selectedType
    return matchesStatus && matchesType
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4" />
      case "Approved":
      case "Completed":
        return <CheckCircle className="h-4 w-4" />
      case "Rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Pending":
        return "outline"
      case "Approved":
        return "secondary"
      case "Completed":
        return "default"
      case "Rejected":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Asset Disposal Management</h1>
            <p className="text-gray-600">Manage disposal of unserviceable assets</p>
          </div>
          <Dialog open={isNewDisposalOpen} onOpenChange={setIsNewDisposalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                New Disposal Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>New Disposal Request</DialogTitle>
                <DialogDescription>Create a new asset disposal request</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="asset">Select Asset</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose asset" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HP045">HP045 - HP Printer</SelectItem>
                        <SelectItem value="OC089">OC089 - Old Chair</SelectItem>
                        <SelectItem value="AC067">AC067 - AC Unit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disposalType">Disposal Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sold">Sold</SelectItem>
                        <SelectItem value="writeoff">Write-Off</SelectItem>
                        <SelectItem value="donated">Donated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedValue">Estimated Value (৳)</Label>
                  <Input type="number" placeholder="Enter estimated disposal value" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Disposal Reason</Label>
                  <Textarea placeholder="Enter reason for disposal" className="min-h-[100px]" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNewDisposalOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">Submit Request</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Requests</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{disposalStats.pending}</div>
              <p className="text-xs text-gray-600">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{disposalStats.approved}</div>
              <p className="text-xs text-gray-600">Ready for disposal</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
              <Trash2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{disposalStats.completed}</div>
              <p className="text-xs text-gray-600">Successfully disposed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Recovery Value</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">৳{disposalStats.totalValue.toLocaleString()}</div>
              <p className="text-xs text-gray-600">From completed disposals</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Disposals</CardTitle>
            <CardDescription>Filter disposal requests by status and type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Sold">Sold</SelectItem>
                  <SelectItem value="Write-Off">Write-Off</SelectItem>
                  <SelectItem value="Donated">Donated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Disposal History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Disposal History</CardTitle>
                <CardDescription>Complete history of asset disposal requests</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Disposal ID</TableHead>
                  <TableHead>Asset</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Estimated Value</TableHead>
                  <TableHead>Final Value</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDisposals.map((disposal) => (
                  <TableRow key={disposal.id}>
                    <TableCell className="font-medium">{disposal.disposalId}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{disposal.assetCode}</div>
                        <div className="text-sm text-gray-600">{disposal.assetName}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{disposal.disposalType}</Badge>
                    </TableCell>
                    <TableCell>৳{disposal.estimatedValue.toLocaleString()}</TableCell>
                    <TableCell>
                      {disposal.finalValue > 0 ? (
                        <span className="text-green-600">৳{disposal.finalValue.toLocaleString()}</span>
                      ) : (
                        <span className="text-gray-500">৳0</span>
                      )}
                    </TableCell>
                    <TableCell>{disposal.requestedBy}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(disposal.status)} className="flex items-center gap-1 w-fit">
                        {getStatusIcon(disposal.status)}
                        {disposal.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {disposal.status === "Pending" && (
                          <>
                            <Button variant="ghost" size="sm" className="text-green-600">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
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
