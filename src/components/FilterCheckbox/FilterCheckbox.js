import "./FilterCheckbox.css";

export default function FilterCheckbox() {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__toggle">
        <input className="filter-checkbox__input" type="checkbox" />
        <span className="filter-checkbox__input-visible"></span>
      </label>
      <p className="filter-checkbox__title">Короткометражки</p>
    </div>
  );
}
