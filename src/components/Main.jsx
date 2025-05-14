
import { useEffect, useState } from 'react';
import { database, ref, onValue } from '../firebase';

function Main() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Создаем ссылку на данные
    const itemsRef = ref(database, 'items');
    
    // Подписываемся на изменения данных
    const unsubscribe = onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      
      // Преобразуем объект в массив
      const itemsArray = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })) : [];
      
      setItems(itemsArray);
      setLoading(false);
    });

    // Отписываемся при размонтировании
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className='main-page'>
      {items.length === 0 ? (
        <div>Нет данных</div>
      ) : (
        items.map(item => (
          <div key={item.id} className="item-card">
            <h3 className='client-name'>{item.name}</h3>
            <p className='claent-description'>{item.description}</p>
            <p className='master'>{item.title}</p>
           <img 
              src={`data:${item.imageType};base64,${item.imageBase64}`}
              alt={item.title}
              className="item-image"
            />
            <p>id: {item.id}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Main;