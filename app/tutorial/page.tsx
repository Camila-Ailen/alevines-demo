"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, CheckCircle, AlertTriangle, Info, ExternalLink, Play } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const pasosConstruccion = [
  {
    id: 1,
    titulo: "Preparación del Terreno",
    descripcion: "Selección y acondicionamiento del sitio para la construcción",
    detalles: [
      "Uso de bañados: Son zonas no aptas para agricultura, pero ideales para piscicultura",
      "Ubicación: Las instalaciones deben estar cerca de la vivienda del productor",
      "Topografía: Pendiente ideal de 2–5%; si es mayor, construir estanques siguiendo las curvas de nivel",
      "Suelos adecuados: Arcillosos o colorados bien compactados (baja permeabilidad)",
      "Suelos inadecuados: Arenosos, rocosos o toscosos (pierden agua)",
    ],
    tiempo: "2-3 días",
    importancia: "alta",
    imagen: "/images/1_suelo.png",
    youtubeUrl: "https://www.youtube.com/watch?v=ww3GjiIeVJw",
    descripcionDetallada:
      "La preparación del terreno es fundamental para el éxito del proyecto. Un terreno bien preparado garantiza la estabilidad estructural del estanque y facilita el manejo del agua.",
  },
  {
    id: 2,
    titulo: "Excavación del Estanque",
    descripcion: "Excavación según las medidas estándar establecidas",
    detalles: [
      "Marcar las dimensiones: 20m x 50m x 2m de profundidad",
      "Excavar con pendiente hacia el desagüe",
      "Compactar las paredes y el fondo",
    ],
    tiempo: "3-5 días",
    importancia: "alta",
    imagen: "/images/2_excavacion.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=ww3GjiIeVJw",
    descripcionDetallada:
      "La excavación debe realizarse con precisión para mantener las dimensiones correctas. La pendiente hacia el desagüe es crucial para el manejo eficiente del agua.",
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
    imagen: "/images/3_tuberias.png",
    youtubeUrl: "https://www.youtube.com/watch?v=ww3GjiIeVJw",
    descripcionDetallada:
      "Un sistema de tuberías bien diseñado permite el control total del flujo de agua, esencial para mantener la calidad del agua y la salud de los peces.",
  },
  {
    id: 4,
    titulo: "Llenado y factores para el agua",
    descripcion: "Preparación del agua para recibir los peces",
    detalles: [
      "Caudal: Revisar variaciones de la fuente durante el año (sequías y lluvias)",
      "Temperatura: Controlar cambios estacionales del agua y temperaturas mínimas de 15°C, con el ideal entre 25-30°C",
      "Oxígeno y gases: Mantener adecuada concentración de oxígeno y controlar niveles de gas carbónico",
      "Parámetros químicos: Vigilar pH (6,5 - 8), alcalinidad y dureza como indicadores de estabilidad",
      "Contaminación: Prevenir ingreso de agroquímicos, patógenos o efluentes externos. El agua debe ser de un color verde",
    ],
    tiempo: "1 semana",
    importancia: "media",
    imagen: "/images/4_agua.jpeg",
    youtubeUrl: "https://www.youtube.com/watch?v=ww3GjiIeVJw",
    descripcionDetallada:
      "El acondicionamiento del agua es crucial para crear un ambiente saludable. Los parámetros químicos deben estabilizarse antes de introducir los peces.",
  },
  {
    id: 5,
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
    imagen: "/images/5_alevines.jpeg",
    youtubeUrl: "https://www.youtube.com/watch?v=ww3GjiIeVJw",
    descripcionDetallada:
      "La introducción de alevines marca el inicio de la fase productiva. Una aclimatación adecuada reduce el estrés y mejora la supervivencia.",
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
}

export default function Tutorial() {
  const [selectedPaso, setSelectedPaso] = useState<(typeof pasosConstruccion)[0] | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="sm" className="bg-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Calculadora
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tutorial de Construcción</h1>
            <p className="text-gray-600">Guía paso a paso para construir estanques de piscicultura</p>
          </div>
        </div>

        {/* Pasos de Construcción - Tarjetas Compactas */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Proceso de Construcción</h2>

          <div className="space-y-4">
            {pasosConstruccion.map((paso) => (
              <Dialog key={paso.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-white border-2 hover:border-blue-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold">
                          {paso.id}
                        </div>
                        <Badge variant={paso.importancia === "alta" ? "destructive" : "secondary"} className="text-xs">
                          {paso.importancia === "alta" ? "Crítico" : "Importante"}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight">{paso.titulo}</CardTitle>
                      <CardDescription className="text-sm line-clamp-2">{paso.descripcion}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>⏱️ {paso.tiempo}</span>
                        <span className="text-blue-600 font-medium">Ver detalles →</span>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full text-lg font-bold">
                        {paso.id}
                      </div>
                      <div>
                        <DialogTitle className="text-xl">{paso.titulo}</DialogTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={paso.importancia === "alta" ? "destructive" : "secondary"}>
                            {paso.importancia === "alta" ? "Crítico" : "Importante"}
                          </Badge>
                          <Badge variant="outline">⏱️ {paso.tiempo}</Badge>
                        </div>
                      </div>
                    </div>
                    <DialogDescription className="text-base">{paso.descripcionDetallada}</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    {/* Imagen Ilustrativa */}
                    <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={paso.imagen || "/placeholder.svg"}
                        alt={paso.titulo}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Detalles del Paso */}
                    <div>
                      <h4 className="font-semibold mb-3 text-gray-800">Pasos detallados:</h4>
                      <ul className="space-y-2">
                        {paso.detalles.map((detalle, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{detalle}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Link a YouTube */}
                    <div className="pt-4 border-t">
                      <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                        <a href={paso.youtubeUrl} target="_blank" rel="noopener noreferrer">
                          <Play className="h-4 w-4 mr-2" />
                          Ver Tutorial en YouTube
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>

        {/* Consejos por Tipo de Pez - Tarjetas Compactas */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Consejos por Tipo de Pez</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(consejosPorTipoPez).map(([tipo, consejos]) => (
              <Card key={tipo} className="bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Info className="h-5 w-5 text-blue-600" />
                    {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {consejos.slice(0, 4).map((consejo, idx) => (
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
