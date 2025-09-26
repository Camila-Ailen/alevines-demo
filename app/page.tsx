"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calculator, Wrench, BookOpen, ArrowRight, TrendingUp, Target } from "lucide-react"
import Link from "next/link"
import { useEstanqueStore, medidasEstandar, tiposPeces, getEstanqueDataForCalculation } from "@/lib/store"

export default function Dashboard() {
  const {
    cantidadEstanques,
    tipoPeces,
    mostrarCalculos,
    costos,
    setCantidadEstanques,
    setTipoPeces,
    calcularCostos,
    resetCalculos,
  } = useEstanqueStore()

  const handleCalcular = () => {
    if (tipoPeces) {
      calcularCostos()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Hero Header */}
          <div className="text-center space-y-6 py-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-800 to-cyan-700 bg-clip-text text-transparent mb-4">
                Calculadora de Estanques
              </h1>
              <span className="text-lg text-slate-600 font-medium">Sistema Profesional de Piscicultura</span>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Calcula costos precisos de construcción y analiza la rentabilidad de tu proyecto piscícola
            </p>
          </div>

          {/* Navigation Cards */}
          <div className="flex justify-center gap-6">
            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <Button variant="ghost" className="text-white hover:bg-white/20 text-lg font-semibold">
                  <Calculator className="h-6 w-6 mr-3" />
                  Calculadora Activa
                </Button>
              </CardContent>
            </Card>
            
            <Link href="/tutorial">
              <Card className="bg-white border-2 border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-blue-300">
                <CardContent className="p-6">
                  <Button variant="ghost" className="text-slate-700 hover:bg-slate-50 text-lg font-semibold">
                    <BookOpen className="h-6 w-6 mr-3" />
                    Tutorial de Construcción
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Medidas Estándar */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
                Especificaciones Técnicas Estándar
              </CardTitle>
              <CardDescription className="text-lg text-slate-600">
                Dimensiones recomendadas para estanques de piscicultura profesional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 shadow-sm">
                  <div className="text-3xl font-bold text-blue-700 mb-2">{medidasEstandar.largo}m</div>
                  <div className="text-sm font-medium text-blue-600 uppercase tracking-wide">Largo</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200 shadow-sm">
                  <div className="text-3xl font-bold text-emerald-700 mb-2">{medidasEstandar.ancho}m</div>
                  <div className="text-sm font-medium text-emerald-600 uppercase tracking-wide">Ancho</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl border border-amber-200 shadow-sm">
                  <div className="text-3xl font-bold text-amber-700 mb-2">{medidasEstandar.profundidad}m</div>
                  <div className="text-sm font-medium text-amber-600 uppercase tracking-wide">Profundidad</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 shadow-sm">
                  <div className="text-3xl font-bold text-purple-700 mb-2">{medidasEstandar.area}m²</div>
                  <div className="text-sm font-medium text-purple-600 uppercase tracking-wide">Área Total</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuración y Resultados */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Configuración del Proyecto */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  Configuración del Proyecto
                </CardTitle>
                <CardDescription className="text-base">
                  Define los parámetros específicos de tu proyecto acuícola
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="cantidad" className="text-base font-semibold text-slate-700">
                    Cantidad de Estanques
                  </Label>
                  <Input
                    id="cantidad"
                    type="number"
                    min="1"
                    value={cantidadEstanques}
                    onChange={(e) => setCantidadEstanques(Number(e.target.value))}
                    className="text-lg h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="tipo-peces" className="text-base font-semibold text-slate-700">
                    Tipo de Peces
                  </Label>
                  <Select value={tipoPeces} onValueChange={setTipoPeces}>
                    <SelectTrigger className="h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl bg-white">
                      <SelectValue placeholder="Selecciona el tipo de peces" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-slate-200 shadow-xl rounded-xl">
                      <SelectItem value="carpa" className="hover:bg-blue-50 rounded-lg m-1">
                        <div className="flex flex-col py-2">
                          <span className="font-semibold">🐟 Carpa</span>
                          <span className="text-sm text-slate-500">Resistente, crecimiento rápido</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="pacu" className="hover:bg-blue-50 rounded-lg m-1">
                        <div className="flex flex-col py-2">
                          <span className="font-semibold">🐠 Pacu</span>
                          <span className="text-sm text-slate-500">Mayor valor comercial</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {tipoPeces && (
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 font-semibold">
                        {tipoPeces.charAt(0).toUpperCase() + tipoPeces.slice(1)}
                      </Badge>
                      <Badge variant="outline" className="border-blue-300 text-blue-700">
                        Seleccionado
                      </Badge>
                    </div>
                    <p className="text-slate-700 mb-2">
                      {tiposPeces[tipoPeces as keyof typeof tiposPeces].descripcion}
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Densidad recomendada:</strong> {tiposPeces[tipoPeces as keyof typeof tiposPeces].densidad}
                    </p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={handleCalcular} 
                    className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
                    disabled={!tipoPeces}
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calcular Costos
                  </Button>
                  {mostrarCalculos && (
                    <Button 
                      onClick={resetCalculos} 
                      variant="outline" 
                      className="h-12 border-2 border-slate-300 hover:bg-slate-50 rounded-xl bg-transparent"
                    >
                      Limpiar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Resultados de Cálculos */}
            {mostrarCalculos && costos && (
              <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-0 shadow-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-xl text-emerald-800">
                    <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    Resumen de Inversión
                  </CardTitle>
                  <CardDescription className="text-base text-emerald-700">
                    Cálculo detallado para {cantidadEstanques} estanque{cantidadEstanques > 1 ? "s" : ""} con {tipoPeces}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white/70 rounded-xl border border-slate-200">
                      <span className="font-semibold text-slate-700">Materiales y Mano de Obra</span>
                      <span className="font-bold text-lg text-slate-800">${costos.materiales.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center p-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl text-white shadow-lg">
                      <span className="font-bold text-xl">Total del Proyecto</span>
                      <span className="font-bold text-2xl">${costos.total.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <span className="font-semibold text-amber-800">Costo por Estanque</span>
                      <span className="font-bold text-lg text-amber-900">${costos.porEstanque.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Link href="/tutorial">
                      <Button variant="outline" className="w-full h-12 border-2 border-slate-300 hover:bg-white rounded-xl bg-transparent">
                        <BookOpen className="h-5 w-5 mr-2" />
                        Ver Tutorial de Construcción
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </Link>

                    <Link href="/rentabilidad">
                      <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Analizar Rentabilidad
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Desglose de Materiales */}
          {mostrarCalculos && (
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">Desglose Detallado de Materiales</CardTitle>
                <CardDescription className="text-lg text-slate-600">
                  Lista completa de materiales necesarios para {cantidadEstanques} estanque
                  {cantidadEstanques > 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="text-left p-4 font-semibold text-slate-700">Material</th>
                        <th className="text-left p-4 font-semibold text-slate-700">Detalle</th>
                        <th className="text-right p-4 font-semibold text-slate-700">Cantidad por Estanque</th>
                        <th className="text-right p-4 font-semibold text-slate-700">Cantidad Total</th>
                        <th className="text-right p-4 font-semibold text-slate-700">Precio Unitario</th>
                        <th className="text-right p-4 font-semibold text-slate-700">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getEstanqueDataForCalculation(tipoPeces).map((item, index) => (
                        <tr key={item.id} className={`border-b border-slate-100 hover:bg-slate-50 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}`}>
                          <td className="p-4 font-medium text-slate-800">{item.name}</td>
                          <td className="p-4 text-slate-600">{item.detail}</td>
                          <td className="p-4 text-right text-slate-700">{item.cant}</td>
                          <td className="p-4 text-right text-slate-700">{item.cant * cantidadEstanques}</td>
                          <td className="p-4 text-right text-slate-700">${item.price.toLocaleString()}</td>
                          <td className="p-4 text-right font-bold text-slate-800">
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
    </div>
  )
}
