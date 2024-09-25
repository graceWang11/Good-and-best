/* eslint-disable react/no-unescaped-entities */
"use client"
import { Home } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-extrabold text-gray-900">404</h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Page Not Found</h2>
          <p className="mt-2 text-sm text-gray-600">Oops! The page you're looking for doesn't exist.</p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/" passHref>
              <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </div>
        
        <p className="mt-6 text-xs text-gray-500">
          If you believe this is a mistake, please contact our{' '}
          <Link href="/ContactUs" className="font-medium text-indigo-600 hover:text-indigo-500">
            support team
          </Link>.
        </p>
      </div>
    </div>
  )
}