import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks`);
    setTasks(response.data);
  };

  const createTask = async () => {
    if (!title) return;
    setLoading(true);
    await axios.post(`${API_URL}/tasks`, { title, description });
    setTitle('');
    setDescription('');
    await fetchTasks();
    setLoading(false);
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/tasks/${id}`);
    fetchTasks();
  };

  const updateStatus = async (task) => {
    await axios.put(`${API_URL}/tasks/${task.id}`, {
      title: task.title,
      description: task.description,
      status: task.status === 'pending' ? 'completed' : 'pending'
    });
    fetchTasks();
  };

  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.logo}>✓</div>
            <div>
              <h1 style={styles.title}>Task Manager</h1>
              <p style={styles.subtitle}>Gérez vos tâches efficacement</p>
            </div>
          </div>
             <div style={styles.stats}>
               <div style={styles.statBox}>
                 <span style={styles.statNumber}>{tasks.length}</span>
                 <span style={styles.statLabel}>Total</span>
               </div>
               <div style={styles.statBox}>
                 <span style={{...styles.statNumber, color: '#f59e0b'}}>{pendingCount}</span>
                 <span style={styles.statLabel}>En cours</span>
               </div>
               <div style={styles.statBox}>
                 <span style={{...styles.statNumber, color: '#10b981'}}>{completedCount}</span>
                 <span style={styles.statLabel}>Terminées</span>
               </div>
             </div>
           </header>

           <div style={styles.formCard}>
             <h2 style={styles.formTitle}>Nouvelle tâche</h2>
             <div style={styles.formRow}>
               <input
                 type="text"
                 placeholder="Titre de la tâche"
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 style={styles.input}
                 onKeyDown={(e) => e.key === 'Enter' && createTask()}
               />
               <input
                 type="text"
                 placeholder="Description (optionnel)"
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 style={styles.input}
                 onKeyDown={(e) => e.key === 'Enter' && createTask()}
               />
               <button
                 onClick={createTask}
                 disabled={loading || !title}
                 style={{
                   ...styles.addButton,
                   opacity: (!title || loading) ? 0.5 : 1,
                   cursor: (!title || loading) ? 'not-allowed' : 'pointer'
                 }}
               >
                 + Ajouter
               </button>
             </div>
           </div>

           <div style={styles.taskList}>
             {tasks.length === 0 && (
               <div style={styles.emptyState}>
                 <p>Aucune tâche pour le moment. Ajoutez-en une ! 🎯</p>
               </div>
             )}
             {tasks.map((task) => (
               <div key={task.id} style={styles.taskCard}>
                 <div style={styles.taskLeft}>
                   <button
                     onClick={() => updateStatus(task)}
                     style={{
                       ...styles.checkbox,
                       backgroundColor: task.status === 'completed' ? '#10b981' : 'transparent',
                       borderColor: task.status === 'completed' ? '#10b981' : '#d1d5db'
                     }}
                   >
                     {task.status === 'completed' && '✓'}
                   </button>
                   <div>
                     <p style={{
                       ...styles.taskTitle,
                       textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                       color: task.status === 'completed' ? '#9ca3af' : '#111827'
                     }}>
                       {task.title}
                     </p>
                     {task.description && (
                       <p style={styles.taskDesc}>{task.description}</p>
                     )}
                   </div>
                 </div>
                 <div style={styles.taskRight}>
                   <span style={{
                   ...styles.badge,
                   backgroundColor: task.status === 'completed' ? '#d1fae5' : '#fef3c7',
                   color: task.status === 'completed' ? '#065f46' : '#92400e'
                 }}>
                   {task.status === 'completed' ? 'Terminée' : 'En cours'}
                 </span>
                 <button onClick={() => deleteTask(task.id)} style={styles.deleteButton}>
                   🗑
                 </button>
               </div>
             </div>
           ))}
         </div>
       </div>
     </div>
   );
 }

 const styles = {
   page: {
     minHeight: '100vh',
     backgroundColor: '#f3f4f6',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
     padding: '40px 20px'
   },
   container: {
     maxWidth: '800px',
     margin: '0 auto'
   },
   header: {
     display: 'flex',
     justifyContent: 'space-between',
     alignItems: 'center',
     marginBottom: '32px',
     flexWrap: 'wrap',
     gap: '20px'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
 },
 logo: {
   width: '48px',
   height: '48px',
   backgroundColor: '#4f46e5',
   color: 'white',
   borderRadius: '12px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   fontSize: '24px',
   fontWeight: 'bold',
   boxShadow: '0 4px 6px rgba(79, 70, 229, 0.3)'
 },
 title: {
   fontSize: '28px',
   fontWeight: '700',
   color: '#111827',
   margin: 0
 },
 subtitle: {
   fontSize: '14px',
   color: '#6b7280',
   margin: '4px 0 0 0'
 },
 stats: {
   display: 'flex',
   gap: '16px'
},
statBox: {
  backgroundColor: 'white',
  padding: '12px 20px',
  borderRadius: '12px',
  textAlign: 'center',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  minWidth: '80px'
},
statNumber: {
  display: 'block',
  fontSize: '24px',
  fontWeight: '700',
  color: '#111827'
},
statLabel: {
  fontSize: '12px',
  color: '#6b7280'
},
formCard: {
  backgroundColor: 'white',
  borderRadius: '16px',
  padding: '24px',
  marginBottom: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
},
formTitle: {
  fontSize: '16px',
  fontWeight: '600',
  color: '#374151',
  margin: '0 0 16px 0'
},
formRow: {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap'
},
input: {
  flex: '1 1 200px',
  padding: '12px 16px',
  borderRadius: '10px',
  border: '1px solid #e5e7eb',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s'
},
addButton: {
  padding: '12px 24px',
  backgroundColor: '#4f46e5',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  fontSize: '14px',
  fontWeight: '600',
  boxShadow: '0 2px 4px rgba(79, 70, 229, 0.3)'
},
taskList: {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
},
emptyState: {
  textAlign: 'center',
  padding: '40px',
  color: '#9ca3af',
  backgroundColor: 'white',
  borderRadius: '16px'
},
taskCard: {
  backgroundColor: 'white',
  borderRadius: '14px',
  padding: '16px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
 transition: 'transform 0.15s'
},
taskLeft: {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '14px',
  flex: 1
},
checkbox: {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  border: '2px solid #d1d5db',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '12px',
  fontWeight: 'bold',
  flexShrink: 0,
  marginTop: '2px',
  cursor: 'pointer',
  background: 'none'
},
taskTitle: {
  fontSize: '15px',
  fontWeight: '600',
  margin: 0
},
taskDesc: {
  fontSize: '13px',
  color: '#6b7280',
  margin: '4px 0 0 0'
},
taskRight: {
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
},
badge: {
  fontSize: '12px',
  fontWeight: '600',
  padding: '4px 12px',
  borderRadius: '20px'
},
deleteButton: {
  background: 'none',
  border: 'none',
  fontSize: '16px',
  cursor: 'pointer',
  opacity: 0.6,
  padding: '4px'
 }
};

export default App;