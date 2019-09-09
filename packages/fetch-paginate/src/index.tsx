import React, { useState, useEffect, ReactElement } from "react";
// @ts-ignore
import Pagination from "bulma-pagination-react";
import Skeleton from "react-loading-skeleton";

interface PaginateProps {
  load: (currentPage: number, pageSize: number) => Promise<ListProps>;
  pageSize: number;
  children: ReactElement;
}

interface ListProps {
  items: any[];
  totalItems: number;
}

const FetchPaginate = ({ pageSize = 30, load, children }: PaginateProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    setLoading(true);
    load(currentPage, pageSize)
      .then(res => {
        const { items, totalItems } = res;
        setLoading(false);
        setTotalItems(totalItems);
        // @ts-ignore
        setItems(items);
      })
      .catch((e: any) => {
        setLoading(false);
        setError(e.message);
      });
  }, [currentPage]);

  const childrenWithExtraProp = React.Children.map(children, child => {
    return React.cloneElement(child, { items, isLoading });
  });

  return (
    <>
      {error ? (
        <div className="notification is-danger">
          Failed to fetch data from the chain. Please try again.
        </div>
      ) : null}
      {isLoading ? (
        <Skeleton count={5} />
      ) : (
        <>
          {childrenWithExtraProp}
          <hr />
          <Pagination
            pages={Math.ceil(totalItems / pageSize)}
            currentPage={currentPage}
            onChange={(page: number) => setCurrentPage(page)}
          />
        </>
      )}
    </>
  );
};

export default FetchPaginate;
