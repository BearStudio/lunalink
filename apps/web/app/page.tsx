import { lunalink } from "@bearstudio/lunalink";
import pkg from "@bearstudio/lunalink/package.json";
import styles from "./page.module.css";

const CONTACTS_PATH = "/contacts/:id";
const USERS_PATH = "/api/users/:userId/posts/:postId";

export default function Home() {
  const simpleResult = lunalink(CONTACTS_PATH, {
    id: "4F82CDA2-B869-48A2-A829-F161DB6A94DA",
  });

  const queryResult = lunalink(CONTACTS_PATH, {
    id: "4F82CDA2",
    search: "FirstName",
    page: "1",
  });

  const nestedResult = lunalink(USERS_PATH, {
    userId: "42",
    postId: "7",
  });

  return (
    <div className={styles.page}>
      {/* Nav */}
      <nav className={styles.nav}>
        <span className={styles.logo}>lunalink</span>
        <div className={styles.navLinks}>
          <a href="#demo" className={styles.navLink}>
            Demo
          </a>
          <a href="#features" className={styles.navLink}>
            Features
          </a>
          <a
            href="https://github.com/BearStudio/lunalink"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            GitHub
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.badge}>v{pkg.version} &middot; MIT Licensed</div>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroHighlight}>Type-safe URLs</span>
          <br />
          for TypeScript
        </h1>
        <p className={styles.heroDescription}>
          Build URLs with confidence. Path parameters are inferred from your
          template strings, and extra params become query strings automatically.
        </p>
        <div className={styles.heroActions}>
          <a href="#demo" className={styles.primaryButton}>
            See it in action
          </a>
          <a
            href="https://www.npmjs.com/package/@bearstudio/lunalink"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryButton}
          >
            npm
          </a>
        </div>
      </section>

      {/* Install */}
      <div className={styles.install}>
        <code className={styles.installBox}>
          $ npm install <span>@bearstudio/lunalink</span>
        </code>
      </div>

      {/* Demo */}
      <section id="demo" className={styles.demo}>
        <div className={styles.demoHeader}>
          <p className={styles.sectionLabel}>Demo</p>
          <h2 className={styles.sectionTitle}>See it in action</h2>
        </div>

        <div className={styles.codeBlocks}>
          {/* Example 1: Simple path params */}
          <div className={styles.codeBlock}>
            <div className={styles.codeBlockHeader}>
              <div className={styles.codeBlockDot} />
              simple-params.ts
            </div>
            <div className={styles.codeBlockContent}>
              <pre>
                <span className={styles.codeKeyword}>const</span> path ={" "}
                <span className={styles.codeString}>
                  &quot;/contacts/:id&quot;
                </span>
                ;{"\n"}
                {"\n"}
                <span className={styles.codeComment}>
                  {"// "}Type is inferred as {"{"} id: string {"}"}
                </span>
                {"\n"}
                <span className={styles.codeKeyword}>const</span> url ={" "}
                <span className={styles.codeKeyword}>lunalink</span>(path,{" "}
                {"{\n"}
                {"  "}id:{" "}
                <span className={styles.codeString}>
                  &quot;4F82CDA2-B869-48A2-A829-F161DB6A94DA&quot;
                </span>
                ,{"\n"}
                {"}"});
              </pre>
            </div>
            <div className={styles.codeResult}>
              <span className={styles.codeResultLabel}>Output</span>
              <span className={styles.codeResultValue}>{simpleResult}</span>
            </div>
          </div>

          {/* Example 2: Query params */}
          <div className={styles.codeBlock}>
            <div className={styles.codeBlockHeader}>
              <div className={styles.codeBlockDot} />
              query-params.ts
            </div>
            <div className={styles.codeBlockContent}>
              <pre>
                <span className={styles.codeComment}>
                  {"// "}Extra params are automatically added as query strings
                </span>
                {"\n"}
                <span className={styles.codeKeyword}>const</span> url ={" "}
                <span className={styles.codeKeyword}>lunalink</span>(
                <span className={styles.codeString}>
                  &quot;/contacts/:id&quot;
                </span>
                , {"{\n"}
                {"  "}id:{" "}
                <span className={styles.codeString}>
                  &quot;4F82CDA2&quot;
                </span>
                ,{"\n"}
                {"  "}search:{" "}
                <span className={styles.codeString}>
                  &quot;FirstName&quot;
                </span>
                ,{"\n"}
                {"  "}page:{" "}
                <span className={styles.codeString}>&quot;1&quot;</span>,{"\n"}
                {"}"});
              </pre>
            </div>
            <div className={styles.codeResult}>
              <span className={styles.codeResultLabel}>Output</span>
              <span className={styles.codeResultValue}>{queryResult}</span>
            </div>
          </div>

          {/* Example 3: Nested params */}
          <div className={styles.codeBlock}>
            <div className={styles.codeBlockHeader}>
              <div className={styles.codeBlockDot} />
              nested-params.ts
            </div>
            <div className={styles.codeBlockContent}>
              <pre>
                <span className={styles.codeComment}>
                  {"// "}Multiple path parameters, all type-checked
                </span>
                {"\n"}
                <span className={styles.codeKeyword}>const</span> url ={" "}
                <span className={styles.codeKeyword}>lunalink</span>(
                <span className={styles.codeString}>
                  &quot;/api/users/:userId/posts/:postId&quot;
                </span>
                , {"{\n"}
                {"  "}userId:{" "}
                <span className={styles.codeString}>&quot;42&quot;</span>,{"\n"}
                {"  "}postId:{" "}
                <span className={styles.codeString}>&quot;7&quot;</span>,{"\n"}
                {"}"});
              </pre>
            </div>
            <div className={styles.codeResult}>
              <span className={styles.codeResultLabel}>Output</span>
              <span className={styles.codeResultValue}>{nestedResult}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className={styles.features}>
        <div className={styles.featuresHeader}>
          <p className={styles.sectionLabel}>Features</p>
          <h2 className={styles.sectionTitle}>Why lunalink?</h2>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>{"{T}"}</div>
            <h3 className={styles.featureTitle}>Type-safe parameters</h3>
            <p className={styles.featureDescription}>
              Path parameters are extracted from your template string at the type
              level. Miss a param and TypeScript will tell you.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>?=</div>
            <h3 className={styles.featureTitle}>Auto query strings</h3>
            <p className={styles.featureDescription}>
              Any extra params that don&apos;t match a path placeholder are
              automatically appended as query string parameters.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>&lt;1kb</div>
            <h3 className={styles.featureTitle}>Lightweight</h3>
            <p className={styles.featureDescription}>
              Tiny footprint with zero unnecessary overhead. Ships ESM and CJS
              so it works everywhere.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>{"://"}</div>
            <h3 className={styles.featureTitle}>Base URL support</h3>
            <p className={styles.featureDescription}>
              Pass a baseURL in the config to automatically join your API root
              with the constructed path.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>#!</div>
            <h3 className={styles.featureTitle}>Custom encoding</h3>
            <p className={styles.featureDescription}>
              Bring your own encodeURIComponent function for full control over
              how parameters are escaped.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>/:</div>
            <h3 className={styles.featureTitle}>Flexible patterns</h3>
            <p className={styles.featureDescription}>
              Supports params separated by slashes, dots, and optional trailing
              markers. Covers real-world URL patterns.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <span className={styles.footerLogo}>lunalink</span>
        <div className={styles.footerLinks}>
          <a
            href="https://github.com/BearStudio/lunalink"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/@bearstudio/lunalink"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            npm
          </a>
          <a
            href="https://github.com/BearStudio/lunalink/issues"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Issues
          </a>
        </div>
      </footer>
    </div>
  );
}
