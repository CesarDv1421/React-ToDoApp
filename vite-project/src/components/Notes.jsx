function Notes({ id, title, description, date, children }) {
  return (
    <div className="note">
      <h1> {title} </h1>

      <h2>{description}</h2>

      <h3> {date} </h3>

      <div>{children}</div>
    </div>
  );
}

export default Notes;
