export const EQUIPMENT_TYPES = {
  MOTOR: {
    id: 'motor',
    label: 'Industrial Motor',
    relays: ['46', '49', '50', '51', '66'],
    nominal: '4.16kV / 500HP'
  },
  TRANSFORMER: {
    id: 'transformer',
    label: 'Power Transformer',
    relays: ['87T', '51', '24', '63'],
    nominal: '13.8kV/4.16kV'
  },
  FEEDER: {
    id: 'feeder',
    label: 'Main Feeder',
    relays: ['50', '51', '50G', '67'],
    nominal: '13.8kV / 1200A'
  }
};
