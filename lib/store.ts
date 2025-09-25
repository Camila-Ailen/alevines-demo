import { create } from "zustand"

// Datos de materiales y costos
export const estanqueData = [
  { id: 1, name: "Caño", detail: "6 mm", price: 60000, cant: 3 },
  { id: 2, name: "Codo", detail: "", price: 15200, cant: 3 },
  { id: 3, name: "Caño T", detail: "", price: 2000, cant: 3 },
  { id: 4, name: "Máquina", detail: "Mano de obra subsidiada", price: 120000, cant: 20 },
  { id: 5, name: "Alevines Pacu", detail: "peces para recria", price: 200, cant: 400 },
  { id: 6, name: "Alevines Carpa", detail: "peces para recria", price: 150, cant: 400 },
]

// Medidas estándar de estanques
export const medidasEstandar = {
  largo: 50, // metros
  ancho: 20, // metros
  profundidad: 2, // metros
  area: 1000, // metros cuadrados
}

// Función para obtener los datos de materiales según el tipo de pez
export const getEstanqueDataForCalculation = (tipoPeces: string) => {
  const materialesBase = estanqueData.filter(item => item.id <= 4)
  
  if (tipoPeces === 'carpa') {
    const carpaItem = estanqueData.find(item => item.id === 6)
    return carpaItem ? [...materialesBase, carpaItem] : materialesBase
  } else if (tipoPeces === 'pacu') {
    const pacuItem = estanqueData.find(item => item.id === 5)
    return pacuItem ? [...materialesBase, pacuItem] : materialesBase
  } else if (tipoPeces === 'ambos') {
    const carpaItem = estanqueData.find(item => item.id === 6)
    const pacuItem = estanqueData.find(item => item.id === 5)
    const pecesItems = [carpaItem, pacuItem].filter((item): item is NonNullable<typeof item> => item != null)
    return [...materialesBase, ...pecesItems]
  }
  
  return materialesBase
}

// Tipos de peces y sus requerimientos
export const tiposPeces = {
  carpa: {
    descripcion: "Carpa común - Resistente, crecimiento rápido",
    densidad: "1 pez cada 3 m²",
  },
  pacu: {
    descripcion: "Pacu - Mayor valor comercial",
    densidad: "1 pez cada 3 m²",
  },
  ambos: {
    descripcion: "Carpa + Pacu - Diversificación de producción",
    densidad: "1 pez cada 3 m²",
  },
}

export interface CostosCalculados {
  materiales: number
  tipoPeces: number
  total: number
  porEstanque: number
}

interface EstanqueStore {
  cantidadEstanques: number
  tipoPeces: string
  mostrarCalculos: boolean
  costos: CostosCalculados | null

  setCantidadEstanques: (cantidad: number) => void
  setTipoPeces: (tipo: string) => void
  setMostrarCalculos: (mostrar: boolean) => void
  calcularCostos: () => void
  resetCalculos: () => void
}

export const useEstanqueStore = create<EstanqueStore>((set, get) => ({
  cantidadEstanques: 1,
  tipoPeces: "",
  mostrarCalculos: false,
  costos: null,

  setCantidadEstanques: (cantidad) => {
    set({ cantidadEstanques: cantidad })
    // Recalcular automáticamente si ya hay cálculos mostrados
    const { mostrarCalculos } = get()
    if (mostrarCalculos) {
      get().calcularCostos()
    }
  },

  setTipoPeces: (tipo) => {
    set({ tipoPeces: tipo })
    // Recalcular automáticamente si ya hay cálculos mostrados
    const { mostrarCalculos } = get()
    if (mostrarCalculos) {
      get().calcularCostos()
    }
  },

  setMostrarCalculos: (mostrar) => set({ mostrarCalculos: mostrar }),

  calcularCostos: () => {
    const { cantidadEstanques, tipoPeces } = get()

    if (!tipoPeces) {
      set({ costos: null })
      return
    }

    // Calcular costo de materiales base (sin peces)
    const materialesBase = estanqueData.filter(item => item.id <= 4)
    const costoMaterialesBase = materialesBase.reduce((total, item) => {
      return total + item.price * item.cant * cantidadEstanques
    }, 0)

    // Calcular costo de peces según el tipo seleccionado
    let costoPeces = 0
    if (tipoPeces === 'carpa') {
      // Usar id 6 para carpa
      const carpaItem = estanqueData.find(item => item.id === 6)
      if (carpaItem) {
        costoPeces = carpaItem.price * carpaItem.cant * cantidadEstanques
      }
    } else if (tipoPeces === 'pacu') {
      // Usar id 5 para pacu
      const pacuItem = estanqueData.find(item => item.id === 5)
      if (pacuItem) {
        costoPeces = pacuItem.price * pacuItem.cant * cantidadEstanques
      }
    } else if (tipoPeces === 'ambos') {
      // Usar ambos tipos de peces
      const carpaItem = estanqueData.find(item => item.id === 6)
      const pacuItem = estanqueData.find(item => item.id === 5)
      if (carpaItem && pacuItem) {
        costoPeces = (carpaItem.price * carpaItem.cant + pacuItem.price * pacuItem.cant) * cantidadEstanques
      }
    }

    const costoTotal = costoMaterialesBase + costoPeces

    const costos: CostosCalculados = {
      materiales: costoMaterialesBase,
      tipoPeces: costoPeces,
      total: costoTotal,
      porEstanque: costoTotal / cantidadEstanques,
    }

    set({ costos, mostrarCalculos: true })
  },

  resetCalculos: () =>
    set({
      cantidadEstanques: 1,
      tipoPeces: "",
      mostrarCalculos: false,
      costos: null,
    }),
}))
