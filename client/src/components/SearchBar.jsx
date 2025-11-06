const SearchBar = ({ searchQuery, setSearchQuery, filter, setFilter }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-xl p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Search Input */}
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Rechercher une tâche..."
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition border-2 ${
              filter === 'all'
                ? 'bg-primary-600 border-primary-600 text-white'
                : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-primary-500'
            }`}
          >
            Toutes
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition border-2 ${
              filter === 'active'
                ? 'bg-primary-600 border-primary-600 text-white'
                : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-primary-500'
            }`}
          >
            Actives
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition border-2 ${
              filter === 'completed'
                ? 'bg-primary-600 border-primary-600 text-white'
                : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-primary-500'
            }`}
          >
            Complétées
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;