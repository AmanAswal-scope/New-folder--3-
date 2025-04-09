import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  // Get the list of tasks from Redux; if not present, default to an empty array
  const tasks = useSelector((state) => state.tasks.present?.tasks || []);

  // Count how many tasks are completed
  const completed = tasks.filter(t => t.completed).length;

  // Remaining tasks are considered active (not completed)
  const active = tasks.length - completed;

  // Prepare the data in a format that Recharts PieChart expects
  const data = [
    { name: 'Completed', value: completed },
    { name: 'Active', value: active },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Task Completion Stats</h2>

      {/* Render the pie chart with given width and height */}
      <PieChart width={300} height={300}>
        <Pie
          data={data}         // Pass the prepared data
          dataKey="value"     // Use the "value" field from each data item
          cx="50%"            // Center the pie chart horizontally
          cy="50%"            // Center the pie chart vertically
          outerRadius={100}   // Set the radius of the pie
        >
          {/* Color the completed and active segments differently */}
          <Cell fill="#4ade80" />  {/* Green for Completed */}
          <Cell fill="#facc15" />  {/* Yellow for Active */}
        </Pie>

        {/* Show values on hover */}
        <Tooltip />

        {/* Display a legend showing which color represents what */}
        <Legend />
      </PieChart>
    </div>
  );
};

export default Dashboard;
