const Colorshow = ({ rangi = [] }) => {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {rangi.map((rang, i) => (
        <span
          key={i}
          title={rang.nomi}
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            backgroundColor: rang.kod,
            border: "1px solid #ccc",
          }}></span>
      ))}
    </div>
  );
};

export default Colorshow;
