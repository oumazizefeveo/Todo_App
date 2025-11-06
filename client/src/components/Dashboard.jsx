import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { taskAPI } from '../services/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
    highPriority: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await taskAPI.getTasks();
      const tasks = response.data;
      setStats({
        total: tasks.length,
        active: tasks.filter(t => !t.completed).length,
        completed: tasks.filter(t => t.completed).length,
        highPriority: tasks.filter(t => t.priority === 'high' && !t.completed).length
      });
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navbar */}
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="flex items-center text-xl font-bold text-white hover:text-primary-400 transition">
              📝 TaskMaster
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/tasks" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition">
                📋 Tâches
              </Link>
              <div className="relative group">
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700 transition">
                  {user?.email?.[0].toUpperCase()}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="p-3 border-b border-gray-700">
                    <p className="text-sm text-gray-400">{user?.email}</p>
                  </div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 transition">
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Bienvenue, {user?.email?.split('@')[0]} ! 👋</h1>
          <p className="text-xl text-gray-300 mb-8">
            Gérez vos tâches efficacement et atteignez vos objectifs quotidiens.
          </p>
          <Link to="/tasks" className="inline-block px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition text-lg">
            Voir mes tâches
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-white mb-6">📊 Vos statistiques</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total</p>
                <p className="text-3xl font-bold text-primary-400">{stats.total}</p>
                <p className="text-xs text-gray-500 mt-1">Toutes vos tâches</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-primary-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Actives</p>
                <p className="text-3xl font-bold text-blue-400">{stats.active}</p>
                <p className="text-xs text-gray-500 mt-1">En cours</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Complétées</p>
                <p className="text-3xl font-bold text-green-400">{stats.completed}</p>
                <p className="text-xs text-gray-500 mt-1">{stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}% terminées</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-green-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Priorité haute</p>
                <p className="text-3xl font-bold text-red-400">{stats.highPriority}</p>
                <p className="text-xs text-gray-500 mt-1">À traiter en urgence</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-red-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;