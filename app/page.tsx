"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calculator, Fish, Wrench, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"

// Datos de materiales y costos
const estanqueData = [
  { id: 1, name: "cano", detail: "6 mm", price: 6000, cant: 3 },
  { id: 2, name: "codo", detail: "", price: 15200, cant: 3 },
  { id: 3, name: "cano T", detail: "", price: 2000, cant: 3 },
  { id: 4, name: "maquina", detail: "Mano de obra subsidiada", price: 120000, cant: 20 },
  { id: 5, name: "alevines", detail: "peces para recria", price: 200, cant: 400 },
]

// Medidas estándar de estanques
const medidasEstandar = {
  largo: 50, // metros
  ancho: 20, // metros
  profundidad: 2, // metros
  volumen: 100, // metros cúbicos
}

// Tipos de peces y sus requerimientos
const tiposPeces = {
  carpa: { densidad: 5, costoExtra: 0, descripcion: "Resistente, crecimiento rápido" },
  pacu: { densidad: 3, costoExtra: 1000, descripcion: "Mayor valor comercial, requiere más cuidado" },
  ambos: { densidad: 4, costoExtra: 500, descripcion: "Diversificación de producción" },
}

export default function Dashboard() {
  const [cantidadEstanques, setCantidadEstanques] = useState<number>(1)
  const [tipoPeces, setTipoPeces] = useState<string>("")
  const [mostrarCalculos, setMostrarCalculos] = useState(false)

  const calcularCostos = () => {
    if (!tipoPeces) return null

    const costoMateriales = estanqueData.reduce((total, item) => {
      return total + item.price * item.cant * cantidadEstanques
    }, 0)

    const costoTipoPeces = tiposPeces[tipoPeces as keyof typeof tiposPeces].costoExtra * cantidadEstanques
    const costoTotal = costoMateriales + costoTipoPeces

    return {
      materiales: costoMateriales,
      tipoPeces: costoTipoPeces,
      total: costoTotal,
      porEstanque: costoTotal / cantidadEstanques,
    }
  }

  const costos = calcularCostos()

  const handleCalcular = () => {
    if (tipoPeces) {
      setMostrarCalculos(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Fish className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Calculadora de Estanques</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sistema profesional para calcular costos de construcción de estanques para piscicultura
          </p>
        </div>

        {/* Navegación */}
        <div className="flex justify-center gap-4">
          <Button variant="default" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Calculadora
          </Button>
          <Link href="/tutorial">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <BookOpen className="h-4 w-4" />
              Tutorial
            </Button>
          </Link>
        </div>

        {/* Medidas Estándar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Medidas Estándar de Estanques
            </CardTitle>
            <CardDescription>Especificaciones técnicas recomendadas para estanques de piscicultura</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{medidasEstandar.largo}m</div>
                <div className="text-sm text-gray-600">Largo</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{medidasEstandar.ancho}m</div>
                <div className="text-sm text-gray-600">Ancho</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{medidasEstandar.profundidad}m</div>
                <div className="text-sm text-gray-600">Profundidad</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{medidasEstandar.volumen}m³</div>
                <div className="text-sm text-gray-600">Volumen</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuración del Proyecto */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración del Proyecto</CardTitle>
              <CardDescription>Especifica los detalles de tu proyecto de piscicultura</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cantidad">Cantidad de Estanques</Label>
                <Input
                  id="cantidad"
                  type="number"
                  min="1"
                  value={cantidadEstanques}
                  onChange={(e) => setCantidadEstanques(Number(e.target.value))}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo-peces">Tipo de Peces</Label>
                <Select value={tipoPeces} onValueChange={setTipoPeces}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo de peces" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="carpa">
                      <div className="flex flex-col">
                        <span>Carpa</span>
                        <span className="text-xs text-gray-500">Resistente, crecimiento rápido</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="pacu">
                      <div className="flex flex-col">
                        <span>Pacu</span>
                        <span className="text-xs text-gray-500">Mayor valor comercial</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="ambos">
                      <div className="flex flex-col">
                        <span>Ambos (Carpa + Pacu)</span>
                        <span className="text-xs text-gray-500">Diversificación</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {tipoPeces && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Badge variant="secondary" className="mb-2">
                    {tipoPeces.charAt(0).toUpperCase() + tipoPeces.slice(1)}
                  </Badge>
                  <p className="text-sm text-gray-600">
                    {tiposPeces[tipoPeces as keyof typeof tiposPeces].descripcion}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Densidad recomendada: {tiposPeces[tipoPeces as keyof typeof tiposPeces].densidad} peces/m³
                  </p>
                </div>
              )}

              <Button onClick={handleCalcular} className="w-full" disabled={!tipoPeces}>
                <Calculator className="h-4 w-4 mr-2" />
                Calcular Costos
              </Button>
            </CardContent>
          </Card>

          {/* Resultados de Cálculos */}
          {mostrarCalculos && costos && (
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Resumen de Costos</CardTitle>
                <CardDescription>
                  Cálculo detallado para {cantidadEstanques} estanque{cantidadEstanques > 1 ? "s" : ""} con {tipoPeces}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Materiales y Mano de Obra</span>
                    <span className="font-bold">${costos.materiales.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Costo por Tipo de Peces</span>
                    <span className="font-bold">${costos.tipoPeces.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
                    <span className="font-bold text-lg">Total del Proyecto</span>
                    <span className="font-bold text-xl text-green-600">${costos.total.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium">Costo por Estanque</span>
                    <span className="font-bold">${costos.porEstanque.toLocaleString()}</span>
                  </div>
                </div>

                <Link href="/tutorial">
                  <Button variant="outline" className="w-full bg-transparent">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Ver Tutorial de Construcción
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Desglose de Materiales */}
        {mostrarCalculos && (
          <Card>
            <CardHeader>
              <CardTitle>Desglose Detallado de Materiales</CardTitle>
              <CardDescription>
                Lista completa de materiales necesarios para {cantidadEstanques} estanque
                {cantidadEstanques > 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Material</th>
                      <th className="text-left p-2">Detalle</th>
                      <th className="text-right p-2">Cantidad por Estanque</th>
                      <th className="text-right p-2">Cantidad Total</th>
                      <th className="text-right p-2">Precio Unitario</th>
                      <th className="text-right p-2">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estanqueData.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="p-2 font-medium">{item.name}</td>
                        <td className="p-2 text-gray-600">{item.detail}</td>
                        <td className="p-2 text-right">{item.cant}</td>
                        <td className="p-2 text-right">{item.cant * cantidadEstanques}</td>
                        <td className="p-2 text-right">${item.price.toLocaleString()}</td>
                        <td className="p-2 text-right font-bold">
                          ${(item.price * item.cant * cantidadEstanques).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
