import React from "react";

const GoogleMap = () => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    // Функция-обработчик для обновления ширины окна
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Добавляем обработчик события изменения размера окна
    window.addEventListener("resize", handleResize);

    // Устанавливаем начальное значение ширины окна
    setWindowWidth(window.innerWidth);

    // Удаляем обработчик события при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d7304.972636906594!2d30.45036433685526!3d50.49084116788762!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1725833590023!5m2!1sru!2sua"
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
