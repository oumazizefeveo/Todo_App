import { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import SearchBar from './SearchBar';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [searchQuery, setSearchQuery] = useState('');
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // Charger les tâches au montage du composant
  useEffect(() => {
    fetchTasks();
  }, []);

  // Filtrer les tâches quand le filtre ou la recherche change
  useEffect(() => {
    filterTasks();
  }, [tasks, filter, searchQuery]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getTasks();
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des tâches');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = () => {
    let filtered = [...tasks];

    // Filtre par statut
    if (filter === 'active') {
      filtered = filtered.filter(task => !task.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    }

    // Filtre par recherche
    if (searchQuery.trim()) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  };

  const handleAddTask = async (taskData) => {
    try {
      await taskAPI.createTask(taskData);
      await fetchTasks();
      setShowForm(false);
      setError('');
    } catch (err) {
      setError('Erreur lors de l\'ajout de la tâche');
      console.error(err);
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      await taskAPI.updateTask(id, taskData);
      await fetchTasks();
      setEditingTask(null);
      setError('');
    } catch (err) {
      setError('Erreur lors de la modification de la tâche');
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      return;
    }
    try {
      await taskAPI.deleteTask(id);
      await fetchTasks();
      setError('');
    } catch (err) {
      setError('Erreur lors de la suppression de la tâche');
      console.error(err);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await taskAPI.updateTask(task._id, { ...task, completed: !task.completed });
      await fetchTasks();
      setError('');
    } catch (err) {
      setError('Erreur lors de la mise à jour de la tâche');
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Chargement...</p>
        </div>
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
              <Link to="/dashboard" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition">
                🏠 Dashboard
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-900/50 border border-red-500 text-red-200 rounded-lg flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{error}</span>
          </div>
        )}

        {/* Search and Filter */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filter={filter}
          setFilter={setFilter}
        />

        {/* Add Task Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition flex items-center gap-2"
          >
            {showForm ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                Annuler
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                Ajouter une tâche
              </>
            )}
          </button>
        </div>

        {/* Task Form */}
        {showForm && (
          <div className="mb-6">
            <TaskForm
              onSubmit={handleAddTask}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Task Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total</p>
                <p className="text-3xl font-bold text-primary-400">{tasks.length}</p>
                <p className="text-xs text-gray-500 mt-1">Toutes vos tâches</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-primary-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Actives</p>
                <p className="text-3xl font-bold text-blue-400">{tasks.filter(t => !t.completed).length}</p>
                <p className="text-xs text-gray-500 mt-1">En cours</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Complétées</p>
                <p className="text-3xl font-bold text-green-400">{tasks.filter(t => t.completed).length}</p>
                <p className="text-xs text-gray-500 mt-1">Terminées</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-green-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
          </div>
        </div>

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <div className="bg-gray-800 rounded-xl shadow-xl py-16 text-center">
            <p className="text-6xl mb-4">📋</p>
            <p className="text-xl text-gray-300">
              {searchQuery || filter !== 'all'
                ? 'Aucune tâche trouvée'
                : 'Aucune tâche. Commencez par en ajouter une !'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task._id}>
                {editingTask?._id === task._id ? (
                  <TaskForm
                    task={editingTask}
                    onSubmit={(data) => handleUpdateTask(task._id, data)}
                    onCancel={() => setEditingTask(null)}
                  />
                ) : (
                  <TaskItem
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onEdit={setEditingTask}
                    onDelete={handleDeleteTask}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TaskList;