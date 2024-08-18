export default function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: string;
  onClose: any;
}) {
  return (
    <>
      <div className="toast toast-end">
        <div className={`alert alert-${type}`}>
          <span>{message}</span>
          <button className="ml-2" onClick={onClose}>
            ✕
          </button>
        </div>
      </div>
    </>
  );
}
