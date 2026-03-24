"use client"

import { Headphones, Bell, User } from "lucide-react"

export function TopHeader() {
  return (
    <div 
      className="shrink-0 px-4 pb-2 bg-white"
      style={{ paddingTop: 'max(8px, env(safe-area-inset-top))' }}
    >
      {/* Welcome Section */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <p className="text-xs text-gray-500">Bienvenido/a</p>
          <h1 className="text-base font-bold text-gray-900">Alejandra Diaz</h1>
        </div>
        <div className="flex items-center">
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors">
            <Headphones className="w-4 h-4 text-gray-600" />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors relative">
            <Bell className="w-4 h-4 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors">
            <User className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Logo and Add Vehicle */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-baseline">
            <span className="text-xl font-bold text-gray-900">Sim</span>
            <span className="text-xl font-bold text-teal-500">o</span>
            <span className="text-xl font-bold text-gray-900">n</span>
          </div>
          <p className="text-[10px] text-gray-500 -mt-0.5">Optimiza tu movilidad</p>
        </div>
        <button className="px-3 py-1.5 text-xs font-medium text-teal-600 border border-teal-500 rounded-full hover:bg-teal-50 active:bg-teal-100 transition-colors">
          Agregar vehiculo
        </button>
      </div>
    </div>
  )
}
