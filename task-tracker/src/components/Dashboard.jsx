import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const tasks = useSelector((state) => state.tasks.present?.tasks || []);
  const completed = tasks.filter(t => t.completed).length;
  const active = tasks.length - completed;

  const data = [
    { name: 'Completed', value: completed },
    { name: 'Active', value: active },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Task Completion Stats</h2>
      <PieChart width={300} height={300}>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={100}>
          <Cell fill="#4ade80" />
          <Cell fill="#facc15" />
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Dashboard;
