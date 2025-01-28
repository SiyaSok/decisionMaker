/** @format */

const SelectedfileData = ({ data }) => {
  if (!data) return <p className='text-gray-500'>No data available</p>;

  if (
    typeof data === "string" ||
    typeof data === "number" ||
    typeof data === "boolean"
  ) {
    return <span className='text-gray-800'>{String(data)}</span>;
  }

  if (Array.isArray(data)) {
    return (
      <>
        {data.map((item, index) => (
          <div key={index}>
            <SelectedfileData data={item} />
          </div>
        ))}
      </>
    );
  }

  if (typeof data === "object" && data !== null) {
    return (
      <div className='grid bg-green-50 md:grid-cols-2 gap-4 p-4 bg-white shadow-md rounded-lg mt-2'>
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className='pb-2'>
            <strong className='text-green-600 capitalize'>{key}:</strong>{" "}
            <SelectedfileData data={value} />
          </div>
        ))}
      </div>
    );
  }

  return <span className='text-gray-500'>Unknown Data</span>;
};

export default SelectedfileData;
