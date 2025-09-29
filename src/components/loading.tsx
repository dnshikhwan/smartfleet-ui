import { InfinitySpin } from "react-loader-spinner";

export function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <InfinitySpin width="150" color="#ffffff" />
    </div>
  );
}
