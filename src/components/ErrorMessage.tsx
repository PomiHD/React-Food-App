type ErrorProps = {
  title: string;
  message: string;
};
export function ErrorMessage({ title, message }: ErrorProps) {
  return (
    <aside id="error">
      <h1>{title}</h1>
      <p>{message}</p>
    </aside>
  );
}
