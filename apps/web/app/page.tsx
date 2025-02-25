import { lunalink } from "@repo/lunalink/lunalink";

export default function Home() {
  return (
    <main>
      <h1>lunalink</h1>
      <p>
        lunalink is an helper to build URL path easily. To enjoy the most of it,
        use TypeScript as parameters are infered
      </p>
      <p>Example</p>
      <pre>
        <code>
          lunalink(&quot;/contacts/:id&quot;, {"{"} id:
          &quot;4F82CDA2-B869-48A2-A829-F161DB6A94DA&quot; {"}"}) #{" "}
          {lunalink("/contacts/:id", {
            id: "4F82CDA2-B869-48A2-A829-F161DB6A94DA",
          })}
        </code>
      </pre>
    </main>
  );
}
