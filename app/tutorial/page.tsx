import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, AlertTriangle, Info } from "lucide-react"
import Link from "next/link"

const pasosConstruccion = [
  {
    id: 1,
    titulo: "Preparación del Terreno",
    descripcion: "Selección y acondicionamiento del sitio para la construcción",
    detalles: [
      "Elegir terreno con ligera pendiente (1-2%)",
      "Verificar acceso a fuente de agua confiable",
      "Realizar análisis de suelo para determinar permeabilidad",
      "Limpiar y nivelar el área designada",
    ],
    tiempo: "2-3 días",
    importancia: "alta",
  },
  {
    id: 2,
    titulo: "Excavación del Estanque",
    descripcion: "Excavación según las medidas estándar establecidas",
    detalles: [
      "Marcar las dimensiones: 10m x 5m x 1.5m de profundidad",
      "Excavar con pendiente hacia el desagüe",
      "Compactar las paredes y el fondo",
      "Instalar sistema de drenaje en el punto más bajo",
    ],
    tiempo: "3-5 días",
    importancia: "alta",
  },
  {
    id: 3,
    titulo: "Instalación de Tuberías",
    descripcion: "Sistema de entrada y salida de agua",
    detalles: [
      "Instalar tubería de entrada (caño 6mm)",
      "Colocar codos y conexiones T según diseño",
      "Instalar válvulas de control de flujo",
      "Probar el sistema antes del llenado",
    ],
    tiempo: "1-2 días",
    importancia: "alta",
  },
  {
    id: 4,
    titulo: "Impermeabilización",
    descripcion: "Sellado del estanque para evitar filtraciones",
    detalles: [
      "Aplicar arcilla compactada en paredes y fondo",
      "Instalar geomembrana si es necesario",
      "Verificar que no haya objetos punzantes",
      "Realizar prueba de llenado parcial",
    ],
    tiempo: "2-3 días",
    importancia: "media",
  },
  {
    id: 5,
    titulo: "Llenado y Acondicionamiento",
    descripcion: "Preparación del agua para recibir los peces",
    detalles: [
      "Llenar gradualmente el estanque",
      "Verificar pH del agua (6.5-8.5)",
      "Instalar sistema de aireación si es necesario",
      "Dejar reposar el agua 3-5 días antes de introducir peces",
    ],
    tiempo: "1 semana",
    importancia: "media",
  },
  {
    id: 6,
    titulo: "Introducción de Alevines",
    descripcion: "Siembra de los peces juveniles",
    detalles: [
      "Verificar temperatura del agua (22-28°C)",
      "Aclimatar los alevines gradualmente",
      "Introducir según densidad recomendada por especie",
      "Monitorear comportamiento los primeros días",
    ],
    tiempo: "1 día",
    importancia: "alta",
  },
]

const consejosPorTipoPez = {
  carpa: [
    "Las carpas son resistentes a cambios de temperatura",
    "Pueden vivir en aguas con menor oxígeno",
    "Crecimiento rápido, cosecha en 8-12 meses",
    "Alimentación omnívora, acepta alimento balanceado",
  ],
  pacu: [
    "Requiere agua más limpia y oxigenada",
    "Temperatura óptima: 24-28°C",
    "Mayor valor comercial por kg",
    "Alimentación principalmente herbívora",
  ],
  ambos: [
    "Permite diversificar riesgos y mercados",
    "Separar por tamaños para evitar competencia",
    "Monitorear parámetros de agua más frecuentemente",
    "Planificar alimentación diferenciada",
  ],
}

export default function Tutorial() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Calculadora
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tutorial de Construcción</h1>
            <p className="text-gray-600">Guía paso a paso para construir estanques de piscicultura</p>
          </div>
        </div>

        {/* Pasos de Construcción */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Proceso de Construcción</h2>

          {pasosConstruccion.map((paso, index) => (
            <Card key={paso.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold">
                      {paso.id}
                    </div>
                    {paso.titulo}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={paso.importancia === "alta" ? "destructive" : "secondary"}>
                      {paso.importancia === "alta" ? "Crítico" : "Importante"}
                    </Badge>
                    <Badge variant="outline">{paso.tiempo}</Badge>
                  </div>
                </div>
                <CardDescription>{paso.descripcion}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {paso.detalles.map((detalle, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{detalle}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Consejos por Tipo de Pez */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Consejos por Tipo de Pez</h2>

          {Object.entries(consejosPorTipoPez).map(([tipo, consejos]) => (
            <Card key={tipo}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {consejos.map((consejo, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{consejo}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Advertencias Importantes */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              Advertencias Importantes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="space-y-2 text-sm text-yellow-800">
              <li>• Verificar permisos ambientales antes de iniciar la construcción</li>
              <li>• Mantener registro de parámetros de agua durante todo el proceso</li>
              <li>• Contar con plan de contingencia para cortes de energía o sequías</li>
              <li>• Establecer protocolo de bioseguridad para prevenir enfermedades</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
