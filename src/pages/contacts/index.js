import Contacts from "./Contacts";

export default function Main(params) {
  return (
    <>
      <div style={{ marginTop: "40px" }} className="container"></div>
      <div className="about contacts">
        <Contacts />
      </div>
    </>
  );
}
