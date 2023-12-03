interface PagProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (num: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PagProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mb-4 mt-auto w-[100%]">
      <ul className="wrap mt-4 flex justify-center gap-4">
        {pageNumbers.map((number) => (
          /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
          /* eslint-disable jsx-a11y/click-events-have-key-events */
          <li
            onClick={() => onPageChange(number)}
            key={number}
            className={
              number === currentPage
                ? 'flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-slate-500'
                : 'flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-slate-100'
            }
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
