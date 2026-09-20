/** Decorative ambient blobs drifting behind the page content (pure CSS). */
export default function Background() {
  return (
    <div className="bg-blobs" aria-hidden="true">
      <span className="bg-blob bg-blob--one" />
      <span className="bg-blob bg-blob--two" />
      <span className="bg-blob bg-blob--three" />
    </div>
  );
}