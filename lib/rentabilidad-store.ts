import { create } from "zustand"

export interface DatosRentabilidad {
  // Precios de venta
  precioCarpaKg: number
  precioPacuKg: number

  // Costos operativos
  costoAlimentoKg: number
  conversionAlimenticia: number // kg alimento por kg pez
  costoCalCiclo: number

  // Parámetros de producción
  duracionCicloMeses: number
  pesoPromedioCarpa: number // kg
  pesoPromedioPacu: number // kg
  supervivencia: number // % (80% = 0.8, considerando 20% pérdida)

  // Datos del proyecto (heredados)
  cantidadEstanques: number
  tipoPeces: string
  inversionInicial: number
  alevinosPorEstanque: number
}

export interface ProyeccionCiclo {
  ciclo: number
  mes: number
  ingresosBrutos: number
  costosAlimento: number
  costosCal: number
  costosOperativos: number
  ingresoNeto: number
  flujoAcumulado: number
  roi: number
}

interface RentabilidadStore {
  datos: DatosRentabilidad
  proyecciones: ProyeccionCiclo[]
  puntoEquilibrio: number | null

  // Actions
  setDatos: (datos: Partial<DatosRentabilidad>) => void
  calcularProyecciones: () => void
  resetDatos: () => void
}

const datosIniciales: DatosRentabilidad = {
  precioCarpaKg: 10000,
  precioPacuKg: 10000,
  costoAlimentoKg: 1150,
  conversionAlimenticia: 2,
  costoCalCiclo: 150000,
  duracionCicloMeses: 24,
  pesoPromedioCarpa: 3,
  pesoPromedioPacu: 1.5,
  supervivencia: 0.8,
  cantidadEstanques: 1,
  tipoPeces: "carpa",
  inversionInicial: 0,
  alevinosPorEstanque: 400,
}

export const useRentabilidadStore = create<RentabilidadStore>((set, get) => ({
  datos: datosIniciales,
  proyecciones: [],
  puntoEquilibrio: null,

  setDatos: (nuevosDatos) => {
    set((state) => ({
      datos: { ...state.datos, ...nuevosDatos },
    }))
  },

  calcularProyecciones: () => {
    const { datos } = get()
    const proyecciones: ProyeccionCiclo[] = []
    let flujoAcumulado = -datos.inversionInicial
    let puntoEquilibrio: number | null = null

    // Calcular para 10 años (120 meses)
    const totalMeses = 120
    const totalCiclos = Math.floor(totalMeses / datos.duracionCicloMeses)

    for (let ciclo = 1; ciclo <= totalCiclos; ciclo++) {
      const mesInicio = (ciclo - 1) * datos.duracionCicloMeses + datos.duracionCicloMeses

      // Calcular producción por estanque
      const pecesSupervivientes = datos.alevinosPorEstanque * datos.supervivencia

      let ingresosBrutos = 0
      let pesoTotalProducido = 0

      if (datos.tipoPeces === "carpa") {
        pesoTotalProducido = pecesSupervivientes * datos.pesoPromedioCarpa
        ingresosBrutos = pesoTotalProducido * datos.precioCarpaKg
      } else if (datos.tipoPeces === "pacu") {
        pesoTotalProducido = pecesSupervivientes * datos.pesoPromedioPacu
        ingresosBrutos = pesoTotalProducido * datos.precioPacuKg
      } else if (datos.tipoPeces === "ambos") {
        const pesoCarpa = (pecesSupervivientes / 2) * datos.pesoPromedioCarpa
        const pesoPacu = (pecesSupervivientes / 2) * datos.pesoPromedioPacu
        pesoTotalProducido = pesoCarpa + pesoPacu
        ingresosBrutos = pesoCarpa * datos.precioCarpaKg + pesoPacu * datos.precioPacuKg
      }

      // Multiplicar por cantidad de estanques
      ingresosBrutos *= datos.cantidadEstanques
      pesoTotalProducido *= datos.cantidadEstanques

      // Calcular costos
      const costosAlimento = pesoTotalProducido * datos.conversionAlimenticia * datos.costoAlimentoKg
      const costosCal = datos.costoCalCiclo * datos.cantidadEstanques
      const costosOperativos = costosAlimento + costosCal

      // Calcular flujo neto
      const ingresoNeto = ingresosBrutos - costosOperativos
      flujoAcumulado += ingresoNeto

      // Calcular ROI
      const roi = datos.inversionInicial > 0 ? (flujoAcumulado / datos.inversionInicial) * 100 : 0

      // Verificar punto de equilibrio
      if (puntoEquilibrio === null && flujoAcumulado >= 0) {
        puntoEquilibrio = mesInicio
      }

      proyecciones.push({
        ciclo,
        mes: mesInicio,
        ingresosBrutos,
        costosAlimento,
        costosCal,
        costosOperativos,
        ingresoNeto,
        flujoAcumulado,
        roi,
      })
    }

    set({ proyecciones, puntoEquilibrio })
  },

  resetDatos: () => {
    set({
      datos: datosIniciales,
      proyecciones: [],
      puntoEquilibrio: null,
    })
  },
}))
