import { IoStarOutline } from "react-icons/io5";

export const navbar = [
  {
    id: 1,
    path: "/",
    nav: "Home",
  },
  {
    id: 2,
    path: "/about",
    nav: "About",
  },
  {
    id: 3,
    path: "/shop",
    nav: "Shop",
  },
  {
    id: 4,
    path: "/cart",
    nav: "Cart",
  },
  {
    id: 5,
    path: "/contact",
    nav: "Contact",
  },
];

export const banners = [
  {
    banner: "../images/slider3.jpg",
  },
  {
    banner: "../images/slider2.png",
  },
  {
    banner: "../images/slider1.png",
  },
];

export const bannar_down = [
  {
    img: "../images/clothes.jpeg",
    name: "CLOTHES",
  },
  {
    img: "../images/cosmetic.jpeg",
    name: "COSMETIC",
  },
  {
    img: "../images/craft.png",
    name: "CRAFTS",
  },
];

export const feateures = [
  {
    id: 1,
    img: "../images/pink1.png",
    tag: "new",
    btn: "Select Options",
    category: "JEWELLERY",
    title: "Shop",
    short_description: "Leather Collar Necklace",
    rating: Array(5).fill({ icon: <IoStarOutline /> }),
    price: "129.00",
    description:
      "Discover exquisite handmade jewelry at the best prices. Elevate your style with our unique pieces, meticulously crafted for you. Explore now!",
  },
  {
    id: 2,
    img: "../images/basket.png",
    tag: "new",
    btn: "Select Options",
    category: "Crafts",
    title: "Shop",
    short_description: "Rope Baskets + Bowls, Four Sizes",
    rating: Array(5).fill({ icon: <IoStarOutline /> }),
    price: "129.00",
    description:
      "Add charm to your space with our handmade rope baskets and bowls, available in four sizes. Elevate your home decor with these versatile essentials. Shop now!",
  },
  {
    id: 3,
    img: "../images/cover.png",
    tag: "new",
    btn: "Select Options",
    category: "Crafts",
    title: "Shop",
    short_description: "Hand Embroidered Cactus Pillow Cover",
    rating: Array(5).fill({ icon: <IoStarOutline /> }),
    price: "129.00",
    description:
      "The pattern is hand embroidered & hand painted to give a dimension by me in my smoke free studio.The pillow cover has an envelope closure.Overlocked inner seams.Fabrics used for the pillow/cushion cover are linen and rayon blend and are all Pre washed before stitching (for shrinkage)",
  },
  {
    id: 4,
    img: "../images/kurti.png",
    tag: "new",
    btn: "Select Options",
    category: "Womens",
    title: "Shop",
    short_description: "Elegant Kurtis",
    rating: Array(5).fill({ icon: <IoStarOutline /> }),
    price: "129.00",
    description:
      "Indulge in timeless elegance with our exquisite collection of Kurtis. Crafted with the finest fabrics and attention to detail, these pieces are perfect for any occasion. Elevate your wardrobe with effortless style. Shop now!",
  },
  // {
  //   id: 5,
  //   img: "../images/top_jeans_side.jpg",
  //   tag: "new",
  //   btn: "Select Options",
  //   category: "Womens",
  //   title: "Shop",
  //   short_description: "Lorem ipsum dolor",
  //   rating: Array(5).fill({ icon: <IoStarOutline /> }),
  //   price: "129.00",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit  euismod er  elitLorem ipsum dolor sit amet, consectetur adipiscing elit  euismod er  elit",
  // },
  // {
  //   id: 6,
  //   img: "../images/light_black_face.jpg",
  //   tag: "new",
  //   btn: "Select Options",
  //   category: "Womens",
  //   title: "Shop",
  //   short_description: "Lorem ipsum dolor",
  //   rating: Array(5).fill({ icon: <IoStarOutline /> }),
  //   price: "129.00",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit  euismod er  elitLorem ipsum dolor sit amet, consectetur adipiscing elit  euismod er  elit",
  // },

  // {
  //   id: 7,
  //   img: "../images/red.jpg",
  //   tag: "new",
  //   btn: "Select Options",
  //   category: "Womens",
  //   title: "Kurti",
  //   short_description: "Lorem ipsum dolor",
  //   rating: Array(5).fill({ icon: <IoStarOutline /> }),
  //   price: "129.00",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit  euismod er  elitLorem ipsum dolor sit amet, consectetur adipiscing elit  euismod er  elit",
  // },
  // {
  //   id: 8,
  //   img: "../images/black_face.jpg",
  //   tag: "new",
  //   btn: "Select Options",
  //   category: "Womens",
  //   title: "Kurti",
  //   short_description: "Lorem ipsum dolor",
  //   rating: Array(5).fill({ icon: <IoStarOutline /> }),
  //   price: "129.00",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit  euismod er  elitLorem ipsum dolor sit amet, consectetur adipiscing elit  euismod er  elit",
  // },
  // {
  //   id: 9,
  //   img: "../images/black_side.jpg",
  //   tag: "new",
  //   btn: "Select Options",
  //   category: "Womens",
  //   title: "Kurti",
  //   short_description: "Lorem ipsum dolor",
  //   rating: Array(5).fill({ icon: <IoStarOutline /> }),
  //   price: "129.00",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit  euismod er  elitLorem ipsum dolor sit amet, consectetur adipiscing elit  euismod er  elit",
  // },
];

export const reviews = [
  {
    title: "Customer Review",
    description:
      "Absolutely love the products! The craftsmanship is exceptional, and the customer service is top-notch. Will definitely be shopping here again!",
    customer_img: "../images/testi1.jpg",
    customer_name: "Sarah Johnson",
    position: "Marketing Manager",
  },

  {
    title: "Customer Review",
    description:
      "I recently purchased a few items from here, and I'm thrilled with my purchase! The quality is fantastic, and the prices are reasonable. Highly recommend!",
    customer_img: "../images/testi2.jpg",
    customer_name: "Emily Parker",
    position: "Teacher",
  },

  {
    title: "Customer Review",
    description:
      "I'm impressed with the variety of products available. The website is user-friendly, and the delivery was prompt. Overall, a great shopping experience!",
    customer_img: "../images/testi3.jpg",
    customer_name: "John Smith",
    position: "Software Engineer",
  },
];

export const blogs = [
  {
    id: 1,
    img: "../images/slider2.png",
    tag: "8 May",
    // title: "Shop",
    short_description: "Discover how LOCALE MARKET empowers home-based sellers by providing a dedicated platform to showcase their unique products and reach a global audience.",
    read_more: "Blog",
  },
  {
    id: 2,
    img: "../images/download.jpeg",
    tag: "8 May",
    // title: "Shop",
    short_description: "Learn about the seamless shopping experience on LOCALE MARKET, where customers can browse diverse locally made products, filter their search, and make secure purchases easily.",
    read_more: "Blog",
  },
  {
    id: 3,
    img: "../images/slider1.png",
    tag: "8 May",
    // title: "Shop",
    short_description: "Ensuring a secure and efficient marketplace, our administrator monitors activities, manages user accounts, and maintains compliance, fostering a trustworthy environment for all.",
    read_more: "Blog",
  },
  // {
  //   id: 4,
  //   img: "../images/13-home_default.jpg",
  //   tag: "8 May",
  //   // title: "Shop",
  //   short_description: "Lorem ipsum dolor",
  //   read_more: "Blog",
  // },
  // {
  //   id: 5,
  //   img: "../images/kurti.jpg",
  //   tag: "8 May",
  //   title: "Shop",
  //   short_description: "Lorem ipsum dolor",
  //   read_more: "Read More",
  // },
  // {
  //   id: 6,
  //   img: "../images/14-home_default.jpg",
  //   tag: "8 May",
  //   title: "Shop",
  //   short_description: "Lorem ipsum dolor",
  //   read_more: "Read More",
  // },
];

export const footer = [
  {
    id: 2,
    header: "Contact Us",
    content1: "About Us",
    content2: "Addresses",
    // content3: "Order",
    // content4: "Payments",
    // content5: "Suppliers",
  },
  {
    id: 3,
    header: "Transactions",
    // content1: "About Us",
    // content2: "Addresses",
    content3: "Order",
    content4: "Payments",
    content5: "Suppliers",
  },
  // {
  //   id: 4,
  //   header: "Cart",
  //   content1: "Products",
  //   // content2: "Addresses",
  //   // content3: "Order",
  //   // content4: "Payments",
  //   // content5: "Suppliers",
  // },
  // {
  //   id: 5,
  //   header: "Contact Us",
  //   content1: "About Us",
  //   content2: "Addresses",
  //   content3: "Order",
  //   content4: "Payments",
  //   content5: "Suppliers",
  // },
];
