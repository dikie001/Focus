import React from "react";
import {
  Bell,
  Timer,
  CheckCircle,
  Play,
  Plus,
  Target,
  Clock,
  Check,
  Trophy,
  Home,
  List,
  BarChart3,
  User,
} from "lucide-react";

const DailyFocusHomepage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white px-6 pt-16 pb-8 shadow-sm">
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center mb-8">
          {/* Profile Avatar */}
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex justify-center items-center">
              <User size={24} className="text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-lg font-semibold text-gray-900">
                Good morning
              </p>
              <p className="text-sm text-gray-500">Ready to focus?</p>
            </div>
          </div>

          {/* Notification Bell */}
          <button className="relative">
            <Bell size={24} className="text-gray-600" />
            {/* Notification Badge */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Welcome Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Stay Focused Today
        </h1>
        <p className="text-gray-600">
          Let's make today productive and meaningful
        </p>
      </div>

      {/* Stats Cards Section */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Focus Time Card */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex justify-center items-center">
                <Timer size={20} className="text-blue-600" />
              </div>
              <span className="text-xs text-gray-500">TODAY</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">2h 45m</p>
            <p className="text-sm text-gray-600">Focus Time</p>
          </div>

          {/* Tasks Completed Card */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex justify-center items-center">
                <CheckCircle size={20} className="text-green-600" />
              </div>
              <span className="text-xs text-gray-500">COMPLETED</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">8</p>
            <p className="text-sm text-gray-600">Tasks Done</p>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {/* Start Focus Session */}
          <button className="bg-blue-600 rounded-xl p-4 flex flex-col items-center text-white hover:bg-blue-700 transition-colors">
            <Play size={24} className="mb-2" />
            <span className="font-medium">Start Focus</span>
          </button>

          {/* Add Task */}
          <button className="bg-white rounded-xl p-4 flex flex-col items-center border border-gray-200 hover:bg-gray-50 transition-colors">
            <Plus size={24} className="text-gray-600 mb-2" />
            <span className="text-gray-700 font-medium">Add Task</span>
          </button>

          {/* Review Goals */}
          <button className="bg-white rounded-xl p-4 flex flex-col items-center border border-gray-200 hover:bg-gray-50 transition-colors">
            <Target size={24} className="text-gray-600 mb-2" />
            <span className="text-gray-700 font-medium">Goals</span>
          </button>
        </div>
      </div>

      {/* Today's Focus Section */}
      <div className="px-6 pb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Today's Focus</h2>
          <button className="text-blue-600 font-medium hover:text-blue-700">
            View All
          </button>
        </div>

        {/* Focus Task Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-blue-500">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Complete Product Design
              </h3>
              <p className="text-gray-600 mb-3">
                Design system documentation and wireframes
              </p>
              <div className="flex items-center">
                <Clock size={16} className="text-gray-500" />
                <span className="text-sm text-gray-500 ml-1">
                  2 hours remaining
                </span>
              </div>
            </div>
            <div className="w-6 h-6 border-2 border-blue-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>

        {/* Activity Item 1 */}
        <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex justify-center items-center">
              <Check size={16} className="text-green-600" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-gray-900 font-medium">Task completed</p>
              <p className="text-sm text-gray-500">Review client feedback</p>
            </div>
            <span className="text-xs text-gray-400">2 min ago</span>
          </div>
        </div>

        {/* Activity Item 2 */}
        <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex justify-center items-center">
              <Timer size={16} className="text-blue-600" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-gray-900 font-medium">Focus session ended</p>
              <p className="text-sm text-gray-500">45 minutes • Deep work</p>
            </div>
            <span className="text-xs text-gray-400">1 hour ago</span>
          </div>
        </div>

        {/* Activity Item 3 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex justify-center items-center">
              <Trophy size={16} className="text-purple-600" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-gray-900 font-medium">
                Goal milestone reached
              </p>
              <p className="text-sm text-gray-500">
                Weekly focus target: 10 hours
              </p>
            </div>
            <span className="text-xs text-gray-400">3 hours ago</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white px-6 py-4 border-t border-gray-200 mt-6 sticky bottom-0">
        <div className="flex justify-around items-center">
          {/* Home Tab - Active */}
          <button className="flex flex-col items-center">
            <Home size={24} className="text-blue-600" />
            <span className="text-xs text-blue-600 mt-1">Home</span>
          </button>

          {/* Focus Tab */}
          <button className="flex flex-col items-center">
            <Timer size={24} className="text-gray-500" />
            <span className="text-xs text-gray-500 mt-1">Focus</span>
          </button>

          {/* Tasks Tab */}
          <button className="flex flex-col items-center">
            <List size={24} className="text-gray-500" />
            <span className="text-xs text-gray-500 mt-1">Tasks</span>
          </button>

          {/* Analytics Tab */}
          <button className="flex flex-col items-center">
            <BarChart3 size={24} className="text-gray-500" />
            <span className="text-xs text-gray-500 mt-1">Analytics</span>
          </button>

          {/* Profile Tab */}
          <button className="flex flex-col items-center">
            <User size={24} className="text-gray-500" />
            <span className="text-xs text-gray-500 mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyFocusHomepage;
