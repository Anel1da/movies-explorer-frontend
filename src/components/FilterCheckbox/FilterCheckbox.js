import "./FilterCheckbox.css";

export default function FilterCheckbox({ setIsShortMovies, isShortMovies }) {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__toggle">
        <input
          className="filter-checkbox__input"
          type="checkbox"
          onClick={() => {
            setIsShortMovies(!isShortMovies);
          }}
        />
        <span className="filter-checkbox__input-visible"></span>
      </label>
      <p className="filter-checkbox__title">Короткометражки</p>
    </div>
  );
}
