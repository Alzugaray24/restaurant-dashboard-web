# Componente ConfirmationModal

Un componente modal reutilizable para confirmar acciones importantes como eliminación, advertencias o confirmaciones.

## Características

- Diseño responsive y accesible
- Múltiples tipos: eliminación, advertencia, información y error
- Personalización de mensajes, títulos y textos de botones
- Soporte para item destacado (por ejemplo, nombre del elemento a eliminar)
- Cierre al hacer clic fuera del modal o presionar ESC
- Previene el scroll de la página cuando está abierto

## Uso básico

```tsx
import { useState } from "react";
import { ConfirmationModal } from "@/shared/components/modals/confirmation-modal";

export default function MyComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    // Realizar acción de eliminación
    console.log("Elemento eliminado");
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Eliminar usuario</button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="Confirmar eliminación"
        message="¿Está seguro que desea eliminar este usuario?"
        highlightedItem="John Doe"
        type="delete"
      />
    </>
  );
}
```

## Tipos disponibles

El componente admite cuatro tipos que cambian el estilo visual:

- `delete`: Rojo con icono de papelera (predeterminado)
- `warning`: Ámbar con icono de triángulo de advertencia
- `info`: Azul con icono de información
- `error`: Rojo con icono de círculo de alerta

## Props

| Prop              | Tipo                                       | Requerido | Valor por defecto  | Descripción                                   |
| ----------------- | ------------------------------------------ | --------- | ------------------ | --------------------------------------------- |
| isOpen            | boolean                                    | Sí        | -                  | Indica si el modal está visible               |
| onClose           | () => void                                 | Sí        | -                  | Función que se ejecuta al cerrar el modal     |
| onConfirm         | () => void                                 | Sí        | -                  | Función que se ejecuta al confirmar la acción |
| title             | string                                     | No        | "Confirmar acción" | Título del modal                              |
| message           | string                                     | Sí        | -                  | Mensaje principal del modal                   |
| highlightedItem   | string \| ReactNode                        | No        | -                  | Elemento o texto destacado en el mensaje      |
| confirmButtonText | string                                     | No        | Varía según tipo   | Texto del botón de confirmación               |
| cancelButtonText  | string                                     | No        | "No, cancelar"     | Texto del botón para cancelar                 |
| type              | 'delete' \| 'warning' \| 'info' \| 'error' | No        | "delete"           | Tipo de modal                                 |
