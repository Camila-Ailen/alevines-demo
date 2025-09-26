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
import { ArrowLeft, CheckCircle, AlertTriangle, Info, ExternalLink, Play, ArrowRight, BookOpen } from "lucide-react"
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
      "Parámetros químicos: Vigilar pH, alcalinidad y dureza como indicadores de estabilidad",
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
    "Mayor crecimiento, puede alcanzar hasta 4 kg de peso",
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      
      <div className="relative z-10 p-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Enhanced Header */}
          <div className="flex items-center gap-6">
            <Link href="/">
              <Button variant="outline" size="lg" className="bg-white/80 backdrop-blur-sm border-2 border-slate-300 hover:bg-white shadow-lg">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Volver a la Calculadora
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-lg">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-800 to-cyan-700 bg-clip-text text-transparent">
                  Tutorial de Construcción
                </h1>
                <p className="text-lg text-slate-600 mt-1">Guía paso a paso para construir estanques profesionales</p>
              </div>
            </div>
          </div>

          {/* Enhanced Construction Steps */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Proceso de Construcción</h2>
              <p className="text-lg text-slate-600">Sigue estos pasos para construir tu estanque de manera profesional</p>
            </div>

            <div className="space-y-4">
              {pasosConstruccion.map((paso, index) => (
                <Dialog key={paso.id}>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-white/90 backdrop-blur-sm border-0 shadow-lg group">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-2xl text-lg font-bold shadow-lg group-hover:shadow-xl transition-shadow">
                            {paso.id}
                          </div>
                          <div className="flex gap-2">
                            <Badge 
                              variant={paso.importancia === "alta" ? "destructive" : "secondary"}
                              className={paso.importancia === "alta" ? "bg-red-100 text-red-800 border-red-200" : "bg-amber-100 text-amber-800 border-amber-200"}
                            >
                              {paso.importancia === "alta" ? "🔥 Crítico" : "⚠️ Importante"}
                            </Badge>
                            <Badge variant="outline" className="border-slate-300 text-slate-600">
                              ⏱️ {paso.tiempo}
                            </Badge>
                          </div>
                        </div>
                        <CardTitle className="text-xl leading-tight text-slate-800 group-hover:text-blue-700 transition-colors">
                          {paso.titulo}
                        </CardTitle>
                        <CardDescription className="text-base line-clamp-2 text-slate-600">
                          {paso.descripcion}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>{paso.detalles.length} pasos detallados</span>
                          </div>
                          <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                            <span>Ver detalles</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>

                  <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-white">
                    <DialogHeader className="pb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-2xl text-2xl font-bold shadow-lg">
                          {paso.id}
                        </div>
                        <div className="flex-1">
                          <DialogTitle className="text-2xl text-slate-800 mb-2">{paso.titulo}</DialogTitle>
                          <div className="flex items-center gap-3">
                            <Badge 
                              variant={paso.importancia === "alta" ? "destructive" : "secondary"}
                              className={paso.importancia === "alta" ? "bg-red-100 text-red-800 border-red-200" : "bg-amber-100 text-amber-800 border-amber-200"}
                            >
                              {paso.importancia === "alta" ? "🔥 Crítico" : "⚠️ Importante"}
                            </Badge>
                            <Badge variant="outline" className="border-slate-300 text-slate-600">
                              ⏱️ {paso.tiempo}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <DialogDescription className="text-lg text-slate-600 leading-relaxed">
                        {paso.descripcionDetallada}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                      {/* Enhanced Image */}
                      <div className="w-full h-80 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden shadow-inner">
                        <img
                          src={paso.imagen || "/placeholder.svg?height=320&width=600&query=construccion estanque piscicultura"}
                          alt={paso.titulo}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Enhanced Details */}
                      <div className="bg-slate-50 rounded-2xl p-6">
                        <h4 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          Pasos Detallados
                        </h4>
                        <ul className="space-y-3">
                          {paso.detalles.map((detalle, idx) => (
                            <li key={idx} className="flex items-start gap-3 p-3 bg-white rounded-xl shadow-sm">
                              <div className="flex items-center justify-center w-6 h-6 bg-green-100 text-green-700 rounded-full text-sm font-bold mt-0.5 flex-shrink-0">
                                {idx + 1}
                              </div>
                              <span className="text-slate-700 leading-relaxed">{detalle}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Enhanced YouTube Link */}
                      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-red-600 rounded-lg">
                            <Play className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">Tutorial en Video</h4>
                            <p className="text-sm text-slate-600">Aprende visualmente con nuestro tutorial paso a paso</p>
                          </div>
                        </div>
                        <Button asChild className="w-full h-12 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                          <a href={paso.youtubeUrl} target="_blank" rel="noopener noreferrer">
                            <Play className="h-5 w-5 mr-2" />
                            Ver Tutorial Completo en YouTube
                            <ExternalLink className="h-5 w-5 ml-2" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>

          {/* Enhanced Fish Type Tips */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Consejos por Tipo de Pez</h2>
              <p className="text-lg text-slate-600">Recomendaciones específicas según la especie seleccionada</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(consejosPorTipoPez).map(([tipo, consejos]) => (
                <Card key={tipo} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                        <Info className="h-5 w-5 text-white" />
                      </div>
                      <span className="capitalize">
                        {tipo === 'carpa' ? '🐟 Carpa' : '🐠 Pacu'}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {consejos.map((consejo, idx) => (
                        <li key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0" />
                          <span className="text-slate-700 leading-relaxed">{consejo}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Enhanced Warnings */}
          <Card className="border-0 bg-gradient-to-r from-amber-50 to-orange-50 shadow-xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl text-amber-800">
                <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                Advertencias Importantes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-white/70 rounded-xl">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-3 flex-shrink-0" />
                    <span className="text-amber-800 font-medium">Verificar permisos ambientales antes de iniciar</span>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white/70 rounded-xl">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-3 flex-shrink-0" />
                    <span className="text-amber-800 font-medium">Mantener registro de parámetros de agua</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-white/70 rounded-xl">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-3 flex-shrink-0" />
                    <span className="text-amber-800 font-medium">Plan de contingencia para emergencias</span>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white/70 rounded-xl">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-3 flex-shrink-0" />
                    <span className="text-amber-800 font-medium">Protocolo de bioseguridad establecido</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
