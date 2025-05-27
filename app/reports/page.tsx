"use client"

import { useState } from "react"
import { BarChart3, Download, Calendar, Filter, PieChart, TrendingUp, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import MainLayout from "@/components/layout/main-layout"

const reportTypes = [
  {
    id: "asset-register",
    name: "Fixed Asset Register",
    description: "Complete list of all assets with current values",
    icon: FileText,
    color: "bg-blue-500",
  },
  {
    id: "depreciation-summary",
    name: "Depreciation Summary",
    description: "Asset depreciation calculations and schedules",
    icon: TrendingUp,
    color: "bg-red-500",
  },
  {
    id: "transfer-report",
    name: "Transfer Report",
    description: "Asset movement and transfer history",
    icon: BarChart3,
    color: "bg-green-500",
  },
  {
    id: "disposal-report",
    name: "Disposal Report",
    description: "Asset disposal and write-off summary",
    icon: PieChart,
    color: "bg-orange-500",
  },
  {
    id: "audit-summary",
    name: "Audit Summary",
    description: "Comprehensive audit trail and compliance report",
    icon: FileText,
    color: "bg-purple-500",
  },
  {
    id: "department-wise",
    name: "Department-wise Report",
    description: "Asset distribution across departments",
    icon: BarChart3,
    color: "bg-indigo-500",
  },
]

const quickStats = [
  {
    name: "Total Reports Generated",
    value: "1,247",
    change: "+12%",
    period: "This month",
  },
  {
    name: "Most Requested",
    value: "Asset Register",
    change: "45%",
    period: "Of all reports",
  },
  {
    name: "Average Generation Time",
    value: "2.3 sec",
    change: "-15%",
    period: "Faster than last month",
  },
  {
    name: "Export Formats",
    value: "PDF, Excel",
    change: "2 formats",
    period: "Available",
  },
]

export default function ReportsPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [dateRange, setDateRange] = useState(null)

  const generateReport = (reportType: string) => {
    // Simulate report generation
    console.log(`Generating ${reportType} report...`)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Generate comprehensive reports and insights</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.name}</CardTitle>
                <BarChart3 className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-600">
                  <span className="text-green-600">{stat.change}</span> {stat.period}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Report Filters</CardTitle>
            <CardDescription>Configure report parameters and date ranges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Date Range</label>
                <DatePickerWithRange />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Department</label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="it">IT Department</SelectItem>
                    <SelectItem value="hr">HR Department</SelectItem>
                    <SelectItem value="finance">Finance Department</SelectItem>
                    <SelectItem value="admin">Admin Department</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="it-equipment">IT Equipment</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="office-equipment">Office Equipment</SelectItem>
                    <SelectItem value="hvac">HVAC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>Generate and download various asset reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportTypes.map((report) => (
                <Card key={report.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${report.color}`}>
                      <report.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="mt-4">{report.name}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1" onClick={() => generateReport(report.id)}>
                        Generate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
            <CardDescription>Choose your preferred export format</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Export as PDF</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Export as Excel</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Schedule Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
