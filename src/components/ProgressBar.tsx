function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full">
      <div className="mb-1 flex justify-between">
        <span className="text-base font-medium text-white">Rendering...</span>
        <span className="text-base font-medium text-white">{progress}%</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-2.5 rounded-full bg-indigo-600"
          style={{ width: progress + "%" }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
