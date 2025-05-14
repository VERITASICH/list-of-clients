// import { useState } from 'react';
// import { database, ref, push  } from '../firebase';

// function AddForm() {
//   const [formData, setFormData] = useState({
//     name: '',
//     title: '',
//     description: '',
//     image: null
//   });
//    const [uploading, setUploading] = useState(false);
//   const [preview, setPreview] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const itemsRef = ref(database, 'items');
//       await push(itemsRef, formData);
//       setFormData({ name: '', title: '', description: ''});
//       alert('Данные успешно сохранены!');
//     } catch (error) {
//       console.error('Ошибка сохранения:', error);
//     }
    

//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//         <input
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         placeholder="Имя"
//         required
//       />
//       <input
//         name="title"
//         value={formData.title}
//         onChange={handleChange}
//         placeholder="Мастер"
//         required
//       />
//       <textarea
//         name="description"
//         value={formData.description}
//         onChange={handleChange}
//         placeholder="Описание"
//       />
//       <button type="submit">Отправить</button>
//     </form>
//   );
// }

// export default AddForm;
import { useState } from 'react';
import { database, ref, push } from '../firebase';

function AddForm() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    image: null
  });
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return alert('Добавьте изображение');
    
    try {
      setUploading(true);
      
      // Проверка размера изображения (макс. 2 МБ)
      if (formData.image.size > 2 * 1024 * 1024) {
        alert('Максимальный размер файла - 2 МБ');
        return;
      }

      // Создаем объект для хранения данных
      const itemData = {
        name: formData.name,
        title: formData.title,
        description: formData.description,
        imageBase64: formData.image.base64,
        imageType: formData.image.type
      };

      // Сохраняем в Firebase
      const itemsRef = ref(database, 'items');
      await push(itemsRef, itemData);
      
      // Сбрасываем форму
      setFormData({ 
        name: '', 
        title: '', 
        description: '',
        image: null 
      });
      setPreview('');
      alert('Данные успешно сохранены!');
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Ошибка при загрузке данных');
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Проверка типа файла
      if (!file.type.startsWith('image/')) {
        alert('Выберите файл изображения');
        return;
      }

      // Преобразование в Base64
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setPreview(loadEvent.target.result);
        setFormData(prev => ({
          ...prev,
          image: {
            base64: loadEvent.target.result.split(',')[1], // Убираем префикс
            type: file.type,
            name: file.name,
            size: file.size
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
      <form className='task-form' onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Имя"
          required
        />
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Мастер"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Описание"
        />
        
        <div className="image-upload-section">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            id="imageInput"
          />
          {preview && (
            <img 
              src={preview} 
              alt="Превью" 
              className="image-preview"
            />
          )}
        </div>

        <button 
          className='form-button'
          type="submit" 
          disabled={uploading}
        >
          {uploading ? 'Идет сохранение...' : 'Отправить'}
        </button>
      </form>
  );
}

export default AddForm;