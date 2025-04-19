# StatCard Component

El componente `StatCard` muestra información estadística con un icono, valor numérico y tendencia de cambio.

## Características

- Muestra un icono con fondo personalizable
- Presenta un valor numérico grande
- Incluye un título descriptivo
- Opcionalmente muestra un texto de cambio/tendencia con color apropiado
- Totalmente personalizable con props para colores y estilos

## Uso

```jsx
import { StatCard } from "@/shared/components/cards";
import { Users } from "lucide-react";

// Ejemplo básico
<StatCard
  icon={<Users size={18} />}
  value={42}
  title="Total Customers"
/>

// Con indicador de tendencia positiva
<StatCard
  icon={<Users size={18} />}
  value={5}
  title="Active Customers"
  changeText="+2 this week"
  changeType="positive"
/>

// Con indicador de tendencia negativa
<StatCard
  icon={<Users size={18} />}
  value={1}
  title="Inactive Customers"
  changeText="+1 this week"
  changeType="negative"
/>

// Con colores personalizados
<StatCard
  icon={<Users size={18} />}
  value={53}
  title="Total Orders"
  changeText="+8 this week"
  iconBgColor="bg-blue-50"
  iconColor="text-blue-600"
/>
```

## Props

| Prop        | Tipo                                  | Descripción                                | Default          |
| ----------- | ------------------------------------- | ------------------------------------------ | ---------------- |
| icon        | ReactNode                             | Icono a mostrar                            | -                |
| value       | string \| number                      | Valor numérico principal                   | -                |
| title       | string                                | Título descriptivo                         | -                |
| changeText  | string                                | Texto de tendencia o cambio                | undefined        |
| changeType  | 'positive' \| 'negative' \| 'neutral' | Define el color del texto de cambio        | 'positive'       |
| iconBgColor | string                                | Clase CSS para el color de fondo del icono | 'bg-green-50'    |
| iconColor   | string                                | Clase CSS para el color del icono          | 'text-green-600' |
| className   | string                                | Clases CSS adicionales                     | ''               |
