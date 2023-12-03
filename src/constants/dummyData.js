import {native_rice, indoomie_pic, moimoi_rice, amala} from './images'
const RestuarantMenu = [
    {   
      id: 1,
      menu: 'Spicy Native Sauce',
      description: 'Indomie noodles cooked in Spicy sauce with Ofada',
      amount: 2500,
      image: require("../assets/images/nativerice.jpg")
    },
    {   
        id: 2,
        menu: 'Asian Beef Noodles',
        description: 'Special Mix of vegetables & dryfish cooked with indoomie',
        amount: 2500,
        image: require("../assets/images/noodles.jpg")
      },
      {   
        id: 3,
        menu: 'Rice, Moi-moi and Beef',
        description: 'Rice, moi-moi and stew and cooked beef plus one bottle of coke',
        amount: 7300,
        image: require("../assets/images/moimoi_rice.jpeg")
      },
      {   
        id: 4,
        menu: 'Aama Swallow Complete',
        description: 'Two wraps of amala, efo-riro and goat meat plus one bottle of coke',
        amount: 2500,
        image: require("../assets/images/amala.jpeg")
      },
]

const Company = [
  { label: 'Bank', value: 'Stanbic IBTC Bank' },
  { label: 'Pensions', value: 'Pensions' },
  { label: 'Asset Management', value: 'Asset Management' },
  { label: 'Insurance Brokers', value: 'Insurance Brokers' },
  { label: 'Live Insurance', value: 'Live Insurance' },
  { label: 'Stock Broking', value: 'Stock Broking' },
  { label: 'Trustees', value: 'Trustees' },
  { label: 'Nomimees', value: 'Nominees' },
  { label: 'Capital', value: 'Capital' },
];

const Department = [
  { label: 'Personal Banking', value: 'Personal Banking' },
  { label: 'Information Technology', value: 'Information Technology' },
  { label: 'Operations', value: 'Operations' },
  { label: 'Investment', value: 'Investment' },
  { label: 'People and Culture', value: 'People and Culture' },
  { label: 'Client Experience', value: 'Client Experience' },
  { label: 'Contributions', value: 'Contributions' },
  { label: 'Internal Control', value: 'Internal Control' },
];

export default {
    RestuarantMenu,
    Company,
    Department
}