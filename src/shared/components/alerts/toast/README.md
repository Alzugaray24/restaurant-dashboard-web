# Componente Toast y ToastContainer

Componentes para mostrar notificaciones temporales en la interfaz de usuario, como confirmaciones, errores, advertencias e información.

## Características

- Varios tipos: success, error, warning, info
- Cierre automático personalizable
- Cierre manual (botón X)
- Posicionamiento configurable
- Animaciones suaves
- Soporte para mensajes principales y descripciones
- Diseño adaptable y accesible

## Toast

El componente `Toast` muestra una notificación individual.

### Uso básico

```tsx
import { useState } from "react";
import { Toast } from "@/shared/components/alerts/toast";

export default function MyComponent() {
  const [showToast, setShowToast] = useState(false);

  return (
    <>
      <button onClick={() => setShowToast(true)}>Mostrar notificación</button>

      <Toast
        type="success"
        message="Usuario eliminado exitosamente"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
```

### Props

| Prop        | Tipo                                        | Requerido | Valor por defecto | Descripción                                       |
| ----------- | ------------------------------------------- | --------- | ----------------- | ------------------------------------------------- |
| type        | 'success' \| 'error' \| 'warning' \| 'info' | Sí        | -                 | Tipo de notificación                              |
| message     | string                                      | Sí        | -                 | Mensaje principal                                 |
| description | string                                      | No        | -                 | Descripción adicional                             |
| isVisible   | boolean                                     | Sí        | -                 | Si se muestra o no                                |
| onClose     | () => void                                  | Sí        | -                 | Función para cerrar la notificación               |
| duration    | number                                      | No        | 3000              | Duración en ms (0 para no cerrar automáticamente) |
| children    | ReactNode                                   | No        | -                 | Contenido personalizado                           |

## ToastContainer

El componente `ToastContainer` organiza múltiples notificaciones en una posición específica de la pantalla.

### Uso básico

```tsx
import { useState } from "react";
import { Toast } from "@/shared/components/alerts/toast";
import { ToastContainer } from "@/shared/components/alerts/toast-container";

export default function MyComponent() {
  const [toasts, setToasts] = useState([]);

  const addToast = (type, message) => {
    const id = Date.now();
    setToasts([...toasts, { id, type, message }]);
  };

  const removeToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  return (
    <>
      <button onClick={() => addToast("success", "Operación exitosa")}>
        Mostrar éxito
      </button>
      <button onClick={() => addToast("error", "Ha ocurrido un error")}>
        Mostrar error
      </button>

      <ToastContainer position="top-right">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            isVisible={true}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </ToastContainer>
    </>
  );
}
```

### Props

| Prop     | Tipo                                                                                            | Requerido | Valor por defecto | Descripción             |
| -------- | ----------------------------------------------------------------------------------------------- | --------- | ----------------- | ----------------------- |
| position | 'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'top-center' \| 'bottom-center' | No        | 'top-right'       | Posición en la pantalla |
| children | ReactNode                                                                                       | Sí        | -                 | Toasts a mostrar        |
