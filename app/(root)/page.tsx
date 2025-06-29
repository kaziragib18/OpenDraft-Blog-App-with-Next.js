import Hello from "../components/hello";

export default function Home() {
  console.log('what is it? == SERVER/CLIENT');
  return (
    <>
    <h1 className="text-3xl">Blog app initial setup</h1>
    <Hello/>
    </>
  );
}
