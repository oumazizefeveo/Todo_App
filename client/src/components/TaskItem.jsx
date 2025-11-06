const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const priorityColors = {
    low: 'bg-green-500/20 text-green-300 border-green-500',
    medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500',
    high: 'bg-red-500/20 text-red-300 border-red-500',
  };

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('fr-FR');
  };

  return (
    <div className={`bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 ${
      task.completed ? 'opacity-70' : ''
    }`}>
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task)}
          className="w-5 h-5 mt-1 rounded border-gray-600 text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-gray-800 cursor-pointer"
        />

        {/* Task Content */}
        <div className="flex-1">
          <h3 className={`text-xl font-semibold text-white ${
            task.completed ? 'line-through opacity-60' : ''
          }`}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className="text-gray-400 mt-2">{task.description}</p>
          )}

          <div className="flex flex-wrap gap-2 mt-4">
            {/* Priority Badge */}
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${priorityColors[task.priority]} flex items-center gap-2`}>
              {task.priority === 'low' && '🟢'}
              {task.priority === 'medium' && '🟡'}
              {task.priority === 'high' && '🔴'}
              {task.priority === 'low' ? 'Basse' : task.priority === 'medium' ? 'Moyenne' : 'Haute'}
            </span>

            {/* Due Date */}
            {task.dueDate && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300 border border-blue-500 flex items-center gap-2">
                📅 {formatDate(task.dueDate)}
              </span>
            )}

            {/* Created Date */}
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-400 border border-gray-600 flex items-center gap-2">
              🕐 {formatDate(task.createdAt)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-primary-400 hover:bg-gray-700 rounded-lg transition"
            title="Modifier"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition"
            title="Supprimer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;