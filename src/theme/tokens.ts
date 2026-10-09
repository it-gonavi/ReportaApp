export const colors = {
  background: '#051428',
  surface: '#0D223A',
  surfaceElevated: '#152B46',
  outline: '#2C425E',
  text: '#F7FBFF',
  muted: '#95ABCA',
  blue: '#078CFF',
  cyan: '#0FD9F2',
  electric: '#FFC329',
  water: '#427DFD',
  road: '#FF655B',
  climate: '#00D2BD',
  warning: '#FFC329',
  resolved: '#18BD92',
  orange: '#FF842E',
} as const;

export type IncidentKind = 'electric' | 'water' | 'road' | 'climate';

export const incidentKinds = [
  { id: 'electric' as const, name: 'Eléctrico', tint: colors.electric, bg: '#2E2A16' },
  { id: 'water' as const, name: 'Agua', tint: colors.water, bg: '#102A52' },
  { id: 'road' as const, name: 'Vialidad', tint: colors.road, bg: '#38242F' },
  { id: 'climate' as const, name: 'Clima', tint: colors.climate, bg: '#063A42' },
];
