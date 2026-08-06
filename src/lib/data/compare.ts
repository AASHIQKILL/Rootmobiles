export interface CompareDevice {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  specs: {
    display: string;
    chip: string;
    ram: string;
    storage: string;
    battery: string;
    camera: string;
    charging: string;
    weight: string;
  };
}

export const COMPARE_DEVICES: CompareDevice[] = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: 134900,
    image: "/products/device-phone.svg",
    specs: {
      display: "6.1\" Super Retina XDR, 120Hz",
      chip: "A17 Pro",
      ram: "8GB",
      storage: "128 / 256 / 512GB / 1TB",
      battery: "3274mAh, up to 23h video",
      camera: "48MP + 12MP + 12MP, 5x optical zoom",
      charging: "20W wired, 15W MagSafe",
      weight: "187g",
    },
  },
  {
    id: "galaxy-s24-ultra",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    price: 124999,
    image: "/products/device-phone.svg",
    specs: {
      display: "6.8\" QHD+ AMOLED, 120Hz",
      chip: "Snapdragon 8 Gen 3",
      ram: "12GB",
      storage: "256 / 512GB / 1TB",
      battery: "5000mAh, up to 27h video",
      camera: "200MP + 50MP + 12MP + 10MP",
      charging: "45W wired, 15W wireless",
      weight: "232g",
    },
  },
  {
    id: "oneplus-12r",
    name: "OnePlus 12R",
    brand: "OnePlus",
    price: 39999,
    image: "/products/device-phone.svg",
    specs: {
      display: "6.78\" 120Hz AMOLED",
      chip: "Snapdragon 8 Gen 2",
      ram: "8 / 16GB",
      storage: "128 / 256GB",
      battery: "5500mAh, 100W SuperVOOC",
      camera: "50MP + 8MP + 2MP",
      charging: "100W wired",
      weight: "207g",
    },
  },
  {
    id: "pixel-8",
    name: "Pixel 8",
    brand: "Google",
    price: 62999,
    image: "/products/device-phone.svg",
    specs: {
      display: "6.2\" OLED, 120Hz",
      chip: "Google Tensor G3",
      ram: "8GB",
      storage: "128 / 256GB",
      battery: "4575mAh, up to 24h",
      camera: "50MP + 12MP",
      charging: "27W wired, 18W wireless",
      weight: "187g",
    },
  },
  {
    id: "iphone-13",
    name: "iPhone 13",
    brand: "Apple",
    price: 42999,
    image: "/products/device-phone.svg",
    specs: {
      display: "6.1\" Super Retina XDR, 60Hz",
      chip: "A15 Bionic",
      ram: "4GB",
      storage: "128 / 256GB",
      battery: "3227mAh, up to 19h video",
      camera: "12MP + 12MP",
      charging: "20W wired, 15W MagSafe",
      weight: "174g",
    },
  },
];
