import abjpLogo from "./assets/abjp.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <a href="https://audiobook.jp" target="_blank">
          <img src={abjpLogo} className="logo abjp" alt="audiobook.jp logo" />
        </a>
      </div>
      <h1>Find Audiobooks on Amazon</h1>
      <div className="card">
        <p>
          Amazon
          の書籍ページに、その書籍のオーディオブックがあるかどうかを表示します。
        </p>
        <p>非公式プラグインなので、動作保証はできません。</p>
      </div>
      <p className="read-the-docs">By Katteba LLC. (Unofficial)</p>
    </div>
  );
}

export default App;
