import Image from "next/image"
import Link from "next/link"
import {
  Package,
  TrendingDown,
  ArrowRightLeft,
  Trash2,
  BarChart3,
  Users,
  Shield,
  Clock,
  CheckCircle,
  FileText,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const modules = [
  {
    name: "Asset Registry",
    description: "Comprehensive asset tracking and management",
    icon: Package,
    color: "bg-blue-500",
  },
  {
    name: "Depreciation",
    description: "Automated depreciation calculations and reporting",
    icon: TrendingDown,
    color: "bg-red-500",
  },
  {
    name: "Movement & Transfer",
    description: "Asset transfer workflows and approvals",
    icon: ArrowRightLeft,
    color: "bg-green-500",
  },
  {
    name: "Disposal Management",
    description: "Handle asset disposal and write-offs",
    icon: Trash2,
    color: "bg-orange-500",
  },
  {
    name: "Reports & Analytics",
    description: "Comprehensive reporting and insights",
    icon: BarChart3,
    color: "bg-purple-500",
  },
  {
    name: "User Management",
    description: "Role-based access control and permissions",
    icon: Users,
    color: "bg-indigo-500",
  },
]

const benefits = [
  {
    name: "Automation",
    description: "Streamline asset lifecycle processes",
    icon: Clock,
  },
  {
    name: "Accuracy",
    description: "Eliminate manual errors and inconsistencies",
    icon: CheckCircle,
  },
  {
    name: "Compliance",
    description: "Meet regulatory and audit requirements",
    icon: Shield,
  },
  {
    name: "Audit-Ready",
    description: "Complete audit trails and documentation",
    icon: FileText,
  },
]

const userRoles = [
  {
    role: "System Administrator",
    description: "Full system access and user management",
    capabilities: ["User Management", "System Settings", "All Modules"],
  },
  {
    role: "Asset Manager",
    description: "Asset lifecycle and workflow management",
    capabilities: ["Asset Registry", "Transfers", "Disposal", "Reports"],
  },
  {
    role: "Department Head",
    description: "Department asset oversight and approvals",
    capabilities: ["Department Assets", "Transfer Approvals", "Reports"],
  },
  {
    role: "Asset Custodian",
    description: "Asset maintenance and basic operations",
    capabilities: ["Asset Updates", "Transfer Requests", "Basic Reports"],
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Image src="/aust-logo.svg" alt="AUST" width={40} height={40} />
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">FAMS</h1>
                <p className="text-xs text-gray-500">Fixed Asset Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Fixed Asset Management System
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              Streamline, Secure, and Sustain AUST's Asset Lifecycle with comprehensive tracking, automated workflows,
              and intelligent reporting.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/login">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Login to System
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Learn More <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Overview */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Core Modules</h2>
            <p className="mt-4 text-lg text-gray-600">Comprehensive tools for complete asset lifecycle management</p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <Card key={module.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${module.color}`}>
                    <module.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="mt-4">{module.name}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why FAMS */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Why Choose FAMS?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Built specifically for educational institutions with enterprise-grade features
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.name} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <benefit.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">{benefit.name}</h3>
                <p className="mt-2 text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">User Roles & Capabilities</h2>
            <p className="mt-4 text-lg text-gray-600">
              Role-based access control ensures security and appropriate permissions
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {userRoles.map((role) => (
              <Card key={role.role}>
                <CardHeader>
                  <CardTitle className="text-lg">{role.role}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {role.capabilities.map((capability) => (
                      <Badge key={capability} variant="secondary" className="mr-2">
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center">
                <Image src="/aust-logo.svg" alt="AUST" width={40} height={40} className="invert" />
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-white">FAMS</h3>
                  <p className="text-sm text-gray-400">Fixed Asset Management System</p>
                </div>
              </div>
              <p className="mt-4 text-gray-400 max-w-md">
                Comprehensive asset management solution for Ahsanullah University of Science and Technology.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/login" className="text-gray-400 hover:text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Contact</h3>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>AUST Campus</li>
                <li>Dhaka, Bangladesh</li>
                <li>support@aust.edu</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8">
            <p className="text-center text-gray-400">
              © 2024 Ahsanullah University of Science and Technology. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
