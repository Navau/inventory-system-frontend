import React, { useEffect, useState } from "react";
import { Table } from "antd";
import {
  productsColumnsTable,
  productsDataTable,
} from "../../../../utils/tablesOptions";

import "./TableProductsAdmin.scss";

export function TableProductsAdmin(props) {
  const { products, onChangeActiveProduct, onUpdateProduct, onDeleteProduct } =
    props;
  const getRowClassName = (record) => {
    return record.active ? "active-row" : "inactive-row";
  };
  const customLocale = {
    filterTitle: "Filtrar menú",
    filterConfirm: "Aceptar",
    filterReset: "Reiniciar",
    filterEmptyText: "Sin filtros",
    emptyText: "Sin datos",
    selectAll: "Seleccionar todo",
    selectInvert: "Invertir selección",
    selectNone: "Vacíe todo",
    selectionAll: "Seleccionar todos los datos",
    sortTitle: "Ordenar",
    expand: "Expandir fila",
    collapse: "Colapsar fila",
    triggerDesc: "Click para ordenar en orden descendente",
    triggerAsc: "Click para ordenar en orden ascendente",
    cancelSort: "Click para cancelar ordenamiento",
  };
  return (
    <Table
      className="table-products-admin"
      dataSource={productsDataTable(products)}
      columns={productsColumnsTable(
        products,
        onChangeActiveProduct,
        onUpdateProduct,
        onDeleteProduct
      )}
      pagination={{
        position: ["bottomCenter"],
        pageSize: 5,
      }}
      scroll={{ x: 200 }}
      rowClassName={getRowClassName}
      locale={customLocale}
    />
  );
}
