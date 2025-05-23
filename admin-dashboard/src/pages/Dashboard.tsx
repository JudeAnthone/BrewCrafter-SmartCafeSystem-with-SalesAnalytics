import Chart from '../components/Chart';

export default function Dashboard() {
  
   const salesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 5000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 6890 },
    { name: 'Sat', sales: 7800 },
    { name: 'Sun', sales: 4300 },
  ];

  return (
    //Main container
    <div> 
      <h1 className="text-2xl font-bold text-[#3e2723] mb-6">Dashboard</h1>
      {/* Summary Cards */}
      {/* Sales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e4c9a7]">
          <h3 className="text-sm font-medium text-[#3e2723]">Today's Sales</h3>
          <p className="text-2xl font-bold text-[#3e2723] mt-2">₱12,590</p>
          <p className="text-xs text-green-600 mt-2">↑ 12% from yesterday</p>
        </div>
        
        
        {/* Orders */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e4c9a7]">
          <h3 className="text-sm font-medium text-[#5d4037] mb-1">Orders</h3>
          <p className="text-2xl font-bold text-[#3e2723] mt-2">Total Orders: 45</p>
          <p className="text-xs text-[#5d4037] mt-2">Pending: 18</p>
        </div>
        
        {/* Custom Drinks */}
         <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e4c9a7]">
          <h3 className="text-sm font-medium text-[#5d4037] mb-1">Custom Drinks</h3>
          <p className="text-2xl font-bold text-[#3e2723] mt-2">23</p>
          <p className="text-xs text-green-600 mt-2">↑ 8% from yesterday</p>
        </div>
        
        {/* Inventory Status */}
         <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e4c9a7]">
          <h3 className="text-sm font-medium text-[#5d4037] mb-1">Inventory Status</h3>
          <p className="text-2xl font-bold text-[#3e2723] mt-2">Good</p>
          <p className="text-xs text-amber-500 mt-2">2 items low</p>
        </div>
      </div>
      
      <Chart data={salesData} />
      
      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-[#e4c9a7] p-6 mb-8">
        <h2 className="text-lg font-semibold text-[#3e2723] mb-4">Recent Orders</h2>
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
            <tr>
              <td className="py-3 px-4">#12345</td>
              <td className="py-3 px-4">Juan Dela Cruz</td>
              <td className="py-3 px-4">Espresso, Croissant</td>
              <td className="py-3 px-4">₱250</td>
              <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
            </tr>
            <tr>
              <td className="py-3 px-4">#12346</td>
              <td className="py-3 px-4">Maria Santos</td>
              <td className="py-3 px-4">Custom Matcha</td>
              <td className="py-3 px-4">₱180</td>
              <td className="py-3 px-4"><span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">Preparing</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      
      {/* Popular Items */}
      <div className="bg-white rounded-lg shadow-sm border border-[#e4c9a7] p-6">
        <h2 className="text-lg font-semibold text-[#3e2723] mb-4">Popular Items</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#e4c9a7] rounded-md mr-3"></div>
              <div>
                <p className="font-medium text-[#3e2723]">Espresso</p>
                <p className="text-sm text-[#5d4037]">32 orders</p>
              </div>
            </div>
            <div className="text-[#3e2723] font-semibold">₱120</div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#e4c9a7] rounded-md mr-3"></div>
              <div>
                <p className="font-medium text-[#3e2723]">Matcha Latte</p>
                <p className="text-sm text-[#5d4037]">28 orders</p>
              </div>
            </div>
            <div className="text-[#3e2723] font-semibold">₱150</div>
          </div>
        </div>
      </div>
    </div>
  );
}