"use client"

import { useState } from "react"
import { Calculator, Download, Settings, TrendingDown, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import MainLayout from "@/components/layout/main-layout"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const depreciationData = [
  {
    id: 1,
    assetCode: "DL001",
    assetName: "Dell Laptop Inspiron 15",
    purchaseDate: "2023-06-15",
    purchaseValue: 85000,
    method: "Straight Line",
    rate: 20,
    bookValue: 68000,
    currentValue: 51000,
    depreciationPercent: 40,
  },
  {
    id: 2,
    assetCode: "HP045",
    assetName: "HP LaserJet Printer",
    purchaseDate: "2022-03-20",
    purchaseValue: 25000,
    method: "Reducing Balance",
    rate: 15,
    bookValue: 25000,
    currentValue: 18000,
    depreciationPercent: 28,
  },
  {
    id: 3,
    assetCode: "OC123",
    assetName: "Executive Office Chair",
    purchaseDate: "2023-01-10",
    purchaseValue: 15000,
    method: "Straight Line",
    rate: 10,
    bookValue: 15000,
    currentValue: 13500,
    depreciationPercent: 10,
  },
  {
    id: 4,
    assetCode: "MB078",
    assetName: "MacBook Pro 16-inch",
    purchaseDate: "2024-01-05",
    purchaseValue: 250000,
    method: "Straight Line",
    rate: 25,
    bookValue: 250000,
    currentValue: 245000,
    depreciationPercent: 2,
  },
]

const depreciationSummary = {
  totalAssets: 4,
  totalPurchaseValue: 375000,
  totalCurrentValue: 327500,
  totalDepreciation: 47500,
  averageDepreciationRate: 20,
}

export default function DepreciationPage() {
  const [selectedMethod, setSelectedMethod] = useState("all")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)

  const filteredData = depreciationData.filter((item) => selectedMethod === "all" || item.method === selectedMethod)

  const handleExportReport = () => {
    console.log("Exporting depreciation report...")
    // Simulate export
    const csvContent =
      "Asset Code,Asset Name,Purchase Value,Current Value,Depreciation\n" +
      depreciationData
        .map(
          (item) =>
            `${item.assetCode},${item.assetName},${item.purchaseValue},${item.currentValue},${item.depreciationPercent}%`,
        )
        .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "depreciation-report.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleCalculateDepreciation = async () => {
    setIsCalculating(true)
    console.log("Calculating depreciation...")
    // Simulate calculation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsCalculating(false)
    alert("Depreciation calculated successfully!")
  }

  const handleOpenSettings = () => {
    setIsSettingsOpen(true)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Depreciation Management</h1>
            <p className="text-gray-600">Calculate and track asset depreciation values</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleOpenSettings}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="outline" onClick={handleExportReport}>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleCalculateDepreciation}
              disabled={isCalculating}
            >
              <Calculator className="mr-2 h-4 w-4" />
              {isCalculating ? "Calculating..." : "Calculate Depreciation"}
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Assets</CardTitle>
              <TrendingDown className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{depreciationSummary.totalAssets}</div>
              <p className="text-xs text-gray-600">Assets under depreciation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Purchase Value</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">৳{depreciationSummary.totalPurchaseValue.toLocaleString()}</div>
              <p className="text-xs text-gray-600">Original asset value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Current Value</CardTitle>
              <DollarSign className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">৳{depreciationSummary.totalCurrentValue.toLocaleString()}</div>
              <p className="text-xs text-gray-600">After depreciation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Depreciation</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">৳{depreciationSummary.totalDepreciation.toLocaleString()}</div>
              <p className="text-xs text-gray-600">Accumulated depreciation</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Assets</CardTitle>
            <CardDescription>Filter assets by depreciation method</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="w-64">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Depreciation Method</label>
                <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="Straight Line">Straight Line</SelectItem>
                    <SelectItem value="Reducing Balance">Reducing Balance</SelectItem>
                    <SelectItem value="Sum of Years Digits">Sum of Years Digits</SelectItem>
                    <SelectItem value="Units of Production">Units of Production</SelectItem>
                    <SelectItem value="Double Declining Balance">Double Declining Balance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Depreciation Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Asset Depreciation Details</CardTitle>
                <CardDescription>Current depreciation status for all assets</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset Code</TableHead>
                  <TableHead>Asset Name</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Rate (%)</TableHead>
                  <TableHead>Book Value</TableHead>
                  <TableHead>Current Value</TableHead>
                  <TableHead>Depreciation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.assetCode}</TableCell>
                    <TableCell>{item.assetName}</TableCell>
                    <TableCell>{item.purchaseDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.method}</Badge>
                    </TableCell>
                    <TableCell>{item.rate}%</TableCell>
                    <TableCell>৳{item.bookValue.toLocaleString()}</TableCell>
                    <TableCell>৳{item.currentValue.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={item.depreciationPercent} className="w-16" />
                        <span className="text-sm text-gray-600">{item.depreciationPercent}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {/* Depreciation Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Depreciation Settings</DialogTitle>
            <DialogDescription>Configure depreciation calculation parameters</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="defaultMethod">Default Depreciation Method</Label>
              <Select defaultValue="straight-line">
                <SelectTrigger>
                  <SelectValue />
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="itRate">IT Equipment Rate (%)</Label>
                <Input id="itRate" type="number" defaultValue="25" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="furnitureRate">Furniture Rate (%)</Label>
                <Input id="furnitureRate" type="number" defaultValue="10" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="officeRate">Office Equipment Rate (%)</Label>
                <Input id="officeRate" type="number" defaultValue="15" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hvacRate">HVAC Rate (%)</Label>
                <Input id="hvacRate" type="number" defaultValue="12" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="calculationFreq">Calculation Frequency</Label>
              <Select defaultValue="monthly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                console.log("Saving depreciation settings...")
                setIsSettingsOpen(false)
              }}
            >
              Save Settings
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  )
}
