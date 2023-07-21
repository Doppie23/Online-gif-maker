type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FileUpload({ onChange }: Props) {
  return (
    <>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          Upload mp4
        </label>
        <input
          onChange={onChange}
          className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          accept=".mp4"
        />
      </div>
    </>
  );
}

export default FileUpload;
