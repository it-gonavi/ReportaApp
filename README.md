# NOC — Kit de recursos para Expo + NativeWind

Recursos obtenidos a partir de la **única imagen de referencia suministrada** (1672 × 941 px), más íconos SVG/PNG reconstruidos y componentes React Native de ejemplo.

## 1. ¿Qué contiene?

| Carpeta | Contenido | Uso recomendado |
|---|---|---|
| `assets/reference/` | Imagen original intacta | Comparación visual |
| `assets/mockups/` | 6 recortes de teléfonos con marco | Moodboard y QA |
| `assets/screens/` | 6 capturas interiores de pantallas | Referencia visual, **no** mostrar como aplicación |
| `assets/images/` | Isotipo NOC con transparencia, foto de ciudad, miniaturas de incidentes | Imágenes dentro de la app |
| `assets/maps/` | 2 recortes de mapas | Placeholders (no mapa interactivo) |
| `assets/icons/svg/` | 29 íconos SVG individuales | Diseño vectorial, ideal para ampliar |
| `assets/icons/png/` | 29 íconos PNG transparentes (256 × 256) | `Image` en React Native, sin SVG runtime |
| `assets/previews/` | Catálogo general de assets | Buscar rápidamente cada pieza |
| `src/components/kit.tsx` | Componentes React Native editables | Botones, tarjetas, campos, menús, pasos, timeline... |
| `src/theme/tokens.ts` | Paleta y categorías de eventos | Identidad visual consistente |
| `app/` | 6 pantallas Expo Router | Base funcional de navegación y flujo demo |

**Límite de fidelidad:** el archivo que nos compartiste es una sola composición rasterizada. No dispone de capas, fotos fuente, tipografías originales ni componentes Figma. Los recortes son fieles a los píxeles disponibles, pero pueden tener pequeños bordes y detalles de interfaz superpuestos. Los SVG son **recreaciones editables** y no vectores exportados del diseño original. Las miniaturas fotográficas son pequeñas: cambia por imágenes originales cuando las tengas.

## 2. Instalación del proyecto completo (corregido)

Este ZIP **sí contiene** `package.json`, `app.json`, `tsconfig.json`, configuración de NativeWind y todas las pantallas. Usa **Node.js 22.13 o posterior**, con acceso a internet para descargar dependencias.

1. Descomprime el ZIP en una carpeta, por ejemplo `noc-reportes`.
2. Abre una terminal **dentro de esa carpeta**, en la misma ubicación de `package.json`.
3. Ejecuta:

```bash
npm install
npx expo install --check
npx expo start -c
```

- En Expo Go (Android/iOS), escanea el QR que muestra Expo CLI.
- Para probarlo en el navegador, pulsa `w` durante el servidor o ejecuta `npm run web`.
- Si Expo muestra diferencias de versiones, ejecuta `npx expo install --fix` y reinicia con `npx expo start -c`.
- **No necesitas `npx create-expo-app`: este ZIP es un proyecto completo.**

### Versiones principales

- Expo SDK 57 (React Native 0.86, React 19.2)
- Expo Router 57 para navegación por archivos
- NativeWind 4.2.7 y Tailwind CSS 3.4 (la configuración de NativeWind 4 **no** es compatible con Tailwind 4)
- `expo-image-picker`, `expo-linear-gradient` y `lucide-react-native`

### Alternativa: incorporar el kit en otra app creada con Expo

Si prefieres crear un proyecto Expo desde cero, usa la plantilla Expo Router y copia `app/`, `src/`, `assets/`, `global.css`, `babel.config.js`, `metro.config.js`, `tailwind.config.js` y `nativewind-env.d.ts`. Instala las dependencias con versiones compatibles con el SDK y adapta rutas si tu app reside en `src/app`.

**Nota sobre las pruebas:** no fue posible ejecutar `npm install` aquí por falta de acceso al registro de npm. Valida la instalación y ejecuta `npx expo install --check` en tu equipo, con conexión a Internet.

## 3. Componentes listos para adaptar

`Screen`, `Brand`, `PrimaryButton`, `Field`, `CategoryTile`, `StatusPill`, `ReportRow`, `SearchBar`, `SectionHeading`, `AppTopBar`, `ReportSteps`, `LocationMap`, `BottomNav` y `Timeline`.

Ejemplo:

```tsx
import { CategoryTile, PrimaryButton } from './src/components/kit';

<CategoryTile kind="electric" selected onPress={() => {}} />
<PrimaryButton title="Nuevo reporte" onPress={() => {}} />
```

## 4. Flujo de las pantallas

`/` → `/login` → `/dashboard` → `/new-report` → `/confirmation` → `/report/10428`.

Incluye navegación demo, formularios editables, selección de categoría y carga de hasta cuatro imágenes desde la galería mediante `expo-image-picker`.

**Importante:** no implementa autenticación real, API de reportes, subida de archivos al servidor, geolocalización ni mapas interactivos. El login es de demostración, los reportes son datos simulados, las fechas y el ID son ilustrativos y el mapa estático es solo un recorte. Para producción debes conectar servicios reales y permisos apropiados.

## 5. Colores de la referencia

| Token | HEX |
|---|---|
| Fondo | `#051428` |
| Tarjeta | `#0D223A` |
| Borde | `#2C425E` |
| Azul vibrante | `#078CFF` |
| Cian CTA | `#0FD9F2` |
| Eléctrico | `#FFC329` |
| Agua | `#427DFD` |
| Vialidad | `#FF655B` |
| Clima | `#00D2BD` |
| Texto | `#F7FBFF` |

## 6. Notas sobre los SVG y el logo

- Los íconos en `assets/icons/svg/` son vectores totalmente independientes, con fondo transparente.
- `assets/images/noc-original-mark-transparent.png` procede del **isotipo original** recortado y enmascarado. Revisa el borde fino sobre fondos claros. Para tamaños muy grandes, considera el vector `assets/icons/svg/noc-logo-recreated.svg` (aproximado).
- Muchos elementos (botones, inputs, estados, pestañas y tarjetas) **no deben montarse como PNG**: se reconstruyen como componentes React Native para garantizar accesibilidad, responsividad y edición.
- Los recortes de mapas no sustituyen `react-native-maps` ni un servicio geoespacial.

## 7. Mapa del paquete

`manifest.json` enumera los archivos extraídos y sus coordenadas `xyxy` sobre la imagen original, además del tipo de cada recurso (recorte original, máscara, ícono recreado).
