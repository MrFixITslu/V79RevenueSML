import { MenuItem, InventoryItem, LoyaltyCustomer, Expense, Recipe } from './types';

export const MENU_ITEMS: MenuItem[] = [
  { id: 1, name: 'Espresso', category: 'Beverage', price: 2.50, imageUrl: 'https://picsum.photos/seed/espresso/200', stock: 100 },
  { id: 2, name: 'Latte', category: 'Beverage', price: 3.50, imageUrl: 'https://picsum.photos/seed/latte/200', stock: 0 },
  { id: 3, name: 'Cappuccino', category: 'Beverage', price: 3.50, imageUrl: 'https://picsum.photos/seed/cappuccino/200', stock: 100 },
  { id: 4, name: 'Croissant', category: 'Food', price: 2.75, imageUrl: 'https://picsum.photos/seed/croissant/200', stock: 50 },
  { id: 5, name: 'Avocado Toast', category: 'Food', price: 8.50, imageUrl: 'https://picsum.photos/seed/avocado/200', stock: 0 },
  { id: 6, name: 'Chocolate Cake', category: 'Dessert', price: 5.50, imageUrl: 'https://picsum.photos/seed/cake/200', stock: 20 },
  { id: 7, name: 'Iced Tea', category: 'Beverage', price: 2.25, imageUrl: 'https://picsum.photos/seed/icedtea/200', stock: 80 },
  { id: 8, name: 'Bagel & Cream Cheese', category: 'Food', price: 4.25, imageUrl: 'https://picsum.photos/seed/bagel/200', stock: 40 },
  { id: 9, name: 'Cheesecake', category: 'Dessert', price: 6.00, imageUrl: 'https://picsum.photos/seed/cheesecake/200', stock: 15 },
];

export const BEST_SELLING_ITEMS = [
    { name: 'Latte', sales: 450 },
    { name: 'Avocado Toast', sales: 320 },
    { name: 'Cappuccino', sales: 310 },
    { name: 'Croissant', sales: 250 },
    { name: 'Espresso', sales: 200 },
];

export const HISTORICAL_SALES_DATA = [
    { month: "January", revenue: 15000, profit: 4500 },
    { month: "February", revenue: 16500, profit: 5000 },
    { month: "March", revenue: 18000, profit: 5500 },
    { month: "April", revenue: 17500, profit: 5200 },
    { month: "May", revenue: 19000, profit: 6000 },
    { month: "June", revenue: 21000, profit: 6500 },
];

export const INVENTORY_ITEMS: InventoryItem[] = [
  { id: 1, name: 'Coffee Beans', category: 'Beverages', stock: 20, unit: 'kg', reorderLevel: 10, supplier: 'Pro Roasters', cost: 15.50, purchaseHistory: [] },
  { id: 2, name: 'Whole Milk', category: 'Dairy', stock: 12, unit: 'liters', reorderLevel: 5, supplier: 'Farm Fresh', cost: 1.20, purchaseHistory: [] },
  { id: 3, name: 'All-Purpose Flour', category: 'Dry Goods', stock: 45, unit: 'kg', reorderLevel: 20, supplier: 'Bakers Co.', cost: 0.80, purchaseHistory: [] },
  { id: 4, name: 'Avocados', category: 'Produce', stock: 8, unit: 'units', reorderLevel: 10, supplier: 'Green Grocers', cost: 1.10, purchaseHistory: [] },
  { id: 5, name: 'Croissants', category: 'Bakery', stock: 24, unit: 'units', reorderLevel: 12, supplier: 'Paris Pastries', cost: 1.25, purchaseHistory: [] },
  { id: 6, name: 'Sugar', category: 'Dry Goods', stock: 50, unit: 'kg', reorderLevel: 15, supplier: 'Sweet Supply', cost: 1.00, purchaseHistory: [] },
  { id: 7, name: 'Chocolate Syrup', category: 'Dry Goods', stock: 4, unit: 'liters', reorderLevel: 5, supplier: 'Sweet Supply', cost: 5.00, purchaseHistory: [] },
  { id: 8, name: 'Paper Cups', category: 'Dry Goods', stock: 0, unit: 'units', reorderLevel: 100, supplier: 'Eco Packs', cost: 0.05, purchaseHistory: [] },
  { id: 9, name: 'Bread Slices', category: 'Bakery', stock: 50, unit: 'units', reorderLevel: 20, supplier: 'Bakers Co.', cost: 0.25, purchaseHistory: [] },
];

export const LOYALTY_CUSTOMERS: LoyaltyCustomer[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', points: 125, joinDate: '2023-01-15' },
    { id: 2, name: 'Bob Williams', email: 'bob.w@example.com', points: 48, joinDate: '2023-03-22' },
    { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', points: 280, joinDate: '2022-11-01' },
    { id: 4, name: 'Diana Miller', email: 'diana.m@example.com', points: 95, joinDate: '2023-05-10' },
    { id: 5, name: 'Ethan Davis', email: 'ethan.d@example.com', points: 15, joinDate: '2023-07-02' },
];

export const LOYALTY_STATS = [
    { title: "Total Members", value: LOYALTY_CUSTOMERS.length.toString() },
    { title: "Total Points Issued", value: LOYALTY_CUSTOMERS.reduce((acc, c) => acc + c.points, 0).toLocaleString() },
    { title: "Avg. Points/Member", value: Math.round(LOYALTY_CUSTOMERS.reduce((acc, c) => acc + c.points, 0) / LOYALTY_CUSTOMERS.length).toString() },
];

export const EXPENSES: Expense[] = [
    { id: 1, category: 'Rent', description: 'Monthly Rent', amount: 2500, dueDate: '2024-08-01', status: 'Paid', invoiceUrl: '#', isRecurring: true },
    { id: 2, category: 'Utilities', description: 'Electricity Bill', amount: 350, dueDate: '2024-07-25', status: 'Paid', isRecurring: true },
    { id: 3, category: 'Supplies', description: 'Napkins and Cutlery', amount: 150, dueDate: 'COD', status: 'Paid' },
    { id: 5, category: 'Utilities', description: 'Water & Gas', amount: 180, dueDate: '2024-08-05', status: 'Due', isRecurring: true },
];

export const RECIPES: Recipe[] = [
    {
        id: 1,
        menuItemId: 5, // Avocado Toast
        name: "Avocado Toast",
        inMenu: true,
        description: "Fresh smashed avocado on toasted artisan bread, seasoned with salt, pepper, and a hint of lime.",
        nutritionalInfo: "Calories: 290. Allergens: Gluten.",
        ingredients: [
            { inventoryItemId: 4, quantity: 1 }, // 1 avocado
            { inventoryItemId: 9, quantity: 2 }, // 2 bread slices
        ],
        prepTime: 5, // minutes
        cleanTime: 2, // minutes
        utilitiesCost: 0.25,
        packagingCost: 0.20,
    },
    {
        id: 2,
        menuItemId: 2, // Latte
        name: "Latte",
        inMenu: true,
        description: "A classic espresso-based drink with steamed milk and a thin layer of foam.",
        nutritionalInfo: "Calories: 190. Allergens: Dairy.",
        ingredients: [
            { inventoryItemId: 1, quantity: 0.02 }, // 20g of coffee beans
            { inventoryItemId: 2, quantity: 0.25 }, // 250ml of milk
        ],
        prepTime: 2, // minutes
        cleanTime: 1, // minutes
        utilitiesCost: 0.35,
        packagingCost: 0.15,
    }
];