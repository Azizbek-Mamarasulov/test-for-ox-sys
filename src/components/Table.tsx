import { Skeleton, Table } from "antd";
import { ProductPropertyProps, useProducts } from "../axios/useProducts";
import HighligtText from "./HighligtText";

interface Props {
  search?: string;
}

const getFakeData = (size: number) =>
  Array.from({ length: size }).map((_, i) => ({
    id: 1,
    productName: "Product Name",
    supplier: "Supplier",
    productProperties: ["Product", "Properties"],
  }));

function ProductTable({ search }: Props) {
  const { isLoading, data, page, size, totalCount, setSize, setPage } =
    useProducts(search);

  return (
    <Table
      columns={[
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          render: (text) => (
            <Skeleton
              title={{
                style: { height: 30, padding: 0, margin: 0, width: 40 },
              }}
              paragraph={false}
              loading={isLoading}
            >
              {text}
            </Skeleton>
          ),
        },
        {
          title: "Name",
          dataIndex: "productName",
          key: "productName",
          render: (text) => (
            <Skeleton
              title={{
                width: "80%",
                style: { height: 30, padding: 0, margin: 0 },
              }}
              paragraph={false}
              loading={isLoading}
            >
              <HighligtText text={text} hightlight={search} />
            </Skeleton>
          ),
        },
        {
          title: "Supplier",
          dataIndex: "supplier",
          key: "supplier",
          render: (text) => (
            <Skeleton
              title={{
                width: "40%",
                style: { height: 30, padding: 0, margin: 0 },
              }}
              paragraph={false}
              loading={isLoading}
            >
              {text}
            </Skeleton>
          ),
        },
        {
          title: "Properties",
          dataIndex: "productProperties",
          key: "productProperties",
          render: (val: ProductPropertyProps[]) => (
            <Skeleton
              title={{
                width: "80%",
                style: { height: 30, padding: 0, margin: 0 },
              }}
              paragraph={false}
              loading={isLoading}
            >
              {val.map((i) => `${i.name}: ${i.value}`).join(", ")}
            </Skeleton>
          ),
        },
      ]}
      dataSource={isLoading ? getFakeData(size) : data}
      pagination={{
        total: totalCount,
        current: page,
        pageSize: size,
        hideOnSinglePage: true,
      }}
      onChange={({ current, pageSize }) => {
        if (pageSize) {
          setSize(pageSize);
        }
        if (current) {
          setPage(current);
        }
      }}
    />
  );
}

export default ProductTable;
