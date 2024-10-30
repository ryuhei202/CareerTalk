export default function EmployeeComment({
  title,
  comment,
}: {
  title: string;
  comment: string;
}) {
  return (
    <div className="mt-4 flex items-start space-x-2">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>{title}</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <p className="text-xs font-semibold text-gray-700 mt-1">{title}</p>
      </div>
      <div className="flex-grow">
        <div className="bg-blue-50 rounded-lg p-2 relative h-24 overflow-y-auto">
          <div className="absolute left-[-6px] top-3 w-3 h-3 bg-blue-50 transform rotate-45" />
          <p className="text-gray-600 text-xs">{comment}</p>
        </div>
      </div>
    </div>
  );
}
