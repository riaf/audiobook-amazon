import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import abjpLogo from "./assets/abjp.svg";
import { convertUrl2Isbn13 } from "asin2isbn";

type AudiobookResponse = {
  link: string;
  sample: string;
};

const Audiobook = (props: { isbn: string }) => {
  const { isbn } = props;
  const [audiobook, setAudiobook] = useState<AudiobookResponse | null>(null);

  useEffect(() => {
    fetch(`https://abjp-isbn-api.katteba.workers.dev/${isbn}`, {
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data: AudiobookResponse) => {
        setAudiobook(data);
      });
  }, [isbn]);

  return (
    <div>
      {audiobook ? (
        <div
          style={{
            margin: "-4px -4px 16px -4px",
            padding: "8px",
            border: "4px solid #e0315b55",
            borderRadius: "4px",
            textAlign: "center",
            overflow: "scroll",
            fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
          }}
        >
          <p style={{ margin: "16px 0" }}>
            <a href="https://audiobook.jp" target="_blank">
              <img
                // @ts-ignore
                src={chrome.runtime.getURL(abjpLogo)}
                alt="audiobook.jp logo"
                width="64"
              />
            </a>
          </p>
          <audio src={audiobook.sample} controls />
          <p>
            <a
              target="_blank"
              rel="noopenner"
              style={{ color: "#e0315b" }}
              href={audiobook.link}
            >
              Listen on audiobook.jp
            </a>
          </p>
        </div>
      ) : null}
    </div>
  );
};

const res = convertUrl2Isbn13(window.location.href);

if (res.error == "") {
  document.getElementById("crx-abjp-root")?.remove();
  const root = document.createElement("div");
  root.id = "crx-abjp-root";

  document.getElementById("rightCol")?.prepend(root);

  ReactDOM.render(
    <React.StrictMode>
      <Audiobook isbn={res.isbn} />
    </React.StrictMode>,
    root
  );
}
