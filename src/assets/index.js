// src/assets/index.js
import hero from './hero.jpg';
import logo from './logo.png';

import reactIcon from './react.svg';

import category1 from './category-1.jpg';
import category2 from './category-2.jpg';
import category3 from './category-3.jpg';
import category4 from './category-4.jpg';

const assets = {
  hero,
  logo,
  reactIcon,
  category1,
  category2,
  category3,
  category4,
};

// 👇 Category list
export const categoryList = [
  {
    name: 'Elegant Shoilo',
    image: category1,
  },
  {
    name: 'Luxury Rings',
    image: category2,
  },
  {
    name: 'Stylish Bangles',
    image: category3,
  },
  {
    name: 'Classic Bookmarks',
    image: category4,
  },
];


export default assets;
