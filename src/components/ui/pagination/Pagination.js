import { useState, useEffect } from "react";
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";

const Pagination = ({ total = 1, perPage = 1, currentPage = 1, onChange }) => {
  const [pages, setPages] = useState([]);
  const [renderedPages, setRenderedPages] = useState([]);

  useEffect(() => initial(), [total, perPage]);

  const initial = () => {
    const pages = [];
    const renderedPages = [];

    let counter = 1;
    for (let i = 1; i <= Math.ceil(total / perPage); i++) {
      pages.push(i);

      if (counter <= 3) {
        renderedPages.push(i);

        counter++;
      }
    }

    if (pages.length) {
      setPages(pages);
      setRenderedPages(renderedPages);
    }
  };

  const nextPages = () => {
    // value = 3 | index = 2(es lo que nos devuelve)
    const lastRenderedPageIndex = renderedPages.length - 1;
    const lastRenderedPageValue = renderedPages[lastRenderedPageIndex];

    // pages[2 + 1] = 4
    const initialPage = pages?.[lastRenderedPageValue + 1 - 1];

    if (!initialPage) {
      return;
    }

    // 4 - 1 = 3
    const initialPageIndex = initialPage - 1;

    const nextRenderedPages = [];

    let counter = 0;
    for (let i = initialPageIndex; i < pages.length; i++) {
      const page = pages?.[i];

      if (counter < 3 && page) {
        nextRenderedPages.push(page);
      }
    }

    if (nextRenderedPages.length) {
      setRenderedPages(nextRenderedPages);

      onChange(nextRenderedPages[0]);
    }
  };

  const prevPages = () => {
    const firstRenderedPageIndex = renderedPages[0] - 1;

    const initialPage = pages?.[firstRenderedPageIndex];

    if (!initialPage) {
      return;
    }

    const initialPageIndex = initialPage - 2;

    const prevRenderedPages = [];

    let counter = 0;
    for (let i = initialPageIndex; i >= 0; i--) {
      const page = pages?.[i];

      if (counter < 3 && page) {
        prevRenderedPages.push(page);

        counter++;
      }
    }

    if (prevRenderedPages.length) {
      setRenderedPages(prevRenderedPages.reverse());

      onChange(prevRenderedPages[0]);
    }
  };

  const boxClasses = "flex justify-center items-center cursor-pointer text-sm";

  return (
    <div className="flex">
      <div className={`${boxClasses} rounded border border-gray-200 py-1.5 px-2.5 text-gray-900`} onClick={prevPages}>
        <MdOutlineArrowBackIosNew />
      </div>

      <div className="mx-2 flex">
        {renderedPages.map((page, index) => {
          const renderedPagesLength = renderedPages.length;
          let middleElementMargin = "";

          if (renderedPagesLength === 3 && index === 1) {
            middleElementMargin = "mx-2";
          }

          if (renderedPagesLength === 2 && index === 1) {
            middleElementMargin = "ml-2";
          }

          const activeClasses = page === currentPage && "border border-blue-400 text-blue-400 bg-blue-50";

          const pagesClasses = `${activeClasses} ${middleElementMargin}`;

          return (
            <div
              key={page}
              className={`${boxClasses} rounded border border-gray-200 py-1.5 px-3.5 text-gray-900 ${pagesClasses}`}
              onClick={() => onChange(page)}
            >
              {page}
            </div>
          );
        })}
      </div>

      <div className={`${boxClasses} rounded border border-gray-200 py-1.5 px-2.5 text-gray-900`} onClick={nextPages}>
        <MdOutlineArrowForwardIos />
      </div>
    </div>
  );
};

export default Pagination;
