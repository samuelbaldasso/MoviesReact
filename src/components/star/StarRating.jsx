import "./style.css";

export default function StarRating({ rating }) {
  return (
    <div>
      {[...Array(10)].map((_, index) => (
        <span key={index}>
          {rating > index ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}
