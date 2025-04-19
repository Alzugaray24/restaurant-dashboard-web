# Pagination Component

El componente `Pagination` permite navegar entre varias páginas de resultados, mostrando botones de navegación y un indicador de estado actual.

## Características

- Navegación entre páginas con botones anterior/siguiente
- Muestra el número de página actual destacado
- Genera automáticamente un rango de botones de página con puntos suspensivos para rangos grandes
- Incluye un resumen del total de elementos y los que se muestran actualmente
- Diseño responsive que se adapta a diferentes tamaños de pantalla
- Personalizable con diferentes estilos y configuraciones

## Uso

```jsx
import { Pagination } from "@/shared/components/navigation";
import { useState } from "react";

// Uso básico con estado
const MyComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 100;

  return (
    <Pagination
      totalItems={totalItems}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      onPageChange={(page) => setCurrentPage(page)}
    />
  );
};

// Con opciones personalizadas
const CustomPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Pagination
      totalItems={200}
      itemsPerPage={20}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      siblingCount={2}
      responsive={false}
      className="my-4"
    />
  );
};
```

## Props

| Prop         | Tipo                   | Descripción                                                  | Default |
| ------------ | ---------------------- | ------------------------------------------------------------ | ------- |
| totalItems   | number                 | Número total de elementos                                    | -       |
| itemsPerPage | number                 | Número de elementos por página                               | -       |
| currentPage  | number                 | Página actual                                                | -       |
| onPageChange | (page: number) => void | Función que se ejecuta al cambiar de página                  | -       |
| siblingCount | number                 | Número de botones de página a mostrar a cada lado del actual | 1       |
| responsive   | boolean                | Si debe mostrarse la versión responsive en móviles           | true    |
| className    | string                 | Clases CSS adicionales                                       | ''      |
