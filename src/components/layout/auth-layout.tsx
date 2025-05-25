import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import RedirectIfAuthenticated from '../auth/auth-route-protection'

interface AuthLayoutProps {
  children: React.ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  // State for dynamic numbers
  const [concreteAmount, setConcreteAmount] = useState(8)
  const [steelAmount, setSteelAmount] = useState(25)
  const [bricksAmount, setBricksAmount] = useState(8000)
  const [glassAmount, setGlassAmount] = useState(40)
  const [schedulePercentage, setSchedulePercentage] = useState(75)

  // Update numbers every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Random adjustments within reasonable ranges
      setConcreteAmount((prev) =>
        Math.max(5, Math.min(15, prev + Math.floor(Math.random() * 3) - 1))
      )
      setSteelAmount((prev) =>
        Math.max(20, Math.min(40, prev + Math.floor(Math.random() * 5) - 2))
      )
      setBricksAmount((prev) =>
        Math.max(
          5000,
          Math.min(12000, prev + Math.floor(Math.random() * 1000) - 500)
        )
      )
      setGlassAmount((prev) =>
        Math.max(30, Math.min(60, prev + Math.floor(Math.random() * 6) - 3))
      )
      setSchedulePercentage((prev) =>
        Math.max(70, Math.min(95, prev + Math.floor(Math.random() * 5) - 2))
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const pathname = usePathname()

  return (
    <RedirectIfAuthenticated>
    <div className="min-h-screen flex">
      {/* Left Side - Auth */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between px-6 py-8">
        {/* Top Navigation */}
        <div className="flex justify-end items-center mb-2">
          <div className="text-sm">
            {pathname.toString().includes('login') ? (
              <Link prefetch={true} href="register" className="text-yellow-600 hover:underline">
                <span className="text-black">{"Don't have an account? "}</span>{' '}
                Signup
              </Link>
            ) : (
              <Link prefetch={true} href="login" className="text-yellow-600 hover:underline">
                <span className="text-black">Already have an account?</span>{' '}
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Center Logo and Form */}
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="mb-6">
            {/* <img src="/logo-construction.svg" alt="Logo" className="h-12" /> */}
          </div>

          {/* Form Content */}
          <div className="w-full max-w-md">{children}</div>
          <div className="flex justify-start items-start mb-2 mt-4">
          
        </div>
        {pathname.toString().includes('login') && <div className="text-sm justify-start items-start">
            <Link prefetch={true} href="forgot-password" className="text-yellow-600 hover:underline">
                <span className="text-black">Forgot Password?</span>
              </Link>
          </div>}
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500 mt-8 space-y-4">
          {/* <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" className="accent-yellow-500" />
            <label htmlFor="terms">
              I accept{' '}
              <a href="#" className="text-yellow-600 underline">
                Terms of Service and Privacy Policy
              </a>
            </label>
          </div> */}

          {/* <div className="flex items-start space-x-2">
            <input type="checkbox" id="marketing" className="accent-yellow-500 mt-1" />
            <label htmlFor="marketing" className="text-justify">
              I consent to receiving updates about construction materials and scheduling news.
            </label>
          </div>

          <div className="mt-6">
            &copy; 2025 Arch Kalinga.
          </div>

          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-yellow-600 underline">Terms and Conditions</a>
            <a href="#" className="text-yellow-600 underline">Privacy Policy</a>
          </div> */}
        </div>
      </div>

      {/* Right Side - Marketing */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-b from-white to-gray-100 flex-col justify-center items-center p-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 leading-tight">
            Arch Kalinga.
            <br />
            <span className="text-yellow-500">Construction Materials.</span>
            <br />
            Scheduling.
          </h2>
          <p className="mt-6 text-gray-600 max-w-md mx-auto">
            Join Arch Kalinga - Scheduling App and simplify the planning and
            management of your construction materials. Save time, reduce costs,
            and keep projects on track.
          </p>

          {/* Fake Analytics/Planning Cards */}
          <div className="mt-12 flex flex-col gap-8">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-800 text-xl font-semibold mb-4">
                Upcoming Deliveries
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Concrete</span>
                  <span className="transition-all duration-500">
                    {concreteAmount} tons
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Steel Beams</span>
                  <span className="transition-all duration-500">
                    {steelAmount} units
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Bricks</span>
                  <span className="transition-all duration-500">
                    {bricksAmount.toLocaleString()} pcs
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Glass Panels</span>
                  <span className="transition-all duration-500">
                    {glassAmount} pcs
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-800 text-xl font-semibold mb-4">
                Schedule Overview
              </h3>
              <div className="flex justify-center">
                {/* Dynamic Progress Chart */}
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full border-8 border-gray-200" />
                  <div
                    className="absolute inset-0 rounded-full border-8 border-transparent border-t-yellow-400 transition-all duration-700"
                    style={{
                      transform: `rotate(${schedulePercentage * 3.6}deg)`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
                    {schedulePercentage}%
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600 transition-all duration-500">
                {schedulePercentage}% of materials scheduled
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </RedirectIfAuthenticated>
  )
}
