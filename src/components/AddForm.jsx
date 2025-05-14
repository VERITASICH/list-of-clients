import { useState } from 'react';
import { database, ref, push  } from '../firebase';

function AddForm() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const itemsRef = ref(database, 'items');
      await push(itemsRef, formData);
      setFormData({ name: '', title: '', description: ''});
      alert('Данные успешно сохранены!');
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
    

  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Отправить</button>
    </form>
  );
}

export default AddForm;