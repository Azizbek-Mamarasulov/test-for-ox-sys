interface Props {
  hightlight?: string;
  text: string;
}

function HighligtText({ text, hightlight }: Props) {
  if (!hightlight) return <span>{text}</span>;

  const index = text.toLowerCase().indexOf(hightlight.toLowerCase());

  const marked = text.substr(index, hightlight.length);
  const before = text.slice(
    0,
    text.toLowerCase().indexOf(hightlight.toLowerCase())
  );
  const after = text.slice(index + hightlight.length);
  return (
    <span>
      {before}
      <span className="highlight-red">{marked}</span>
      {after}
    </span>
  );
}

export default HighligtText;
