// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import './HeroesFilters.scss';

const HeroesFilters = () => {
  return (
    <div className='card shadow-lg border shadow-lg mt-4 HeroesFilters'>
      <div className='card-body'>
        <p className='card-text label-class'>
          Отфильтруйте героев по элементам
        </p>
        <div className='btn-group'>
          <button className='btn btn-outline-dark active'>Все</button>
          <button className='btn btn-danger'>Огонь</button>
          <button className='btn btn-primary'>Вода</button>
          <button className='btn btn-success'>Ветер</button>
          <button className='btn btn-secondary'>Земля</button>
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
