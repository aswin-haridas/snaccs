export default async function TextPage() {
  const data = await fetch("http://localhost:8000/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  console.log("data", data);

  const text = await data.json();

  return (
    <div>
      <h1>Text Page</h1>
      <p>{text}</p>
    </div>
  );
}
