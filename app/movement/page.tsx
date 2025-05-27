"use client"

import { useState } from "react"
import { Plus, Clock, CheckCircle, XCircle, Eye, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
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
import MainLayout from "@/components/layout/main-layout"

const transfers = [
  {
    id: 1,
    transferId: "TRF001",
    assetCode: "DL001",
    assetName: "Dell Laptop Inspiron 15",
    fromDepartment: "IT Department",
    toDepartment: "Finance Department",
    requestedBy: "John Doe",
    requestDate: "2024-01-15",
    approvedBy: null,
    approvalDate: null,
    status: "Pending",
    reason: "Employee transfer to Finance Department",
  },
  {
    id: 2,
    transferId: "TRF002",
    assetCode: "OC123",
    assetName: "Executive Office Chair",
    fromDepartment: "HR Department",
    toDepartment: "IT Department",
    requestedBy: "Jane Smith",
    requestDate: "2024-01-13",
    approvedBy: "Mike Johnson",
    approvalDate: "2024-01-14",
    status: "Approved",
    reason: "Office reorganization",
  },
  {
    id: 3,
    transferId: "TRF003",
    assetCode: "HP045",
    assetName: "HP LaserJet Printer",
    fromDepartment: "Admin Department",
    toDepartment: "Marketing Department",
    requestedBy: "Sarah Wilson",
    requestDate: "2024-01-10",
    approvedBy: null,
    approvalDate: null,
    status: "Rejected",
    reason: "Printer needed for marketing materials",
  },
  {
    id: 4,
    transferId: "TRF004",
    assetCode: "MB078",
    assetName: "MacBook Pro 16-inch",
    fromDepartment: "Design Department",
    toDepartment: "Development Department",
    requestedBy: "Robert Brown",
    requestDate: "2024-01-08",
    approvedBy: "Alice Cooper",
    approvalDate: "2024-01-09",
    status: "Completed",
    reason: "Project requirement",
  },
]

const transferStats = {
  pending: transfers.filter((t) => t.status === "Pending").length,
  approved: transfers.filter((t) => t.status === "Approved").length,
  completed: transfers.filter((t) => t.status === "Completed").length,
  rejected: transfers.filter((t) => t.status === "Rejected").length,
}

export default function MovementPage() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isNewTransferOpen, setIsNewTransferOpen] = useState(false)
  const [isViewTransferOpen, setIsViewTransferOpen] = useState(false)
  const [selectedTransfer, setSelectedTransfer] = useState(null)

  const filteredTransfers = transfers.filter(
    (transfer) => selectedStatus === "all" || transfer.status === selectedStatus,
  )

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

  const handleViewTransfer = (transfer) => {
    setSelectedTransfer(transfer)
    setIsViewTransferOpen(true)
  }

  const handleApproveTransfer = (transfer) => {
    if (confirm(`Approve transfer of ${transfer.assetName}?`)) {
      console.log("Approving transfer:", transfer.transferId)
      // Handle approval logic
    }
  }

  const handleRejectTransfer = (transfer) => {
    if (confirm(`Reject transfer of ${transfer.assetName}?`)) {
      console.log("Rejecting transfer:", transfer.transferId)
      // Handle rejection logic
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Asset Movement & Transfer</h1>
            <p className="text-gray-600">Manage asset transfers between departments</p>
          </div>
          <Dialog open={isNewTransferOpen} onOpenChange={setIsNewTransferOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                New Transfer Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>New Transfer Request</DialogTitle>
                <DialogDescription>Create a new asset transfer request between departments</DialogDescription>
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
                        <SelectItem value="DL001">DL001 - Dell Laptop</SelectItem>
                        <SelectItem value="HP045">HP045 - HP Printer</SelectItem>
                        <SelectItem value="OC123">OC123 - Office Chair</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="custodian">New Custodian</Label>
                    <Input placeholder="Enter custodian name" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromDept">From Department</Label>
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
                  <div className="space-y-2">
                    <Label htmlFor="toDept">To Department</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="reason">Transfer Reason</Label>
                  <Textarea placeholder="Enter reason for transfer" className="min-h-[100px]" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNewTransferOpen(false)}>
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
              <div className="text-2xl font-bold">{transferStats.pending}</div>
              <p className="text-xs text-gray-600">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{transferStats.approved}</div>
              <p className="text-xs text-gray-600">Ready for transfer</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{transferStats.completed}</div>
              <p className="text-xs text-gray-600">Successfully transferred</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{transferStats.rejected}</div>
              <p className="text-xs text-gray-600">Transfer denied</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Transfers</CardTitle>
            <CardDescription>Filter transfer requests by status</CardDescription>
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
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transfer History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Transfer History</CardTitle>
                <CardDescription>Complete history of asset transfer requests</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transfer ID</TableHead>
                  <TableHead>Asset</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransfers.map((transfer) => (
                  <TableRow key={transfer.id}>
                    <TableCell className="font-medium">{transfer.transferId}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transfer.assetCode}</div>
                        <div className="text-sm text-gray-600">{transfer.assetName}</div>
                      </div>
                    </TableCell>
                    <TableCell>{transfer.fromDepartment}</TableCell>
                    <TableCell>{transfer.toDepartment}</TableCell>
                    <TableCell>{transfer.requestedBy}</TableCell>
                    <TableCell>{transfer.requestDate}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(transfer.status)} className="flex items-center gap-1 w-fit">
                        {getStatusIcon(transfer.status)}
                        {transfer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewTransfer(transfer)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {transfer.status === "Pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-600"
                              onClick={() => handleApproveTransfer(transfer)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                              onClick={() => handleRejectTransfer(transfer)}
                            >
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
      {/* View Transfer Dialog */}
      <Dialog open={isViewTransferOpen} onOpenChange={setIsViewTransferOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Transfer Details</DialogTitle>
            <DialogDescription>Complete information for transfer {selectedTransfer?.transferId}</DialogDescription>
          </DialogHeader>
          {selectedTransfer && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Transfer ID</Label>
                  <p className="text-sm font-mono">{selectedTransfer.transferId}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Status</Label>
                  <Badge variant={getStatusVariant(selectedTransfer.status)} className="flex items-center gap-1 w-fit">
                    {getStatusIcon(selectedTransfer.status)}
                    {selectedTransfer.status}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Asset</Label>
                <p className="text-sm font-medium">
                  {selectedTransfer.assetCode} - {selectedTransfer.assetName}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">From Department</Label>
                  <p className="text-sm">{selectedTransfer.fromDepartment}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">To Department</Label>
                  <p className="text-sm">{selectedTransfer.toDepartment}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Requested By</Label>
                  <p className="text-sm">{selectedTransfer.requestedBy}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Request Date</Label>
                  <p className="text-sm">{selectedTransfer.requestDate}</p>
                </div>
              </div>
              {selectedTransfer.approvedBy && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Approved By</Label>
                    <p className="text-sm">{selectedTransfer.approvedBy}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Approval Date</Label>
                    <p className="text-sm">{selectedTransfer.approvalDate}</p>
                  </div>
                </div>
              )}
              <div>
                <Label className="text-sm font-medium text-gray-500">Transfer Reason</Label>
                <p className="text-sm">{selectedTransfer.reason}</p>
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            {selectedTransfer?.status === "Pending" && (
              <>
                <Button
                  variant="outline"
                  className="text-green-600"
                  onClick={() => {
                    handleApproveTransfer(selectedTransfer)
                    setIsViewTransferOpen(false)
                  }}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600"
                  onClick={() => {
                    handleRejectTransfer(selectedTransfer)
                    setIsViewTransferOpen(false)
                  }}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </>
            )}
            <Button variant="outline" onClick={() => setIsViewTransferOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  )
}
