import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';
import Menu from './pages/Menu';
import Financials from './pages/Financials';
import Inventory from './pages/Inventory';
import Loyalty from './pages/Loyalty';
import Recipes from './pages/Recipes';
import Insights from './pages/Insights';
import Login from './pages/Login';
import POSLogs from './pages/POSLogs';
import Orders from './pages/Orders';
import CustomerMenu from './pages/CustomerMenu';
import Checkout from './pages/Checkout';
import Leaderboard from './pages/Leaderboard';
import Waste from './pages/Waste';
import OrderStatus from './pages/OrderStatus';
import Settings from './pages/Settings';
import Support from './pages/Support';
import Rewards from './pages/Rewards';
import OnboardingWizard from './components/OnboardingWizard';
import { Toaster, toast } from 'react-hot-toast';
import { MENU_ITEMS, INVENTORY_ITEMS, EXPENSES, RECIPES, LOYALTY_CUSTOMERS, HISTORICAL_SALES_DATA } from './constants';
import { MenuItem, InventoryItem, Expense, Recipe, Sale, UserRole, KitchenOrder, LoyaltyCustomer, WasteRecord, WageSettings, OrderItem } from './types';

function App() {
  const location = useLocation();
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(INVENTORY_ITEMS);
  const [expenses, setExpenses] = useState<Expense[]>(EXPENSES);
  const [recipes, setRecipes] = useState<Recipe[]>(RECIPES);
  const [loyaltyCustomers, setLoyaltyCustomers] = useState<LoyaltyCustomer[]>(LOYALTY_CUSTOMERS);
  const [sales, setSales] = useState<Sale[]>(HISTORICAL_SALES_DATA.flatMap((hs, i) => {
      // Create some fake historical sales for prep time calculation
      const date = new Date();
      date.setMonth(date.getMonth() - (HISTORICAL_SALES_DATA.length - i));
      const recipe = RECIPES[i % RECIPES.length];
      const menuItem = MENU_ITEMS.find(mi => mi.id === recipe.menuItemId);
      if (!menuItem) return [];
      
      const prepTime = (recipe.prepTime + recipe.cleanTime) * 60 * (Math.random() * 0.4 + 0.8); // +/- 20% variance
      return [{
          id: Date.now() + i,
          timestamp: date.toISOString(),
          items: [{...menuItem, quantity: 1}],
          subtotal: menuItem.price,
          discount: 0,
          total: menuItem.price,
          prepTimeInSeconds: prepTime,
      }]
  }));
  const [kitchenOrders, setKitchenOrders] = useState<KitchenOrder[]>([]);
  const [wasteRecords, setWasteRecords] = useState<WasteRecord[]>([]);
  const [wageSettings, setWageSettings] = useState<WageSettings>({ supervisor: 25, staff: 20 });
  const [currentUserRole, setCurrentUserRole] = useState<UserRole | null>(null);
  const [currentCustomerId, setCurrentCustomerId] = useState<number | null>(null);
  const [ordersReadyForPickup, setOrdersReadyForPickup] = useState<Set<number>>(new Set());
  const [activeCustomerOrderId, setActiveCustomerOrderId] = useState<number | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const currentCustomer = loyaltyCustomers.find(c => c.id === currentCustomerId);

  useEffect(() => {
    if (currentUserRole === 'customer' && currentCustomerId) {
        ordersReadyForPickup.forEach(orderId => {
            const sale = sales.find(s => s.id === orderId && s.customerId === currentCustomerId);
            if (sale) {
                toast.custom(
                    (t) => (
                        <div
                            className={`${
                                t.visible ? 'animate-enter' : 'animate-leave'
                            } max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                        >
                            <div className="flex-1 w-0 p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 pt-0.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-primary-500">
                                            <path d="M10.75 10.033c.097.02.197.03.3.049l-1.35 2.16a.75.75 0 00.6 1.158h.4l.8-1.28v3.13a.75.75 0 001.5 0v-3.13l.8 1.28h.4a.75.75 0 00.6-1.158l-1.35-2.16c.103-.018.203-.028.3-.049a4.5 4.5 0 10-2.2 0z" />
                                            <path fillRule="evenodd" d="M2.21 8.796a.75.75 0 011.054.082 7.5 7.5 0 0113.336-1.597 1 1 0 01.75-.27l4.002.571a.75.75 0 11-.214 1.488l-3.32.475a5.998 5.998 0 01-11.444 2.89 5.995 5.995 0 01-1.15-1.571.75.75 0 01.082-1.054zM4.406 12.24a4.5 4.5 0 017.938-1.548 4.502 4.502 0 013.97 1.548H4.406z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3 flex-1">
                                        <p className="text-base font-medium text-gray-900 dark:text-white">
                                            Order Ready for Pickup!
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Your order (#{orderId.toString().slice(-4)}) is ready.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex border-l border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => {
                                        toast.dismiss(t.id);
                                        setOrdersReadyForPickup(prev => {
                                            const newSet = new Set(prev);
                                            newSet.delete(orderId);
                                            return newSet;
                                        });
                                    }}
                                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    ),
                    { id: `pickup-${orderId}`, duration: Infinity }
                );
            }
        });
    }
  }, [ordersReadyForPickup, currentUserRole, currentCustomerId, sales]);

  const getTitle = () => {
    let currentPath = location.pathname;
    if (currentUserRole === 'staff' && location.pathname === '/') currentPath = '/pos';
    if (currentUserRole === 'accountant' && location.pathname === '/') currentPath = '/financials';
    if (currentUserRole === 'customer' && location.pathname === '/') currentPath = '/order';
    
    switch (currentPath) {
      case '/': return 'Dashboard';
      case '/pos': return 'Point of Sale';
      case '/pos-logs': return 'POS Logs';
      case '/orders': return 'Kitchen Orders';
      case '/menu': return 'Menu Management';
      case '/recipes': return 'Recipe Management';
      case '/financials': return 'Financials';
      case '/inventory': return 'Inventory';
      case '/waste': return 'Waste Tracking';
      case '/loyalty': return 'Customer Loyalty';
      case '/insights': return 'AI Insights';
      case '/order': return 'Order Online';
      case '/checkout': return 'Checkout';
      case '/leaderboard': return 'Loyalty Leaderboard';
      case '/rewards': return 'My Rewards';
      case '/order-status': return 'Your Order Status';
      case '/settings': return 'Settings';
      case '/support': return 'Support';
      default: return 'CafeMaster AI';
    }
  };

  const handleLogin = (role: UserRole, customerId?: number) => {
    setCurrentUserRole(role);
    if (role === 'customer' && customerId) {
      setCurrentCustomerId(customerId);
    }
    if (role === 'manager' && !localStorage.getItem('onboardingComplete')) {
      setShowOnboarding(true);
    }
  };
  
  const handleLogout = () => {
    setCurrentUserRole(null);
    setCurrentCustomerId(null);
    setActiveCustomerOrderId(null);
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setShowOnboarding(false);
  };

  const updateInventoryAndMenu = (order: OrderItem[]) => {
    const recipeMap = new Map(recipes.map(r => [r.menuItemId, r]));

    setInventoryItems(prevItems => {
        const inventoryUpdates = new Map<number, number>();
        order.forEach(orderItem => {
            const recipe = recipeMap.get(orderItem.id);
            if (recipe) {
                recipe.ingredients.forEach(ingredient => {
                    const totalDeduction = ingredient.quantity * orderItem.quantity;
                    inventoryUpdates.set(ingredient.inventoryItemId, (inventoryUpdates.get(ingredient.inventoryItemId) || 0) + totalDeduction);
                });
            }
        });
        return prevItems.map(item =>
            inventoryUpdates.has(item.id)
                ? { ...item, stock: Math.max(0, item.stock - (inventoryUpdates.get(item.id) || 0)) }
                : item
        );
    });

    setMenuItems(prevItems => {
        const menuStockUpdates = new Map<number, number>();
        order.forEach(orderItem => {
             if (!recipeMap.has(orderItem.id)) {
                menuStockUpdates.set(orderItem.id, (menuStockUpdates.get(orderItem.id) || 0) + orderItem.quantity);
             }
        });
        return prevItems.map(item =>
            menuStockUpdates.has(item.id)
                ? { ...item, stock: Math.max(0, item.stock - (menuStockUpdates.get(item.id) || 0)) }
                : item
        );
    });
  };

  const handleSale = (saleDetails: { order: OrderItem[], subtotal: number, discount: number, total: number }) => {
    const newSale: Sale = { id: Date.now(), timestamp: new Date().toISOString(), items: saleDetails.order, ...saleDetails };
    setSales(prevSales => [newSale, ...prevSales]);
    setKitchenOrders(prevOrders => [...prevOrders, { id: newSale.id, timestamp: newSale.timestamp, items: newSale.items }]);
    updateInventoryAndMenu(saleDetails.order);
  };

  const handleCustomerSale = (saleDetails: { order: OrderItem[], subtotal: number, discount: number, total: number, pointsRedeemed: number }) => {
    if (!currentCustomerId) return;
    const { order, subtotal, discount, total, pointsRedeemed } = saleDetails;
    
    const pointsEarned = Math.floor(total * 10);
    
    const newSale: Sale = { id: Date.now(), timestamp: new Date().toISOString(), items: order, subtotal, discount, total, customerId: currentCustomerId };
    setSales(prevSales => [newSale, ...prevSales]);
    setKitchenOrders(prevOrders => [...prevOrders, { id: newSale.id, timestamp: newSale.timestamp, items: newSale.items, customerId: currentCustomerId }]);
    updateInventoryAndMenu(order);
    setActiveCustomerOrderId(newSale.id);

    setLoyaltyCustomers(prevCustomers =>
      prevCustomers.map(c =>
        c.id === currentCustomerId
          ? { ...c, points: c.points - pointsRedeemed + pointsEarned }
          : c
      )
    );
    toast.success(`Order placed! You earned ${pointsEarned} points.`);
  };

  const handleAddExpense = (expenseData: Omit<Expense, 'id' | 'status'>, inventoryUpdate?: { itemId: number; quantity: number }) => {
    const newExpense: Expense = {
        ...expenseData,
        id: Date.now(),
        status: expenseData.dueDate === 'COD' ? 'Paid' : 'Due',
    };
    setExpenses(prev => [...prev, newExpense]);

    if (inventoryUpdate) {
        setInventoryItems(prevInventory =>
            prevInventory.map(item =>
                item.id === inventoryUpdate.itemId
                    ? { ...item, stock: item.stock + inventoryUpdate.quantity }
                    : item
            )
        );
    }
  };
  
  const handleRecordWaste = (inventoryItemId: number, quantity: number, reason: string) => {
    setInventoryItems(prevItems =>
      prevItems.map(item =>
        item.id === inventoryItemId
          ? { ...item, stock: Math.max(0, item.stock - quantity) }
          : item
      )
    );
    const newWasteRecord: WasteRecord = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      inventoryItemId,
      quantity,
      reason
    };
    setWasteRecords(prev => [newWasteRecord, ...prev]);
    toast.success('Waste recorded.');
  };

  const handleCompleteOrder = (orderId: number) => {
    const orderToComplete = kitchenOrders.find(o => o.id === orderId);
    if (!orderToComplete) return;

    const prepTimeInSeconds = (new Date().getTime() - new Date(orderToComplete.timestamp).getTime()) / 1000;

    setSales(prevSales =>
        prevSales.map(s =>
            s.id === orderId ? { ...s, prepTimeInSeconds } : s
        )
    );

    setKitchenOrders(prevOrders => prevOrders.filter(o => o.id !== orderId));
    
    if (orderToComplete.id === activeCustomerOrderId) {
        setActiveCustomerOrderId(null);
    }
    
    if (orderToComplete.customerId) {
        setOrdersReadyForPickup(prev => new Set(prev).add(orderId));
    }

    toast.success(`Order #${orderId.toString().slice(-4)} completed!`);
  };

  if (!currentUserRole) {
    return <Login onLogin={handleLogin} loyaltyCustomers={loyaltyCustomers} />;
  }
  
  const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      {showOnboarding && currentUserRole === 'manager' && <OnboardingWizard onComplete={handleOnboardingComplete} />}
      <Toaster position="top-center" reverseOrder={false} toastOptions={{
        className: 'font-sans',
        style: {
          background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
          color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#1f2937',
        },
      }}/>
      <Sidebar currentUserRole={currentUserRole} activeCustomerOrderId={activeCustomerOrderId} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getTitle()} currentUserRole={currentUserRole} onLogout={handleLogout} currentCustomerName={currentCustomer?.name} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );

  return (
      <Routes>
        {currentUserRole === 'manager' && (
          <Route path="/*" element={
            <AppLayout>
              <Routes>
                <Route path="/" element={<Dashboard sales={sales} recipes={recipes} inventoryItems={inventoryItems} historicalSales={HISTORICAL_SALES_DATA} />} />
                <Route path="/pos" element={<POS menuItems={menuItems} inventoryItems={inventoryItems} recipes={recipes} onSale={handleSale} />} />
                <Route path="/orders" element={<Orders orders={kitchenOrders} onCompleteOrder={handleCompleteOrder} />} />
                <Route path="/pos-logs" element={<POSLogs sales={sales} />} />
                <Route path="/menu" element={<Menu menuItems={menuItems} setMenuItems={setMenuItems} currentUserRole={currentUserRole} recipes={recipes} />} />
                <Route path="/recipes" element={<Recipes recipes={recipes} setRecipes={setRecipes} menuItems={menuItems} inventoryItems={inventoryItems} wageSettings={wageSettings} currentUserRole={currentUserRole} />} />
                <Route path="/financials" element={<Financials expenses={expenses} onAddExpense={handleAddExpense} wageSettings={wageSettings} setWageSettings={setWageSettings} historicalSales={HISTORICAL_SALES_DATA} inventoryItems={inventoryItems} />} />
                <Route path="/inventory" element={<Inventory items={inventoryItems} />} />
                <Route path="/waste" element={<Waste inventoryItems={inventoryItems} wasteRecords={wasteRecords} onRecordWaste={handleRecordWaste} />} />
                <Route path="/loyalty" element={<Loyalty customers={loyaltyCustomers} setCustomers={setLoyaltyCustomers} currentUserRole={currentUserRole} />} />
                <Route path="/insights" element={<Insights menuItems={menuItems} inventoryItems={inventoryItems} recipes={recipes} expenses={expenses} historicalSales={HISTORICAL_SALES_DATA} />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/support" element={<Support />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AppLayout>
          } />
        )}
        {currentUserRole === 'staff' && (
          <Route path="/*" element={
            <AppLayout>
              <Routes>
                <Route path="/" element={<Navigate to="/pos" replace />} />
                <Route path="/pos" element={<POS menuItems={menuItems} inventoryItems={inventoryItems} recipes={recipes} onSale={handleSale} />} />
                <Route path="/orders" element={<Orders orders={kitchenOrders} onCompleteOrder={handleCompleteOrder} />} />
                <Route path="/menu" element={<Menu menuItems={menuItems} setMenuItems={setMenuItems} currentUserRole={currentUserRole} recipes={recipes} />} />
                <Route path="/recipes" element={<Recipes recipes={recipes} setRecipes={setRecipes} menuItems={menuItems} inventoryItems={inventoryItems} wageSettings={wageSettings} currentUserRole={currentUserRole} />} />
                <Route path="/inventory" element={<Inventory items={inventoryItems} />} />
                <Route path="/waste" element={<Waste inventoryItems={inventoryItems} wasteRecords={wasteRecords} onRecordWaste={handleRecordWaste} />} />
                <Route path="/loyalty" element={<Loyalty customers={loyaltyCustomers} setCustomers={setLoyaltyCustomers} currentUserRole={currentUserRole} />} />
                <Route path="/support" element={<Support />} />
                <Route path="*" element={<Navigate to="/pos" replace />} />
              </Routes>
            </AppLayout>
          } />
        )}
        {currentUserRole === 'accountant' && (
            <Route path="/*" element={
                <AppLayout>
                    <Routes>
                        <Route path="/" element={<Navigate to="/financials" replace />} />
                        <Route path="/financials" element={<Financials expenses={expenses} onAddExpense={handleAddExpense} wageSettings={wageSettings} setWageSettings={setWageSettings} historicalSales={HISTORICAL_SALES_DATA} inventoryItems={inventoryItems} />} />
                        <Route path="/pos-logs" element={<POSLogs sales={sales} />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="*" element={<Navigate to="/financials" replace />} />
                    </Routes>
                </AppLayout>
            } />
        )}
        {currentUserRole === 'customer' && currentCustomer && (
            <Route path="/*" element={
              <AppLayout>
                <Routes>
                    <Route path="/" element={<Navigate to="/order" replace />} />
                    <Route path="/order" element={<CustomerMenu menuItems={menuItems} recipes={recipes} inventoryItems={inventoryItems} />} />
                    <Route path="/checkout" element={<Checkout customer={currentCustomer} onSale={handleCustomerSale} />} />
                    <Route path="/leaderboard" element={<Leaderboard allCustomers={loyaltyCustomers} currentCustomerId={currentCustomerId!} />} />
                    <Route path="/rewards" element={<Rewards customer={currentCustomer} />} />
                    <Route path="/order-status" element={<OrderStatus activeOrderId={activeCustomerOrderId} kitchenOrders={kitchenOrders} sales={sales} recipes={recipes} />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="*" element={<Navigate to="/order" replace />} />
                </Routes>
              </AppLayout>
            } />
        )}
      </Routes>
  );
}

export default App;