export function PlaceGridSkeleton() {
    return (
        <div className="h-full grid grid-cols-3 gap-4">
            <div className="card glass h-64 skeleton  text-center"></div>
            <div className="card glass h-64 skeleton  text-center"></div>
            <div className="card glass h-64 skeleton  text-center"></div>
            <div className="card glass h-64 skeleton  text-center"></div>
            <div className="card glass h-64 skeleton  text-center"></div>
        </div>
    );
  }