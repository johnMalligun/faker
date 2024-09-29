import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import Modal from "./Modal"; // Импортируем компонент модального окна

const DataTable = ({ region, errors, seed, items, setItems }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для открытия/закрытия модального окна
  const [modalContent, setModalContent] = useState(null); // Состояние для хранения данных строки

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fake-users-server-dun.vercel.app/generate-data",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Возможно, потребуется указать ещё заголовки
            },
            body: JSON.stringify({
              region,
              seed,
              errors,
              existingItems: items,
            }),
            mode: "cors", // Указываем явно CORS
          }
        );

        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [region, seed, errors, setItems]);

  const fetchMoreData = async () => {
    try {
      const response = await fetch(
        "https://fake-users-server-dun.vercel.app/generate-data",
        {
          // Ссылка изменена
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ region, seed, errors, existingItems: items }), // Передаем уже существующие записи для добавления новых
        }
      );

      const newItems = await response.json();
      setItems((prevItems) => [...prevItems, ...newItems]); // Добавляем новые записи
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  const openModal = (item) => {
    // Устанавливаем данные строки в модальное окно
    setModalContent(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Закрываем модальное окно
    setModalContent(null); // Очищаем данные
  };

  if (items.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading more...</h4>}
      >
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>ФИО</th>
              <th>Адрес</th>
              <th>Телефон</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={`${item.id}-${index}`} onClick={() => openModal(item)}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>

      {/* Модальное окно для отображения всей строки */}
      {modalContent && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          content={
            <>
              <p>
                ID: <span>{modalContent.id}</span>
              </p>
              <p>
                ФИО: <span>{modalContent.name}</span>
              </p>
              <p>
                Адрес: <span>{modalContent.address}</span>
              </p>
              <p>
                Телефон: <span>{modalContent.phone}</span>
              </p>
            </>
          }
        />
      )}
    </>
  );
};

// Валидация пропсов с использованием prop-types
DataTable.propTypes = {
  region: PropTypes.string.isRequired,
  errors: PropTypes.number.isRequired,
  seed: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  items: PropTypes.array.isRequired,
  setItems: PropTypes.func.isRequired,
};

export default DataTable;
