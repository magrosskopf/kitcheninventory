import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-base-200">
      <div className="navbar bg-content">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">KitchenDex</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Funktionen</a>
            </li>
            <li>
              <a>Pricing</a>
            </li>
            <li>
              <details>
                <summary>Docs</summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li>
                    <a>Kassenzettel Scans</a>
                  </li>
                  <li>
                    <a>Barcode Scans</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
