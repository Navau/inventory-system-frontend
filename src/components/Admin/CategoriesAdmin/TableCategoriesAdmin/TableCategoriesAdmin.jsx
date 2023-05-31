import React, { useEffect, useState } from "react";
import { Table } from "antd";
import {
  categoriesColumnsTable,
  categoriesDataTable,
} from "../../../../utils/tablesOptions";

import "./TableCategoriesAdmin.scss";

export function TableCategoriesAdmin(props) {
  const {
    categories,
    onChangeActiveCategory,
    onUpdateCategory,
    onDeleteCategory,
  } = props;
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
      className="table-categories-admin"
      dataSource={categoriesDataTable(categories)}
      columns={categoriesColumnsTable(
        categories,
        onChangeActiveCategory,
        onUpdateCategory,
        onDeleteCategory
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
