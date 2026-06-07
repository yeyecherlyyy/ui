// src/routes/report.$id.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/store/useAppStore";
import { useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/report/$id")({
  component: Report,
});

function Report() {
  const { id } = Route.useParams(); // get :id param
  const scan = useAppStore((state) => state.scans[id]);

  if (!scan) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Report Not Found</h1>
        <p>
          No scan with ID <code>{id}</code> was found.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Scan Report – {scan.id}</h1>
      <p className="mb-2">
        <strong>Status:</strong> {scan.status}
      </p>
      <p className="mb-4">
        <strong>Created At:</strong> {new Date(scan.createdAt).toLocaleString()}
      </p>
      {scan.findings && scan.findings.length > 0 ? (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Findings</h2>
          <ul className="list-disc pl-5 space-y-1">
            {scan.findings.map((f, idx) => (
              <li key={idx}>
                <span className="font-medium capitalize">{f.severity}</span>: {f.description}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No findings recorded.</p>
      )}
    </div>
  );
}
