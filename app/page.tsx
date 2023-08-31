export default async function Home() {
  const data = await fetch("/api");
  console.log(data);
  return <div>Home page</div>;
}
