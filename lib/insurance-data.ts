/**
 * Simon Seguros — Mock data & types for the insurance marketplace.
 * Promotec offers MULTIPLE product tiers per category (Básica, Intermedia, Full).
 */

export type InsuranceStatus = "active" | "expiring" | "expired" | "none"

export interface InsuranceCategory {
  id: string
  label: string
  tagline: string
  heroImage: string
  emoji: string
  description: string
}

export interface InsuranceProduct {
  id: string
  categoryId: string
  tierName: string          // "Básica" | "Intermedia" | "Full"
  tierTag?: string          // "Popular" | "Recomendado" | "Premium"
  name: string
  provider: string
  price: number
  priceMonthly?: number
  dailyCost: number
  currency: string
  period: string
  highlighted?: boolean     // recommended product
  coverages: { label: string; included: boolean; limit?: string }[]
  benefits: string[]
}

export interface Policy {
  id: string
  policyNumber: string
  productName: string
  categoryId: string
  vehiclePlate: string
  vehicleModel: string
  status: InsuranceStatus
  startDate: string
  endDate: string
  price: number
  provider: string
}

export interface InsuranceNotification {
  id: string
  type: "renewal" | "confirmation" | "alert" | "recommendation"
  title: string
  message: string
  date: string
  read: boolean
  actionLabel?: string
  actionTarget?: string
}

export interface InsuredVehicle {
  plate: string
  model: string
  year: number
  type: "car" | "motorcycle" | "bicycle"
  soatExpiry: string
  soatStatus: InsuranceStatus
  protectionScore: number
}

/* ── PROMOTEC INFO ── */
export const PROMOTEC = {
  name: "Promotec",
  fullName: "Promotec Agencia de Seguros",
  years: 40,
  tagline: "+40 años protegiendo lo que más valoras",
  cert: "ISO 9001:2015 · Bureau Veritas",
  phone: "(601) 742 3700",
  email: "servicioalcliente@promotec.com.co",
}

/* ── IMAGES ── */
export const IMAGES = {
  heroVehicle: "/insurance/hero-vehicle.png",
  soatShield:  "/insurance/soat-shield.png",
  family:      "/insurance/family-protection.png",
  bike:        "/insurance/bike-hero.png",
  pet:         "/insurance/pet-hero.png",
}

/* ── VEHICLES ── */
export const MOCK_VEHICLES: InsuredVehicle[] = [
  {
    plate: "HKL 452", model: "Mercedes Benz GLE 450", year: 2024,
    type: "car", soatExpiry: "2026-05-21", soatStatus: "expiring", protectionScore: 35,
  },
  {
    plate: "UBK 71L", model: "Yamaha Z100", year: 2023,
    type: "motorcycle", soatExpiry: "2026-11-15", soatStatus: "active", protectionScore: 85,
  },
]

/* ── CATEGORIES ── */
export const CATEGORIES: InsuranceCategory[] = [
  { id: "soat",      label: "SOAT",        tagline: "Obligatorio · Siempre al día",         emoji: "🛡️", heroImage: IMAGES.soatShield, description: "Seguro Obligatorio de Accidentes de Tránsito" },
  { id: "vehiculo",  label: "Vehículos",   tagline: "Tu carro o moto protegidos",           emoji: "🚗", heroImage: IMAGES.heroVehicle, description: "Cobertura total para tu vehículo" },
  { id: "bicicleta", label: "Bicicletas",  tagline: "Pedalea sin preocupaciones",           emoji: "🚲", heroImage: IMAGES.bike, description: "Protección para tu bici o patineta" },
  { id: "vida",      label: "Vida",        tagline: "Tu familia, siempre protegida",        emoji: "❤️", heroImage: IMAGES.family, description: "Seguro de vida para tu tranquilidad" },
  { id: "hogar",     label: "Hogar",       tagline: "Tu refugio, asegurado",                emoji: "🏠", heroImage: IMAGES.family, description: "Protege tu casa contra imprevistos" },
  { id: "mascotas",  label: "Mascotas",    tagline: "Ellos también merecen protección",     emoji: "🐾", heroImage: IMAGES.pet, description: "Cobertura veterinaria para tu mascota" },
]

/* ── PRODUCTS — Multiple tiers per category ── */
export const SOAT_PRODUCTS: InsuranceProduct[] = [
  {
    id: "soat-1", categoryId: "soat", tierName: "SOAT", name: "SOAT — Seguro Obligatorio",
    provider: "Promotec", price: 999000, dailyCost: 2738, currency: "COP", period: "1 año",
    highlighted: true,
    coverages: [
      { label: "Gastos médicos",           included: true, limit: "800 SMLDV" },
      { label: "Incapacidad permanente",    included: true, limit: "180 SMLDV" },
      { label: "Muerte accidental",         included: true, limit: "750 SMLDV" },
      { label: "Gastos funerarios",         included: true, limit: "150 SMLDV" },
      { label: "Gastos de transporte",      included: true, limit: "10 SMLDV"  },
    ],
    benefits: ["Emisión instantánea", "Digital en tu Guantera", "Recordatorio automático"],
  },
]

export const VEHICLE_PRODUCTS: InsuranceProduct[] = [
  {
    id: "veh-basica", categoryId: "vehiculo", tierName: "Básica", tierTag: "Económica",
    name: "Póliza Básica", provider: "Promotec",
    price: 1400000, priceMonthly: 120000, dailyCost: 3836, currency: "COP", period: "1 año",
    coverages: [
      { label: "Responsabilidad civil",       included: true,  limit: "$300M" },
      { label: "Asistencia en vía 24/7",      included: true },
      { label: "Pérdida total por robo",       included: false },
      { label: "Pérdida parcial (daños)",      included: false },
      { label: "Conductor elegido",            included: false },
      { label: "Vehículo de reemplazo",        included: false },
    ],
    benefits: ["Grúa incluida", "Cerrajería", "Paso de corriente"],
  },
  {
    id: "veh-intermedia", categoryId: "vehiculo", tierName: "Intermedia", tierTag: "Recomendada",
    name: "Póliza Intermedia", provider: "Promotec",
    price: 2400000, priceMonthly: 205000, dailyCost: 6575, currency: "COP", period: "1 año",
    highlighted: true,
    coverages: [
      { label: "Responsabilidad civil",       included: true,  limit: "$500M" },
      { label: "Asistencia en vía 24/7",      included: true },
      { label: "Pérdida total por robo",       included: true,  limit: "Valor comercial" },
      { label: "Pérdida parcial (daños)",      included: true,  limit: "Valor comercial" },
      { label: "Conductor elegido",            included: false },
      { label: "Vehículo de reemplazo",        included: false },
    ],
    benefits: ["Grúa incluida", "Cerrajería", "Talleres autorizados", "Sin deducible robo total"],
  },
  {
    id: "veh-full", categoryId: "vehiculo", tierName: "Full", tierTag: "Premium",
    name: "Póliza Full", provider: "Promotec",
    price: 3600000, priceMonthly: 310000, dailyCost: 9863, currency: "COP", period: "1 año",
    coverages: [
      { label: "Responsabilidad civil",       included: true,  limit: "$1.000M" },
      { label: "Asistencia en vía 24/7",      included: true },
      { label: "Pérdida total por robo",       included: true,  limit: "Valor comercial" },
      { label: "Pérdida parcial (daños)",      included: true,  limit: "Valor comercial" },
      { label: "Conductor elegido",            included: true,  limit: "4 eventos/año" },
      { label: "Vehículo de reemplazo",        included: true,  limit: "Hasta 15 días" },
    ],
    benefits: ["Todo incluido", "Grúa ilimitada", "Talleres premium", "Carro de reemplazo", "Conductor elegido"],
  },
]

export const BIKE_PRODUCTS: InsuranceProduct[] = [
  {
    id: "bici-basica", categoryId: "bicicleta", tierName: "Básica", tierTag: "Económica",
    name: "Bici Básica", provider: "Promotec",
    price: 180000, priceMonthly: 16000, dailyCost: 493, currency: "COP", period: "1 año",
    coverages: [
      { label: "Responsabilidad civil",   included: true },
      { label: "Accidentes personales",   included: true },
      { label: "Hurto total",             included: false },
      { label: "Asistencia en ruta",      included: false },
    ],
    benefits: ["Cobertura básica", "RC incluida"],
  },
  {
    id: "bici-full", categoryId: "bicicleta", tierName: "Full", tierTag: "Recomendada",
    name: "Bici Full", provider: "Promotec",
    price: 350000, priceMonthly: 30000, dailyCost: 959, currency: "COP", period: "1 año",
    highlighted: true,
    coverages: [
      { label: "Responsabilidad civil",   included: true },
      { label: "Accidentes personales",   included: true },
      { label: "Hurto total",             included: true },
      { label: "Asistencia en ruta",      included: true },
    ],
    benefits: ["Cobertura total", "Grúa para bici", "Asistencia 24/7"],
  },
]

export const ALL_PRODUCTS: Record<string, InsuranceProduct[]> = {
  soat: SOAT_PRODUCTS,
  vehiculo: VEHICLE_PRODUCTS,
  bicicleta: BIKE_PRODUCTS,
  vida: [],
  hogar: [],
  mascotas: [],
}

/* ── MOCK POLICIES ── */
export const MOCK_POLICIES: Policy[] = [
  {
    id: "pol-001", policyNumber: "SOAT-2025-HKL452", productName: "SOAT",
    categoryId: "soat", vehiclePlate: "HKL 452", vehicleModel: "Mercedes Benz GLE 450",
    status: "expiring", startDate: "2025-05-21", endDate: "2026-05-21",
    price: 987000, provider: "Promotec",
  },
  {
    id: "pol-002", policyNumber: "VEH-2025-UBK71L", productName: "Póliza Intermedia",
    categoryId: "vehiculo", vehiclePlate: "UBK 71L", vehicleModel: "Yamaha Z100",
    status: "active", startDate: "2025-11-15", endDate: "2026-11-15",
    price: 1800000, provider: "Promotec",
  },
]

/* ── NOTIFICATIONS ── */
export const MOCK_NOTIFICATIONS: InsuranceNotification[] = [
  { id: "n1", type: "renewal",  title: "Tu SOAT vence en 15 días", message: "HKL 452 · Mercedes Benz GLE 450. Renuévalo en 2 minutos.",   date: "Hoy",        read: false, actionLabel: "Renovar", actionTarget: "soat" },
  { id: "n2", type: "recommendation", title: "Protege tu Mercedes Benz", message: "Sin seguro todo riesgo. Desde $3.836/día puedes protegerlo.", date: "Hace 3 días", read: true,  actionLabel: "Ver planes", actionTarget: "vehiculo" },
  { id: "n3", type: "confirmation",   title: "Póliza activa",        message: "Tu seguro para la Yamaha Z100 está activo hasta Nov 2026.", date: "Nov 2025",   read: true },
]

/* ── HELPERS ── */
export function formatCOP(n: number): string {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)
}
export function getDaysUntil(d: string): number {
  return Math.ceil((new Date(d).getTime() - Date.now()) / 86400000)
}
export function statusColor(s: InsuranceStatus): string {
  return s === "active" ? "#00f1c7" : s === "expiring" ? "#FFB800" : s === "expired" ? "#d62d30" : "#999"
}
export function statusLabel(s: InsuranceStatus): string {
  return s === "active" ? "Activo" : s === "expiring" ? "Por vencer" : s === "expired" ? "Vencido" : "Sin cobertura"
}
