type RGB = {
  r: number;
  g: number;
  b: number;
};

export type Color = {
  id: number;
  name: string;
  hex: string;
  rgb: RGB;
};

export const colors: Color[] = [
  { id: 1, name: 'Red', hex: '#FF0000', rgb: { r: 255, g: 0, b: 0 } },
  { id: 2, name: 'Green', hex: '#008000', rgb: { r: 0, g: 128, b: 0 } },
  { id: 3, name: 'Blue', hex: '#0000FF', rgb: { r: 0, g: 0, b: 255 } },
  { id: 4, name: 'Yellow', hex: '#FFFF00', rgb: { r: 255, g: 255, b: 0 } },
  { id: 5, name: 'Orange', hex: '#FFA500', rgb: { r: 255, g: 165, b: 0 } },
  { id: 6, name: 'Purple', hex: '#800080', rgb: { r: 128, g: 0, b: 128 } },
  { id: 7, name: 'Pink', hex: '#FFC0CB', rgb: { r: 255, g: 192, b: 203 } },
  { id: 8, name: 'Cyan', hex: '#00FFFF', rgb: { r: 0, g: 255, b: 255 } },
  { id: 9, name: 'Magenta', hex: '#FF00FF', rgb: { r: 255, g: 0, b: 255 } },
  { id: 10, name: 'Black', hex: '#000000', rgb: { r: 0, g: 0, b: 0 } },
  { id: 11, name: 'White', hex: '#FFFFFF', rgb: { r: 255, g: 255, b: 255 } },
  { id: 12, name: 'Gray', hex: '#808080', rgb: { r: 128, g: 128, b: 128 } },
  { id: 13, name: 'Brown', hex: '#A52A2A', rgb: { r: 165, g: 42, b: 42 } },
  { id: 14, name: 'Teal', hex: '#008080', rgb: { r: 0, g: 128, b: 128 } },
  { id: 15, name: 'Navy', hex: '#000080', rgb: { r: 0, g: 0, b: 128 } },
  { id: 16, name: 'Lime', hex: '#00FF00', rgb: { r: 0, g: 255, b: 0 } },
  { id: 17, name: 'Maroon', hex: '#800000', rgb: { r: 128, g: 0, b: 0 } },
  { id: 18, name: 'Olive', hex: '#808000', rgb: { r: 128, g: 128, b: 0 } },
  { id: 19, name: 'Silver', hex: '#C0C0C0', rgb: { r: 192, g: 192, b: 192 } },
  { id: 20, name: 'Indigo', hex: '#4B0082', rgb: { r: 75, g: 0, b: 130 } },
];
