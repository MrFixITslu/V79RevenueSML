export interface MenuItem {
  id: number;
  name: string;
  category: 'Food' | 'Beverage' | 'Dessert';
  price: number;
  imageUrl: string;
  stock: number;
}

export interface OrderItem extends MenuItem {
  quantity: number;
}

export interface Sale {
  id: number;
  timestamp: string; // ISO String
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  prepTimeInSeconds?: number;
  customerId?: number; // For tracking customer sales
}

export interface KitchenOrder {
  id: number; // Corresponds to the Sale ID
  timestamp: string;
  items: OrderItem[];
  customerId?: number;
}

export interface ForecastData {
  month: string;
  revenue: number;
  profit: number;
}

export interface PurchaseRecord {
    date: string; // ISO String
    quantity: number;
    costPerUnit: number;
}

export interface InventoryItem {
    id: number;
    name: string;
    category: 'Produce' | 'Dairy' | 'Bakery' | 'Dry Goods' | 'Beverages';
    stock: number;
    unit: 'kg' | 'g' | 'liters' | 'ml' | 'units';
    reorderLevel: number;
    supplier: string;
    cost: number; // Cost per unit
    purchaseHistory: PurchaseRecord[];
}

export interface LoyaltyCustomer {
    id: number;
    name: string;
    email: string;
    points: number;
    joinDate: string; // ISO string format yyyy-mm-dd
}

export interface Reward {
    id: number;
    name: string;
    pointsRequired: number;
    icon: string;
}

export interface Expense {
    id: number;
    category: 'Rent' | 'Utilities' | 'Supplies' | 'Wages' | 'Marketing' | 'Inventory';
    description: string;
    amount: number;
    dueDate: string | 'COD'; // yyyy-mm-dd or 'COD'
    isRecurring?: boolean;
    status: 'Paid' | 'Due';
    invoiceUrl?: string;
}

export interface RecipeIngredient {
    inventoryItemId: number;
    quantity: number;
}

export interface Recipe {
    id: number;
    menuItemId: number;
    name: string; // Name of the recipe/menu item
    inMenu: boolean;
    ingredients: RecipeIngredient[];
    prepTime: number; // in minutes
    cleanTime: number; // in minutes
    utilitiesCost: number;
// Cost for napkins, boxes, cutlery etc.
    packagingCost: number;
    description: string;
    nutritionalInfo: string;
}

export interface WasteRecord {
    id: number;
    timestamp: string;
    inventoryItemId: number;
    quantity: number;
    reason: string;
}

export interface WageSettings {
  supervisor: number;
  staff: number;
}

export type UserRole = 'manager' | 'staff' | 'customer' | 'accountant';

export interface HeaderProps {
  title: string;
  currentUserRole: UserRole;
  currentCustomerName?: string;
  onLogout: () => void;
  activeCustomerOrderId?: number | null;
}