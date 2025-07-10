import { useEffect, useState } from 'react';
import Chart from '../components/Chart';

export default function Dashboard() {
  const [sales, setSales] = useState(0);
  const [orders, setOrders] = useState({ total: 0, pending: 0, preparing: 0, completed: 0, cancelled: 0 });
  const [customDrinks, setCustomDrinks] = useState(0);
  const [inventory, setInventory] = useState({ low: 0, out: 0 });
  const [salesData, setSalesData] = useState<{ name: string; sales: number }[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [popularItems, setPopularItems] = useState<any[]>([]);

  useEffect(() => {
    // Fetch all dashboard data in parallel
    Promise.all([
      fetch('http://localhost:5000/api/admin/dashboard/today-sales').then(r => r.json()),
      fetch('http://localhost:5000/api/admin/dashboard/orders-summary').then(r => r.json()),
      fetch('http://localhost:5000/api/admin/dashboard/custom-drinks').then(r => r.json()),
      fetch('http://localhost:5000/api/admin/dashboard/inventory-status').then(r => r.json()),
      fetch('http://localhost:5000/api/admin/dashboard/sales-chart').then(r => r.json()),
      fetch('http://localhost:5000/api/admin/dashboard/recent-orders').then(r => r.json()),
      fetch('http://localhost:5000/api/admin/dashboard/popular-items').then(r => r.json()).catch(() => []),
    ]).then(([sales, orders, customDrinks, inventory, salesData, recentOrders, popularItems]) => {
      setSales(sales.totalSales);
      setOrders(orders);
      setCustomDrinks(customDrinks.count);
      setInventory(inventory);
      setSalesData(salesData);
      setRecentOrders(recentOrders);
      setPopularItems(Array.isArray(popularItems) ? popularItems : []);
    });
  }, []);

  return (
    // Main container
    <div className="w-full max-w-full pb-4"> 
      <h1 className="text-2xl font-bold text-[#3e2723] mb-6">Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Todays Sales */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e4c9a7]">
          <h3 className="text-sm font-medium text-[#3e2723]">Today's Sales</h3>
          <p className="text-2xl font-bold text-[#3e2723] mt-2">₱{sales.toLocaleString()}</p>
        </div>
        
        {/* Orders */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e4c9a7]">
          <h3 className="text-sm font-medium text-[#5d4037] mb-1">Orders</h3>
          <p className="text-2xl font-bold text-[#3e2723] mt-2">Total Orders: {orders.total}</p>
          <p className="text-xs text-[#5d4037] mt-2">Pending: {orders.pending}</p>
        </div>
        
        {/* Custom Drinks */}
         <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e4c9a7]">
          <h3 className="text-sm font-medium text-[#5d4037] mb-1">Custom Drinks</h3>
          <p className="text-2xl font-bold text-[#3e2723] mt-2">{customDrinks}</p>
        </div>
        
        {/* Inventory Status */}
         <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e4c9a7]">
          <h3 className="text-sm font-medium text-[#5d4037] mb-1">Inventory Status</h3>
          <p className="text-2xl font-bold text-[#3e2723] mt-2">
            {inventory.out > 0 ? 'Out of Stock' : inventory.low > 0 ? 'Low Stock' : 'Good'}
          </p>
          
          <p className="text-xs text-amber-500 mt-2">
            {inventory.out > 0
              ? `${inventory.out} items out`
              : inventory.low > 0
              ? `${inventory.low} items low`
              : 'All good'}
          </p>
        </div>
      </div>
      
      {/* Charts section*/}
      <div className="mb-8 overflow-hidden">
        <Chart data={salesData} />
      </div>
      
      {/* Recent Orders*/}
      <div className="bg-white rounded-lg shadow-sm border border-[#e4c9a7] p-6 mb-8 overflow-x-auto">
        <h2 className="text-lg font-semibold text-[#3e2723] mb-4">Recent Orders</h2>
        
        <div className="min-w-full overflow-hidden">
          <table className="w-full">
            
            <thead className="bg-[#f8f4e5] text-[#5d4037]">
              <tr>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Items</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-[#e4c9a7]">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="py-3 px-4">#{order.id}</td>
                  <td className="py-3 px-4">{order.user_name}</td>
                  <td className="py-3 px-4">{order.items}</td>
                  <td className="py-3 px-4">₱{Number(order.total_amount).toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'preparing'
                        ? 'bg-amber-100 text-amber-800' 
                        : order.status === 'pending'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Popular Items - add last item margin bottom for scrolling */}
      <div className="bg-white rounded-lg shadow-sm border border-[#e4c9a7] p-6 mb-6">
        
        <h2 className="text-lg font-semibold text-[#3e2723] mb-4">Popular Items</h2>
        
        <div className="space-y-4">
          {popularItems.map((item, idx) => (
            <div className="flex justify-between items-center" key={idx}>
              <div className="flex items-center">
                
                <div className="w-10 h-10 bg-[#e4c9a7] rounded-md mr-3"></div>
                
                <div>
                  <p className="font-medium text-[#3e2723]">{item.name}</p>
                  <p className="text-sm text-[#5d4037]">{item.orders} orders</p>
                </div>
              </div>
              <div className="text-[#3e2723] font-semibold">₱{Number(item.price).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}