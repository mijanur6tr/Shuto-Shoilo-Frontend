// src/assets/index.js
import hero from './cafe_hero_matcha.jpg';
import logo from './logo.svg';
import logoPng from './logo.png';
import cafeMatcha from './cafe_hero_matcha.jpg';
import cafeBowl from './cafe_superfood_bowl.jpg';
import cafeBake from './cafe_artisan_bake.jpg';
import reactIcon from './react.svg';

const assets = {
  hero,
  logo,
  logoPng,
  cafeMatcha,
  cafeBowl,
  cafeBake,
  reactIcon,
};

// Natural Cafe Category List
export const categoryList = [
  {
    name: 'Artisan Brews & Teas',
    shortName: 'Brews',
    image: cafeMatcha,
    description: 'Cold-drip single origin coffees, ceremonial matcha, and botanical herb infusions.'
  },
  {
    name: 'Superfood Bowls',
    shortName: 'Bowls',
    image: cafeBowl,
    description: 'Live spirulina, wild acai, and nutrient-dense sprouted superfood bowls.'
  },
  {
    name: 'Sourdough & Bakes',
    shortName: 'Bakes',
    image: cafeBake,
    description: 'Wild-fermented slow sourdough loaves, rosemary focaccia, and gluten-free pastries.'
  },
  {
    name: 'Botanical Tonics',
    shortName: 'Tonics',
    image: cafeMatcha,
    description: 'Adaptogenic herbal elixirs, organic kombucha, and cold-pressed wellness tonics.'
  },
];

export default assets;
