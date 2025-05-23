import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Define props interface
interface ChartProps {
  data: Array<{
    name: string;
    sales: number;
  }>;
  title?: string;
}

export default function Chart({ data, title = "Weekly Sales" }: ChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#e4c9a7] p-6 mb-8">
      <h2 className="text-lg font-semibold text-[#3e2723] mb-4">{title}</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4c9a7" />
            <XAxis dataKey="name" tick={{ fill: '#5d4037' }} />
            <YAxis tick={{ fill: '#5d4037' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#f8f4e5', 
                border: '1px solid #e4c9a7',
                borderRadius: '0.5rem'
              }} 
            />
            <Bar dataKey="sales" fill="#3e2723" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}