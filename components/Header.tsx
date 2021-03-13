import React from "react";
import Link from "next/link";

type HeaderProps = { name: string; title: string; date: string; url: string };

export default function Header({ name, title, date, url }: HeaderProps) {
  return (
    <header style={{ zIndex: 1000 }}>
      <div>
        <a href={url}>
          <span>{name}</span>
        </a>{" "}
        —{" "}
        <Link href="/">
          <a>{title}</a>
        </Link>
      </div>
      <time>{date}</time>
    </header>
  );
}
