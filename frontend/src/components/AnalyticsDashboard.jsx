import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { format, startOfWeek, eachDayOfInterval } from "date-fns";

const statusColors = {
  todo: "#6366F1", // Indigo for "To Do"
  in_progress: "#FBBF24", // Amber for "In Progress"
  done: "#10B981", // Green for "Done"
};

const AnalyticsDashboard = ({ tasks }) => {
  // --- Data for Pie Chart (Task Status Distribution) ---
  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = [
    { name: "To Do", value: statusCounts["todo"] || 0, color: statusColors.todo },
    { name: "In Progress", value: statusCounts["in_progress"] || 0, color: statusColors.in_progress },
    { name: "Done", value: statusCounts["done"] || 0, color: statusColors.done },
  ];

  // --- Data for Bar Chart (Tasks Completed by Day) ---
  const completedTasks = tasks.filter((t) => t.status === "done" && t.created_at);
  const completionByDay = {};

  const today = new Date();
  const last7Days = eachDayOfInterval({
    start: startOfWeek(today, { weekStartsOn: 1 }),
    end: today,
  });

  completedTasks.forEach((task) => {
    const taskDate = new Date(task.created_at);
    const dayKey = format(taskDate, "EEE");
    completionByDay[dayKey] = (completionByDay[dayKey] || 0) + 1;
  });

  const barData = last7Days.map((day) => {
    const dayKey = format(day, "EEE");
    return {
      name: dayKey,
      completed: completionByDay[dayKey] || 0,
    };
  });

  // --- Overall Completion Rate ---
  const totalTasks = tasks.length;
  const completedCount = completedTasks.length;
  const completionRate = totalTasks > 0 ? ((completedCount / totalTasks) * 100).toFixed(0) : 0;

  // Custom label function for the Pie Chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent === 0) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-2">Task Analytics</h2>

      <div className="grid grid-cols-1 gap-8">
        {/* Row 1: Metric and Pie Chart (using custom column sizing) */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
          {/* Completion Rate Metric */}
          <div className="flex flex-col justify-center items-center bg-gray-50 rounded-2xl p-4 shadow-inner">
            <p className="text-sm text-gray-500 font-medium">Overall Completion Rate</p>
            <p className="text-5xl font-extrabold text-blue-600 my-2">{completionRate}%</p>
            <p className="text-sm text-gray-400">
              ({completedCount} of {totalTasks} tasks)
            </p>
          </div>

          {/* Pie Chart (Task Status Distribution) */}
          <div className="flex flex-col justify-center items-center p-4 bg-gray-50 rounded-2xl shadow-inner">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Task Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center mt-4 text-sm font-medium">
              {statusData.map((entry, index) => (
                <div key={index} className="flex items-center mx-2">
                  <div className="h-2 w-2 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                  <span>{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Bar Chart */}
        <div>
          <div className="flex flex-col justify-center items-center p-4 bg-gray-50 rounded-2xl shadow-inner">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Completed This Week</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill={statusColors.done} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
