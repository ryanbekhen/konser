import { validateEmail } from "./helpers"

export const base_url = process.env.PUBLIC_URL;

export const Categories = [
  {
    icon: '/image/accomodation.png',
    title: 'Accomodation'
  },
  {
    icon: '/image/clock.png',
    title: 'Activity'
  },
  {
    icon: '/image/attraction.png',
    title: 'Attraction'
  },
  {
    icon: '/image/boat.png',
    title: 'Phinisi'
  },
  {
    icon: '/image/ion_restaurant.png',
    title: 'Restaurant'
  },
  {
    icon: '/image/transport.png',
    title: 'Transportation'
  }
]

export const Offers = [
  {
    type: 'Domestice Flights',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit potongan 50%.',
    image: '/image/plane.png'
  },

  {
    type: 'International Hotels',
    title: 'Enjoy upto 20% off on International Hotels',
    description: 'Make the most of  this deal on your first booking with trxvl.',
    image: '/image/hotel.png'
  },
  
  {
    type: 'International Hotels',
    title: 'Enjoy upto 20% off on International Hotels',
    description: 'Make the most of  this deal on your first booking with trxvl.',
    image: '/image/hotel.png'
  },
]

export const Destinations = [
  {
    name: 'Hotel Winer',
    address: 'Lilir Timur Tiga, Palembang',
    rating: '4.5/5',
    star: 2,
    discount: '447.370',
    price: '422.001',
    image: '/image/beachHotel.png',
    fav: false
  },
  {
    name: 'Airish Hotel Palembang',
    address: 'Sukarami, Palembang',
    rating: '4.5/5',
    star: 3,
    discount: '447.370',
    price: '422.001',
    image: '/image/hotelTingkat.png',
    fav: true
  },
  {
    name: 'Hotel Winer',
    address: 'Lilir Timur Tiga, Palembang',
    rating: '4.5/5',
    star: 2,
    discount: '447.370',
    price: '422.001',
    image: '/image/beachHotel.png',
    fav: false
  },
  {
    name: 'Airish Hotel Palembang',
    address: 'Sukarami, Palembang',
    rating: '4.5/5',
    star: 3,
    discount: '447.370',
    price: '422.001',
    image: '/image/hotelTingkat.png',
    fav: true
  },
]

export const RecentlyDestinations = [
  {
    name: 'Hotel Winer',
    address: 'Lilir Timur Tiga, Palembang',
    rating: '4.5/5',
    star: 2,
    discount: '447.370',
    price: '422.001',
    image: '/image/beachHotel.png',
    fav: false
  },
  {
    name: 'Airish Hotel Palembang',
    address: 'Sukarami, Palembang',
    rating: '4.5/5',
    star: 3,
    discount: '447.370',
    price: '422.001',
    image: '/image/hotelTingkat.png',
    fav: true
  },
]

export const Nominal = [
  '10.000',
  '20.000',
  '40.000',
  '50.000',
  '80.000',
  '100.000'
]

export const Vouchers = [
  {
    name : "H&M",
    image: '/image/h&m.png',
  },
  {
    name : "Bakmi GM",
    image: '/image/bakmigm.png',
  },
  {
    name : "Kafe Betawi",
    image: '/image/kafe_betawi.png',
  },
  {
    name : "Fun World",
    image: '/image/fun_world.png',
  },
  {
    name : "Boga",
    image: '/image/boga.png',
  },
]

export const PaymentList = ["CC","Dana","LinkAja","OVO","Gopay","Shopee","qris"];
// export const PaymentListImage =  [`${base_url}/image/static/payment2/cc.png`,  `${base_url}/image/static/payment2/link_aja.png` , `${base_url}/image/static/payment2/qris.png` , `${base_url}/image/static/payment2/ovo.png`  ];
export const PaymentListImage = {
  LinkAja: "/image/static/payment2/link_aja.png",
  qris: "/image/static/payment2/qris.png",
}

export const validationArrayFn = (valueText,obj) => {
   const validationArrTemp = [
    {
      type : "email",
      condition : [valueText.length === 0,!validateEmail(valueText),valueText.length < 3],
      message : ['Email is required','Email is not valid','Email must be at least 3 letters']
    },
    {
      type : "password",
      condition : [valueText.length < 8],
      message : ["Password must be at least 8 letters"],
    },
    {
      type : "passConfirmation",
      condition : [valueText !== obj.password],
      message : ["Password confirmation is not same with the Password field"]
    },
    {
      type : "first_name",
      condition : [valueText.length === 0],
      message :[ "First Name is required"]
    },
    {
      type : "last_name",
      condition : [valueText.length === 0],
      message : ["Last Name is required"]
    },
    {
      type : "nik",
      condition : [valueText.length === 0,valueText.length !== 16],
      message : ["NIK Name is required",'NIK Length must be 16']
    },
    {
      type : "phone_number",
      condition : [valueText.length === 0],
      message : ["Phone Number is required"]
    }
  ]
  return validationArrTemp
}
