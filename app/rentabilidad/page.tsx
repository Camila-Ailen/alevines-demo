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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts"

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
        alevinosPorEstanque: 416,
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-green-600" />
                Análisis de Rentabilidad
              </h1>
              <p className="text-gray-600 mt-1">Proyección de ganancias y análisis de viabilidad económica</p>
            </div>
          </div>
        </div>

        {/* Resumen del Proyecto */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Datos del Proyecto Base
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">{datos.cantidadEstanques}</div>
                <div className="text-sm text-gray-600">Estanques</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600 capitalize">{datos.tipoPeces}</div>
                <div className="text-sm text-gray-600">Tipo de Peces</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-lg font-bold text-yellow-600">{formatCurrency(datos.inversionInicial)}</div>
                <div className="text-sm text-gray-600">Inversión Inicial</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-xl font-bold text-purple-600">{datos.alevinosPorEstanque}</div>
                <div className="text-sm text-gray-600">Alevines/Estanque</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuración de Parámetros */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Precios de Venta</CardTitle>
              <CardDescription>Precios por kilogramo de pescado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Precio Carpa ($/kg)</Label>
                <Input
                  type="number"
                  value={datos.precioCarpaKg}
                  onChange={(e) => setDatos({ precioCarpaKg: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Precio Pacu ($/kg)</Label>
                <Input
                  type="number"
                  value={datos.precioPacuKg}
                  onChange={(e) => setDatos({ precioPacuKg: Number(e.target.value) })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Costos Operativos</CardTitle>
              <CardDescription>Gastos recurrentes por ciclo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Costo Alimento ($/kg)</Label>
                <Input
                  type="number"
                  value={datos.costoAlimentoKg}
                  onChange={(e) => setDatos({ costoAlimentoKg: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Conversión Alimenticia</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={datos.conversionAlimenticia}
                  onChange={(e) => setDatos({ conversionAlimenticia: Number(e.target.value) })}
                />
                <p className="text-xs text-gray-500">kg de alimento por kg de pez producido</p>
              </div>
              <div className="space-y-2">
                <Label>Costo Cal por Ciclo ($)</Label>
                <Input
                  type="number"
                  value={datos.costoCalCiclo}
                  onChange={(e) => setDatos({ costoCalCiclo: Number(e.target.value) })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Parámetros de Producción</CardTitle>
              <CardDescription>Características del ciclo productivo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Duración del Ciclo (meses)</Label>
                <Input
                  type="number"
                  value={datos.duracionCicloMeses}
                  onChange={(e) => setDatos({ duracionCicloMeses: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Peso Promedio Carpa (kg)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={datos.pesoPromedioCarpa}
                  onChange={(e) => setDatos({ pesoPromedioCarpa: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Peso Promedio Pacu (kg)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={datos.pesoPromedioPacu}
                  onChange={(e) => setDatos({ pesoPromedioPacu: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Supervivencia (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={datos.supervivencia * 100}
                  onChange={(e) => setDatos({ supervivencia: Number(e.target.value) / 100 })}
                />
                <p className="text-xs text-gray-500">80% = 20% de pérdida considerada</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acciones</CardTitle>
              <CardDescription>Calcular proyecciones y análisis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleCalcular} className="w-full" size="lg">
                <TrendingUp className="h-4 w-4 mr-2" />
                Calcular Proyecciones
              </Button>
              <Button onClick={resetDatos} variant="outline" className="w-full bg-white hover:bg-gray-50">
                Resetear Datos
              </Button>

              {puntoEquilibrio && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-800">Punto de Equilibrio</span>
                  </div>
                  <p className="text-green-700">
                    Mes <strong>{puntoEquilibrio}</strong> - Recuperación de la inversión
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Gráficos y Resultados */}
        {proyecciones.length > 0 && (
          <>
            {/* Métricas Clave */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(proyecciones[proyecciones.length - 1]?.flujoAcumulado || 0)}
                  </div>
                  <div className="text-sm text-gray-600">Ganancia Total (10 años)</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">
                    {proyecciones[proyecciones.length - 1]?.roi.toFixed(1) || 0}%
                  </div>
                  <div className="text-sm text-gray-600">ROI Final</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{puntoEquilibrio || "N/A"}</div>
                  <div className="text-sm text-gray-600">Meses al Equilibrio</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <BarChart3 className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-600">{proyecciones.length}</div>
                  <div className="text-sm text-gray-600">Ciclos Proyectados</div>
                </CardContent>
              </Card>
            </div>

            {/* Gráfico de Flujo de Caja */}
            <Card>
              <CardHeader>
                <CardTitle>Proyección de Flujo de Caja Acumulado</CardTitle>
                <CardDescription>Evolución de las ganancias a lo largo del tiempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip
                        formatter={(value: number) => [formatCurrency(value), "Flujo Acumulado"]}
                        labelFormatter={(label) => `Mes ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="flujoAcumulado"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Gráfico de Ingresos vs Costos 
            <Card>
              <CardHeader>
                <CardTitle>Ingresos vs Costos por Ciclo</CardTitle>
                <CardDescription>Comparación de ingresos brutos y costos operativos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="ciclo" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip
                        formatter={(value: number, name: string) => [
                          formatCurrency(value),
                          name === "ingresosBrutos" ? "Ingresos Brutos" : "Costos Operativos",
                        ]}
                      />
                      <Legend />
                      <Bar dataKey="ingresosBrutos" fill="#3b82f6" name="Ingresos Brutos" />
                      <Bar dataKey="costosOperativos" fill="#ef4444" name="Costos Operativos" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            */}

            {/* Tabla de Proyecciones */}
            <Card>
              <CardHeader>
                <CardTitle>Detalle de Proyecciones por Ciclo</CardTitle>
                <CardDescription>Análisis detallado de cada ciclo productivo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Ciclo</th>
                        <th className="text-left p-2">Mes</th>
                        <th className="text-right p-2">Ingresos Brutos</th>
                        <th className="text-right p-2">Costos Alimento</th>
                        <th className="text-right p-2">Costos Cal</th>
                        <th className="text-right p-2">Ingreso Neto</th>
                        <th className="text-right p-2">Flujo Acumulado</th>
                        <th className="text-right p-2">ROI %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proyecciones.map((p) => (
                        <tr key={p.ciclo} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium">{p.ciclo}</td>
                          <td className="p-2">{p.mes}</td>
                          <td className="p-2 text-right">{formatCurrency(p.ingresosBrutos)}</td>
                          <td className="p-2 text-right text-red-600">{formatCurrency(p.costosAlimento)}</td>
                          <td className="p-2 text-right text-red-600">{formatCurrency(p.costosCal)}</td>
                          <td className="p-2 text-right font-bold text-green-600">{formatCurrency(p.ingresoNeto)}</td>
                          <td className="p-2 text-right font-bold">{formatCurrency(p.flujoAcumulado)}</td>
                          <td className="p-2 text-right">
                            <Badge variant={p.roi > 0 ? "default" : "secondary"}>{p.roi.toFixed(1)}%</Badge>
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
  )
}
