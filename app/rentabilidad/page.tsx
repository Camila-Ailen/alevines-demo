"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, DollarSign, Calendar, Target, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useRentabilidadStore } from "@/lib/rentabilidad-store"
import { useEstanqueStore } from "@/lib/store"
import { useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function RentabilidadPage() {
  const { datos, proyecciones, puntoEquilibrio, setDatos, calcularProyecciones, resetDatos } = useRentabilidadStore()
  const { cantidadEstanques, tipoPeces, costos } = useEstanqueStore()

  // Inicializar con datos del proyecto principal
  useEffect(() => {
    if (costos) {
      setDatos({
        cantidadEstanques,
        tipoPeces,
        inversionInicial: costos.total,
        alevinosPorEstanque: 400,
      })
    }
  }, [cantidadEstanques, tipoPeces, costos, setDatos])

  const handleCalcular = () => {
    calcularProyecciones()
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const chartData = proyecciones.map((p) => ({
    mes: p.mes,
    ciclo: `Ciclo ${p.ciclo}`,
    ingresoNeto: p.ingresoNeto,
    flujoAcumulado: p.flujoAcumulado,
    roi: p.roi,
    ingresosBrutos: p.ingresosBrutos,
    costosOperativos: p.costosOperativos,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/">
                <Button variant="outline" size="lg" className="bg-white/80 backdrop-blur-sm border-2 border-slate-300 hover:bg-white shadow-lg">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Volver a la Calculadora
                </Button>
              </Link>
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-emerald-600 to-green-600 rounded-2xl shadow-lg">
                  <TrendingUp className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-800 to-green-700 bg-clip-text text-transparent">
                    Análisis de Rentabilidad
                  </h1>
                  <p className="text-lg text-slate-600 mt-1">Proyección de ganancias y viabilidad económica</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Project Summary */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                Resumen del Proyecto Base
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 shadow-sm">
                  <div className="text-3xl font-bold text-blue-700 mb-2">{datos.cantidadEstanques}</div>
                  <div className="text-sm font-medium text-blue-600 uppercase tracking-wide">Estanques</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200 shadow-sm">
                  <div className="text-xl font-bold text-emerald-700 mb-2 capitalize">{datos.tipoPeces}</div>
                  <div className="text-sm font-medium text-emerald-600 uppercase tracking-wide">Tipo de Peces</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl border border-amber-200 shadow-sm">
                  <div className="text-lg font-bold text-amber-700 mb-2">{formatCurrency(datos.inversionInicial)}</div>
                  <div className="text-sm font-medium text-amber-600 uppercase tracking-wide">Inversión Inicial</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 shadow-sm">
                  <div className="text-3xl font-bold text-purple-700 mb-2">{datos.alevinosPorEstanque}</div>
                  <div className="text-sm font-medium text-purple-600 uppercase tracking-wide">Alevines/Estanque</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Configuration Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  Precios de Venta
                </CardTitle>
                <CardDescription className="text-base">Precios por kilogramo de pescado en el mercado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-slate-700">Precio Carpa ($/kg)</Label>
                  <Input
                    type="number"
                    value={datos.precioCarpaKg}
                    onChange={(e) => setDatos({ precioCarpaKg: Number(e.target.value) })}
                    className="h-12 border-2 border-slate-200 focus:border-emerald-500 rounded-xl"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-slate-700">Precio Pacu ($/kg)</Label>
                  <Input
                    type="number"
                    value={datos.precioPacuKg}
                    onChange={(e) => setDatos({ precioPacuKg: Number(e.target.value) })}
                    className="h-12 border-2 border-slate-200 focus:border-emerald-500 rounded-xl"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  Costos Operativos
                </CardTitle>
                <CardDescription className="text-base">Gastos recurrentes por ciclo de producción</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-slate-700">Costo Alimento ($/kg)</Label>
                  <Input
                    type="number"
                    value={datos.costoAlimentoKg}
                    onChange={(e) => setDatos({ costoAlimentoKg: Number(e.target.value) })}
                    className="h-12 border-2 border-slate-200 focus:border-red-500 rounded-xl"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-slate-700">Conversión Alimenticia</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={datos.conversionAlimenticia}
                    onChange={(e) => setDatos({ conversionAlimenticia: Number(e.target.value) })}
                    className="h-12 border-2 border-slate-200 focus:border-red-500 rounded-xl"
                  />
                  <p className="text-sm text-slate-500">kg de alimento por kg de pez producido</p>
                </div>
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-slate-700">Costo Cal por Ciclo ($)</Label>
                  <Input
                    type="number"
                    value={datos.costoCalCiclo}
                    onChange={(e) => setDatos({ costoCalCiclo: Number(e.target.value) })}
                    className="h-12 border-2 border-slate-200 focus:border-red-500 rounded-xl"
                  />
                </div>
              </CardContent>
            </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                Parámetros de Producción
              </CardTitle>
              <CardDescription className="text-base">Características clave del ciclo productivo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-semibold text-slate-700">Duración del Ciclo (meses)</Label>
                <Input
                  type="number"
                  value={datos.duracionCicloMeses}
                  onChange={(e) => setDatos({ duracionCicloMeses: Number(e.target.value) })}
                  className="h-12 border-2 border-slate-200 focus:border-amber-500 rounded-xl"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-base font-semibold text-slate-700">Peso Promedio Carpa (kg)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={datos.pesoPromedioCarpa}
                  onChange={(e) => setDatos({ pesoPromedioCarpa: Number(e.target.value) })}
                  className="h-12 border-2 border-slate-200 focus:border-amber-500 rounded-xl"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-base font-semibold text-slate-700">Peso Promedio Pacu (kg)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={datos.pesoPromedioPacu}
                  onChange={(e) => setDatos({ pesoPromedioPacu: Number(e.target.value) })}
                  className="h-12 border-2 border-slate-200 focus:border-amber-500 rounded-xl"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-base font-semibold text-slate-700">Supervivencia (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={datos.supervivencia * 100}
                  onChange={(e) => setDatos({ supervivencia: Number(e.target.value) / 100 })}
                  className="h-12 border-2 border-slate-200 focus:border-amber-500 rounded-xl"
                />
                <p className="text-sm text-slate-500">80% = 20% de pérdida considerada</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg">
                  <Target className="h-5 w-5 text-white" />
                </div>
                Acciones
              </CardTitle>
              <CardDescription className="text-base">Calcular proyecciones y análisis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button onClick={handleCalcular} className="w-full h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow">
                <TrendingUp className="h-5 w-5 mr-2" />
                Calcular Proyecciones
              </Button>
              <Button onClick={resetDatos} variant="outline" className="w-full h-14 rounded-xl border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white shadow-md transition-colors">
                Resetear Datos
              </Button>

              {puntoEquilibrio && (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="h-6 w-6 text-emerald-600" />
                    <span className="font-semibold text-emerald-800 text-lg">Punto de Equilibrio</span>
                  </div>
                  <p className="text-emerald-700 text-base">
                    Mes <strong>{puntoEquilibrio}</strong> - Recuperación de la inversión
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          </div>

          {/* Enhanced Metrics and Charts */}
          {proyecciones.length > 0 && (
            <>
              {/* Enhanced Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-emerald-500 to-green-500 border-0 shadow-xl text-white">
                  <CardContent className="p-6 text-center">
                    <DollarSign className="h-10 w-10 mx-auto mb-3 opacity-90" />
                    <div className="text-2xl font-bold mb-2">
                      {formatCurrency(proyecciones[proyecciones.length - 1]?.flujoAcumulado || 0)}
                    </div>
                    <div className="text-sm opacity-90 font-medium">Ganancia Total (10 años)</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 border-0 shadow-xl text-white">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-10 w-10 mx-auto mb-3 opacity-90" />
                    <div className="text-2xl font-bold mb-2">
                      {proyecciones[proyecciones.length - 1]?.roi.toFixed(1) || 0}%
                    </div>
                    <div className="text-sm opacity-90 font-medium">ROI Final</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-pink-500 border-0 shadow-xl text-white">
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-10 w-10 mx-auto mb-3 opacity-90" />
                    <div className="text-2xl font-bold mb-2">{puntoEquilibrio || "N/A"}</div>
                    <div className="text-sm opacity-90 font-medium">Meses al Equilibrio</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-500 to-orange-500 border-0 shadow-xl text-white">
                  <CardContent className="p-6 text-center">
                    <BarChart3 className="h-10 w-10 mx-auto mb-3 opacity-90" />
                    <div className="text-2xl font-bold mb-2">{proyecciones.length}</div>
                    <div className="text-sm opacity-90 font-medium">Ciclos Proyectados</div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Chart */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl text-slate-800">Proyección de Flujo de Caja Acumulado</CardTitle>
                  <CardDescription className="text-lg text-slate-600">
                    Evolución de las ganancias a lo largo del tiempo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 p-4 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="mes" stroke="#64748b" />
                        <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} stroke="#64748b" />
                        <Tooltip
                          formatter={(value: number) => [formatCurrency(value), "Flujo Acumulado"]}
                          labelFormatter={(label) => `Mes ${label}`}
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '2px solid #e2e8f0',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="flujoAcumulado"
                          stroke="url(#gradient)"
                          strokeWidth={4}
                          dot={{ fill: "#10b981", strokeWidth: 3, r: 6 }}
                          activeDot={{ r: 8, fill: "#059669" }}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#06b6d4" />
                          </linearGradient>
                        </defs>
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Table */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800">Detalle de Proyecciones por Ciclo</CardTitle>
                  <CardDescription className="text-lg text-slate-600">
                    Análisis detallado de cada ciclo productivo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-slate-200 bg-slate-50">
                          <th className="text-left p-4 font-semibold text-slate-700">Ciclo</th>
                          <th className="text-left p-4 font-semibold text-slate-700">Mes</th>
                          <th className="text-right p-4 font-semibold text-slate-700">Ingresos Brutos</th>
                          <th className="text-right p-4 font-semibold text-slate-700">Costos Alimento</th>
                          <th className="text-right p-4 font-semibold text-slate-700">Costos Cal</th>
                          <th className="text-right p-4 font-semibold text-slate-700">Ingreso Neto</th>
                          <th className="text-right p-4 font-semibold text-slate-700">Flujo Acumulado</th>
                          <th className="text-right p-4 font-semibold text-slate-700">ROI %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {proyecciones.map((p, index) => (
                          <tr key={p.ciclo} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}`}>
                            <td className="p-4 font-medium text-slate-800">{p.ciclo}</td>
                            <td className="p-4 text-slate-700">{p.mes}</td>
                            <td className="p-4 text-right text-slate-700">{formatCurrency(p.ingresosBrutos)}</td>
                            <td className="p-4 text-right text-red-600 font-medium">{formatCurrency(p.costosAlimento)}</td>
                            <td className="p-4 text-right text-red-600 font-medium">{formatCurrency(p.costosCal)}</td>
                            <td className="p-4 text-right font-bold text-emerald-600">{formatCurrency(p.ingresoNeto)}</td>
                            <td className="p-4 text-right font-bold text-slate-800">{formatCurrency(p.flujoAcumulado)}</td>
                            <td className="p-4 text-right">
                              <Badge 
                                variant={p.roi > 0 ? "default" : "secondary"}
                                className={p.roi > 0 ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}
                              >
                                {p.roi.toFixed(1)}%
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
