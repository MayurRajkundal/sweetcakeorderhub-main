
import { Cake, Product } from "../types/product";

// Cakes data with Indian prices
export const initialCakes: Cake[] = [
  {
    id: "vanilla-cake",
    name: "Classic Vanilla Cake",
    description: "A light and fluffy vanilla cake with buttercream frosting. Perfect for birthdays and celebrations.",
    price: 1200, // ₹1,200
    image: "/vanilla-cake.jpg",
    category: "cakes",
    popular: true,
    flavors: ["vanilla", "strawberry", "lemon"],
    fillings: ["buttercream", "fruit jam", "cream cheese"],
    toppings: ["fresh fruit", "sprinkles", "flowers"],
  },
  {
    id: "chocolate-cake",
    name: "Rich Chocolate Cake",
    description: "A decadent chocolate cake with ganache frosting. Made with premium cocoa for true chocolate lovers.",
    price: 1500, // ₹1,500
    image: "/chocolate-cake.jpg",
    category: "cakes",
    popular: true,
    flavors: ["chocolate", "vanilla", "red velvet"],
    fillings: ["chocolate ganache", "buttercream", "caramel"],
    toppings: ["chocolate shavings", "fresh fruit", "macarons"],
  },
  {
    id: "strawberry-cake",
    name: "Fresh Strawberry Cake",
    description: "A moist strawberry cake layered with fresh strawberries and strawberry buttercream.",
    price: 1350, // ₹1,350
    image: "/strawberry-cake.jpg",
    category: "cakes",
    popular: false,
    flavors: ["strawberry", "vanilla", "lemon"],
    fillings: ["buttercream", "fruit jam", "cream cheese"],
    toppings: ["fresh fruit", "sprinkles"],
  },
  {
    id: "red-velvet-cake",
    name: "Red Velvet Cake",
    description: "A classic red velvet cake with cream cheese frosting. Rich, moist, and slightly tangy.",
    price: 1450, // ₹1,450
    image: "/red-velvet-cake.jpg",
    category: "cakes",
    popular: true,
    flavors: ["red velvet", "chocolate"],
    fillings: ["cream cheese", "buttercream"],
    toppings: ["sprinkles", "chocolate shavings"],
  },
  {
    id: "carrot-cake",
    name: "Spiced Carrot Cake",
    description: "A spiced carrot cake with walnuts and cream cheese frosting. A perfect balance of sweetness and spice.",
    price: 1300, // ₹1,300
    image: "/carrot-cake.webp",
    category: "cakes",
    popular: false,
    flavors: ["carrot", "vanilla"],
    fillings: ["cream cheese", "buttercream"],
    toppings: ["sprinkles", "flowers"],
  },
  {
    id: "lemon-cake",
    name: "Zesty Lemon Cake",
    description: "A refreshing lemon cake with lemon curd filling and lemon buttercream. Perfect for summer parties.",
    price: 1250, // ₹1,250
    image: "/lemon-cake.jpg",
    category: "cakes",
    popular: false,
    flavors: ["lemon", "vanilla"],
    fillings: ["fruit jam", "buttercream"],
    toppings: ["fresh fruit", "flowers"],
  },
  {
    id: "caramel-cake",
    name: "Salted Caramel Cake",
    description: "A buttery cake with salted caramel filling and caramel buttercream. Sweet and salty perfection.",
    price: 1500, // ₹1,500
    image: "/caramel-cake.webp",
    category: "cakes",
    popular: false,
    flavors: ["vanilla", "chocolate"],
    fillings: ["caramel", "buttercream"],
    toppings: ["fresh fruit", "flowers"],
  },
  {
    id: "macaron-cake",
    name: "Macaron Cake",
    description: "A light almond cake with buttercream filling and topped with colorful macarons.",
    price: 1800, // ₹1,800
    image: "/macaron-cake.png",
    category: "cakes",
    popular: true,
    flavors: ["vanilla", "strawberry", "chocolate"],
    fillings: ["buttercream", "cream cheese", "chocolate ganache"],
    toppings: ["macarons", "fresh fruit", "flowers"],
  },
];

// Pastries, cupcakes, cookies, and breads with Indian prices
export const initialPastries: Product[] = [
  {
    id: "croissant",
    name: "Butter Croissant",
    description: "A classic French pastry with a flaky, buttery texture.",
    price: 120, // ₹120
    image: "/Butter-croissant.png",
    category: "pastries",
    popular: true,
  },
  {
    id: "pain-au-chocolat",
    name: "Pain au Chocolat",
    description: "A chocolate-filled croissant pastry. The perfect breakfast treat.",
    price: 150, // ₹150
    image: "/pain-chocolat.png",
    category: "pastries",
    popular: false,
  },
  {
    id: "danish",
    name: "Mixed Fruit Danish",
    description: "A flaky pastry filled with pastry cream and topped with seasonal fruits.",
    price: 130, // ₹130
    image: "/Mixed-fruit.png",
    category: "pastries",
    popular: true,
  },
  {
    id: "eclair",
    name: "Chocolate Éclair",
    description: "A choux pastry filled with vanilla custard and topped with chocolate glaze.",
    price: 140, // ₹140
    image: "/eclair.png",
    category: "pastries",
    popular: false,
  },
];

export const initialCupcakes: Product[] = [
  {
    id: "vanilla-cupcake",
    name: "Vanilla Cupcake",
    description: "A moist vanilla cupcake topped with buttercream frosting and sprinkles.",
    price: 80, // ₹80
    image: "/Vanila-cup.png",
    category: "cupcakes",
    popular: true,
  },
  {
    id: "chocolate-cupcake",
    name: "Chocolate Cupcake",
    description: "A rich chocolate cupcake with chocolate buttercream frosting.",
    price: 90, // ₹90
    image: "/Chocolat-cup.png",
    category: "cupcakes",
    popular: true,
  },
  {
    id: "red-velvet-cupcake",
    name: "Red Velvet Cupcake",
    description: "A classic red velvet cupcake with cream cheese frosting.",
    price: 95, // ₹95
    image: "/Red-cup.png",
    category: "cupcakes",
    popular: false,
  },
  {
    id: "lemon-cupcake",
    name: "Lemon Cupcake",
    description: "A zesty lemon cupcake with lemon buttercream frosting.",
    price: 85, // ₹85
    image: "/lemon-cup.png",
    category: "cupcakes",
    popular: false,
  },
];

export const initialCookies: Product[] = [
  {
    id: "chocolate-chip",
    name: "Chocolate Chip Cookie",
    description: "A classic chocolate chip cookie with a soft center and crisp edges.",
    price: 60, // ₹60
    image: "/choco-chip.jpg",
    category: "cookies",
    popular: true,
  },
  {
    id: "oatmeal-raisin",
    name: "Oatmeal Raisin Cookie",
    description: "A hearty oatmeal cookie with plump raisins and a hint of cinnamon.",
    price: 65, // ₹65
    image: "/oatmeal-chip.jpg",
    category: "cookies",
    popular: false,
  },
  {
    id: "peanut-butter",
    name: "Peanut Butter Cookie",
    description: "A soft peanut butter cookie with the perfect balance of sweet and salty.",
    price: 70, // ₹70
    image: "/peanut-chip.jpg",
    category: "cookies",
    popular: false,
  },
  {
    id: "sugar-cookie",
    name: "Sugar Cookie",
    description: "A classic sugar cookie with a crisp exterior and chewy interior.",
    price: 55, // ₹55
    image: "/sugar-chip.jpg",
    category: "cookies",
    popular: true,
  },
];

export const initialBreads: Product[] = [
  {
    id: "sourdough",
    name: "Sourdough Bread",
    description: "A tangy sourdough bread with a crusty exterior and chewy interior.",
    price: 180, // ₹180
    image: "/sourdough.png",
    category: "breads",
    popular: true,
  },
  {
    id: "baguette",
    name: "French Baguette",
    description: "A traditional French baguette with a crisp crust and soft interior.",
    price: 160, // ₹160
    image: "/french.png",
    category: "breads",
    popular: false,
  },
  {
    id: "focaccia",
    name: "Rosemary Focaccia",
    description: "A flat Italian bread flavored with olive oil, rosemary, and sea salt.",
    price: 200, // ₹200
    image: "/rosemary.png",
    category: "breads",
    popular: true,
  },
  {
    id: "ciabatta",
    name: "Ciabatta Bread",
    description: "An Italian white bread made with wheat flour and yeast, with a light and airy texture.",
    price: 190, // ₹190
    image: "/ciabatta.png",
    category: "breads",
    popular: false,
  },
];
