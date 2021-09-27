import "./MoreButton.css";

export default function MoreMovies({ isVisible, onClick }) {
  return (
    <div className="more">
      <button
        className={`more__btn ${isVisible && "more__btn_active"}`}
        onClick={onClick}
      >
        Ещё
      </button>
    </div>
  );
}
