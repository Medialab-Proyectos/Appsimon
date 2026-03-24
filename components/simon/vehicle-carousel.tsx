"use client"

import { useState, useRef, useCallback } from "react"
import { MapPin, FileText, Shield, Folder, Navigation } from "lucide-react"

interface Vehicle {
  plate: string
  model: string
  tagStatus: string
  hasRestriction: boolean
  soatDate: string
  rtmDate: string
  todayDistance: string
}

const vehicles: Vehicle[] = [
  {
    plate: "HKL 452",
    model: "Mercedes benz gle 450",
    tagStatus: "TAG ACTIVO",
    hasRestriction: true,
    soatDate: "08/07/26",
    rtmDate: "08/07/26",
    todayDistance: "23.2 Km",
  },
  {
    plate: "UBI 123",
    model: "Yamaha MT-07",
    tagStatus: "TAG ACTIVO",
    hasRestriction: false,
    soatDate: "12/03/26",
    rtmDate: "12/03/26",
    todayDistance: "15.8 Km",
  },
  {
    plate: "ABC 789",
    model: "Toyota Corolla",
    tagStatus: "SIN TAG",
    hasRestriction: true,
    soatDate: "05/11/26",
    rtmDate: "05/11/26",
    todayDistance: "45.3 Km",
  },
  {
    plate: "XYZ 456",
    model: "Honda Civic",
    tagStatus: "TAG ACTIVO",
    hasRestriction: false,
    soatDate: "09/02/26",
    rtmDate: "09/02/26",
    todayDistance: "8.1 Km",
  },
]

export function VehicleCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const isDragging = useRef(false)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    isDragging.current = true
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false
    
    const diff = touchStartX.current - touchEndX.current
    const threshold = 50

    if (diff > threshold && activeIndex < vehicles.length - 1) {
      setActiveIndex((prev) => prev + 1)
    } else if (diff < -threshold && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1)
    }
  }, [activeIndex])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    touchStartX.current = e.clientX
    isDragging.current = true
  }, [])

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging.current) return
      isDragging.current = false
      
      touchEndX.current = e.clientX
      const diff = touchStartX.current - touchEndX.current
      const threshold = 50

      if (diff > threshold && activeIndex < vehicles.length - 1) {
        setActiveIndex((prev) => prev + 1)
      } else if (diff < -threshold && activeIndex > 0) {
        setActiveIndex((prev) => prev - 1)
      }
    },
    [activeIndex]
  )

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex
    const absDistance = Math.abs(diff)
    
    // 3D transformations
    const translateX = diff * 70
    const scale = 1 - absDistance * 0.1
    const rotateY = diff * -10
    const translateZ = -absDistance * 60
    const opacity = absDistance > 1 ? 0 : 1 - absDistance * 0.35
    const zIndex = vehicles.length - absDistance

    return {
      transform: `translateX(${translateX}%) perspective(1000px) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
      opacity: Math.max(opacity, 0),
      zIndex,
      pointerEvents: absDistance > 1 ? 'none' as const : 'auto' as const,
    }
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Carousel Container with 3D effect */}
      <div
        className="relative flex-1 min-h-0"
        style={{ perspective: "1000px" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => { isDragging.current = false }}
      >
        <div className="absolute inset-0 flex items-center justify-center px-6 py-3">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="absolute w-[78%] max-w-[300px] transition-all duration-500 ease-out cursor-grab active:cursor-grabbing"
              style={getCardStyle(index)}
            >
              <VehicleCardItem 
                vehicle={vehicle} 
                isActive={index === activeIndex} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex items-center justify-center gap-1.5 py-2 shrink-0">
        {vehicles.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? "w-5 h-1.5 bg-teal-500" 
                : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to vehicle ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

function VehicleCardItem({ vehicle, isActive }: { vehicle: Vehicle; isActive: boolean }) {
  return (
    <div
      className={`relative bg-white rounded-2xl p-4 border border-gray-200 transition-all duration-300`}
      style={{
        boxShadow: isActive 
          ? '0 8px 30px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)'
          : '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Vehicle Image */}
      <div className="flex justify-center mb-3">
        <div 
          className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200"
          style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}
        >
          <div className="text-3xl">🚗</div>
        </div>
      </div>

      {/* Plate and Status */}
      <div className="flex items-center justify-center gap-2 mb-1">
        <h2 className="text-lg font-bold text-gray-900">{vehicle.plate}</h2>
        <span
          className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-full ${
            vehicle.tagStatus === "TAG ACTIVO"
              ? "text-teal-700 bg-teal-50 border border-teal-200"
              : "text-orange-700 bg-orange-50 border border-orange-200"
          }`}
        >
          {vehicle.tagStatus}
        </span>
      </div>

      {/* Model */}
      <p className="text-center text-xs text-gray-500 mb-3">{vehicle.model}</p>

      {/* Restriction Warning */}
      {vehicle.hasRestriction && (
        <div className="flex items-center justify-center gap-1.5 mb-3 px-3 py-1.5 bg-red-50 border border-red-100 rounded-lg">
          <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
            <MapPin className="w-2.5 h-2.5 text-white" />
          </div>
          <span className="text-[10px] text-red-700">
            Pico y placa: <span className="font-semibold">TIENES RESTRICCION</span>
          </span>
        </div>
      )}

      {/* SOAT and RTM */}
      <div className="flex items-center justify-center gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[10px] text-gray-500">
            SOAT <span className="font-semibold text-gray-700">{vehicle.soatDate}</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[10px] text-gray-500">
            RTM <span className="font-semibold text-gray-700">{vehicle.rtmDate}</span>
          </span>
        </div>
      </div>

      {/* Info Buttons */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full">
          <Navigation className="w-3.5 h-3.5 text-gray-500" />
          <div className="text-left">
            <p className="text-[8px] text-gray-400 leading-tight">Recorrido:</p>
            <p className="text-xs font-semibold text-gray-800">{vehicle.todayDistance}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border border-gray-200 rounded-full">
          <Folder className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-xs text-gray-700">Guantera</span>
        </div>
      </div>

      {/* View Details Button */}
      <button className="w-full py-2.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 text-sm font-medium rounded-full transition-colors">
        Ver detalles
      </button>
    </div>
  )
}
