import React from "react";
import Link from "next/link";
import useDeckMetadata from "../global/deckMetadata";

type HeaderProps = { name: string; title: string; date: string; url: string };

export default function Header({ name, title, url }: HeaderProps) {
  const [date, deckTitle] = useDeckMetadata((state) => [
    state.date,
    state.title,
  ]);
  return (
    <header style={{ zIndex: 1000 }}>
      <div>
        <a href={url}>
          <span>{name}</span>
        </a>{" "}
        —{" "}
        <Link href="/">
          <a>{deckTitle ?? title}</a>
        </Link>
      </div>
      {date && <time>{date}</time>}
    </header>
  );
}
