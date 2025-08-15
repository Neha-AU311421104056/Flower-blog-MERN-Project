// // src/components/BlogForm.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const BACKEND_URL = 'http://localhost:5000';

// export default function BlogForm() {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [imageFile, setImageFile] = useState(null); // store File object
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch blogs on component mount
//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const fetchBlogs = async () => {
//     try {
//       const res = await axios.get(`${BACKEND_URL}/blogs`);
//       setBlogs(res.data);
//     } catch (err) {
//       console.error('Error fetching blogs:', err);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file || null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title.trim() || !content.trim()) {
//       alert('Please enter title and content');
//       return;
//     }

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append('title', title);
//       formData.append('content', content);
//       if (imageFile) formData.append('image', imageFile); // 'image' matches multer.single('image')

//       const res = await axios.post(`${BACKEND_URL}/blogs`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       // Add newly created blog to UI
//       setBlogs(prev => [res.data, ...prev]);

//       // Clear form
//       setTitle('');
//       setContent('');
//       setImageFile(null);
//       e.target.reset(); // resets file input
//     } catch (err) {
//       console.error('Error submitting blog:', err);
//       alert('Failed to submit blog');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 800, margin: '20px auto', fontFamily: 'Segoe UI' }}>
//       <h1>Flower Blog — Create Post</h1>

//       <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
//         <div style={{ marginBottom: 8 }}>
//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             style={{ width: '100%', padding: 8, fontSize: 16 }}
//             required
//           />
//         </div>

//         <div style={{ marginBottom: 8 }}>
//           <textarea
//             placeholder="Content"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             rows={5}
//             style={{ width: '100%', padding: 8, fontSize: 16 }}
//             required
//           />
//         </div>

//         <div style={{ marginBottom: 12 }}>
//           <input type="file" accept="image/*" onChange={handleFileChange} />
//         </div>

//         <button type="submit" disabled={loading} style={{ padding: '10px 16px', fontSize: 16 }}>
//           {loading ? 'Posting...' : 'Post Blog'}
//         </button>
//       </form>

//       <hr />

//       <h2>All Blogs</h2>
//       <div>
//         {blogs.length === 0 && <p>No blogs yet.</p>}
//         {blogs.map((b) => (
//           <div key={b._id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12, marginBottom: 12 }}>
//             {b.imagePath && (
//               // imagePath is relative like "uploads/12345.jpg"
//               <img
//                 src={`${BACKEND_URL}/${b.imagePath}`}
//                 alt={b.title}
//                 style={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 6 }}
//               />
//             )}
//             <h3 style={{ marginTop: 8 }}>{b.title}</h3>
//             <p>{b.content}</p>
//             <small>{new Date(b.createdAt).toLocaleString()}</small>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// src/components/BlogForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Backend URL
const BACKEND_URL = 'https://the-flower-journal.onrender.com';

// Hardcoded admin credentials for demonstration
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '1234';

export default function BlogForm() {
  // --- Form states ---
  const [title, setTitle] = useState('');           // store title input
  const [content, setContent] = useState('');       // store content input
  const [imageFile, setImageFile] = useState(null); // store selected image file
  const [blogs, setBlogs] = useState([]);           // store all blogs from backend
  const [loading, setLoading] = useState(false);    // track submission/loading state
  const [editingBlogId, setEditingBlogId] = useState(null); // track if editing a blog

  // --- Fetch blogs when component mounts ---
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  // --- File input change handler ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file || null);
  };

  // --- Edit a blog (prefill form) ---
  const handleEditClick = (blog) => {
    setEditingBlogId(blog._id);
    setTitle(blog.title);
    setContent(blog.content);
    setImageFile(null); // optional: do not change image during edit
  };

  // --- Cancel editing ---
  const cancelEdit = () => {
    setEditingBlogId(null);
    setTitle('');
    setContent('');
    setImageFile(null);
  };

  // --- Delete blog ---
  const handleDeleteClick = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      await axios.delete(`${BACKEND_URL}/blogs/${id}`);
      setBlogs(prev => prev.filter(b => b._id !== id));
    } catch (err) {
      console.error('Error deleting blog:', err);
      alert('Failed to delete blog');
    }
  };

  // --- Admin check for editing ---
  const handleAdminEditClick = (blog) => {
    const username = prompt('Enter admin username:');
    const password = prompt('Enter admin password:');

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      handleEditClick(blog); // proceed to edit
    } else {
      alert('Invalid credentials');
    }
  };

  // --- Admin check for deleting ---
  const handleAdminDeleteClick = (id) => {
    const username = prompt('Enter admin username:');
    const password = prompt('Enter admin password:');

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      handleDeleteClick(id); // proceed to delete
    } else {
      alert('Invalid credentials');
    }
  };

  // --- Submit form handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Please enter title and content');
      return;
    }

    try {
      setLoading(true);

      if (editingBlogId) {
        // --- Update existing blog (PUT request) ---
        const res = await axios.put(`${BACKEND_URL}/blogs/${editingBlogId}`, { title, content });
        setBlogs(prev => prev.map(b => (b._id === editingBlogId ? res.data : b)));
        cancelEdit();
      } else {
        // --- Create new blog (POST request) ---
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (imageFile) formData.append('image', imageFile);

        const res = await axios.post(`${BACKEND_URL}/blogs`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        setBlogs(prev => [res.data, ...prev]);
        setTitle('');
        setContent('');
        setImageFile(null);
        e.target.reset();
      }
    } catch (err) {
      console.error('Error submitting blog:', err);
      alert('Failed to submit blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '20px auto', fontFamily: 'Segoe UI' }}>
      <h1>Flower Blog — {editingBlogId ? 'Edit Post' : 'Create Post'}</h1>

      {/* --- Blog form --- */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 8 }}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: 8, fontSize: 16 }}
            required
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            style={{ width: '100%', padding: 8, fontSize: 16 }}
            required
          />
        </div>

        {/* Only show image input when creating new blog */}
        {!editingBlogId && (
          <div style={{ marginBottom: 12 }}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
        )}

        <button type="submit" disabled={loading} style={{ padding: '10px 16px', fontSize: 16 }}>
          {loading ? (editingBlogId ? 'Updating...' : 'Posting...') : (editingBlogId ? 'Update Blog' : 'Post Blog')}
        </button>

        {editingBlogId && (
          <button
            type="button"
            onClick={cancelEdit}
            style={{ marginLeft: 12, padding: '10px 16px', fontSize: 16 }}
          >
            Cancel
          </button>
        )}
      </form>

      <hr />

      {/* --- Display all blogs --- */}
      <h2>All Blogs</h2>
      <div>
        {blogs.length === 0 && <p>No blogs yet.</p>}
        {blogs.map((b) => (
          <div key={b._id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12, marginBottom: 12 }}>
            {b.imagePath && (
              <img
                src={`${BACKEND_URL}/${b.imagePath}`}
                alt={b.title}
                style={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 6 }}
              />
            )}
            <h3 style={{ marginTop: 8 }}>{b.title}</h3>
            <p>{b.content}</p>
            <small>{new Date(b.createdAt).toLocaleString()}</small>

            {/* --- Edit/Delete buttons with admin check --- */}
            <div style={{ marginTop: 12 }}>
              <button
                onClick={() => handleAdminEditClick(b)}
                style={{ padding: '6px 12px', fontSize: 14, backgroundColor: '#f4ce36ff', color: 'white', border: 'none', borderRadius: 4, margin: 6 }}
              >
                Edit
              </button>
              <button
                onClick={() => handleAdminDeleteClick(b._id)}
                style={{ padding: '6px 12px', fontSize: 14, backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: 4, margin: 6 }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
