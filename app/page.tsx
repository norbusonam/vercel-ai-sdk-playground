import Link from "next/link";

export default function Chat() {
  return (
    <div>
      <Link href="/chat">Chat</Link>
      <Link href="/gen-ui">Gen UI</Link>
    </div>
  );
}
