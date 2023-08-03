import React, { useState, useEffect } from "react";
import { useCategory } from "../hooks";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import {
  TableCategoriesAdmin,
  MyHeaderPage,
  AddEditCategoryFormAdmin,
  DeleteCategoryFormAdmin,
  ActiveCategoryFormAdmin,
} from "../components/Admin";
import { Loader, ModalAdmin } from "../components/Common";
import { renderError, renderMessageAction } from "../utils/renderHelpers";
import { isEmpty } from "lodash";

export function CategoriesAdmin() {
  const {
    getCategories,
    searchCategories,
    updateCategory,
    categories,
    loadingCategory,
    loadingSearchCategory,
  } = useCategory();
  const [active, setActive] = useState(undefined);
  const [titleModal, setTitleModal] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(undefined);
  const [refetch, setRefetch] = useState(false);
  const [actionModal, setActionModal] = useState(undefined);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchCategoryAux, setSearchCategoryAux] = useState(false);
  const [searchOptionFilter, setSearchOptionFilter] = useState(undefined);

  useEffect(() => {
    if (!isEmpty(searchCategory))
      searchCategories(searchCategory, searchOptionFilter).catch((err) =>
        renderError(err, "categories", "search")
      );
    else
      getCategories(active).catch((err) =>
        renderError(err, "categories", "getAll")
      );
  }, [refetch, searchCategory, searchCategoryAux]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);
  const handleSearchOptionChange = (e) => {
    setSearchOptionFilter(e.target.value);
    setSearchCategoryAux((prev) => !prev);
  };

  const onAddCategory = () => {
    setActionModal("add");
    setTitleModal("Nueva Categoría: ¡Agrega tus detalles!");
    setContentModal(
      <AddEditCategoryFormAdmin
        onClose={openCloseModal}
        onRefetch={onRefetch}
        typeActionForm="add"
      />
    );
    openCloseModal();
  };

  const onUpdateCategory = (category) => {
    setActionModal("update");
    setTitleModal(
      `Actualizar Detalles de la Categoría: ¡Haz los cambios necesarios!`
    );
    setContentModal(
      <AddEditCategoryFormAdmin
        onClose={openCloseModal}
        onRefetch={onRefetch}
        category={category}
        typeActionForm="update"
      />
    );
    openCloseModal();
  };

  const onDeleteCategory = (category) => {
    setActionModal("delete");
    setTitleModal(`¡Atención! ¿Está seguro de eliminar este categoría?`);
    setContentModal(
      <DeleteCategoryFormAdmin
        onClose={openCloseModal}
        onRefetch={onRefetch}
        category={category}
      />
    );
    openCloseModal();
  };

  const onChangeActiveCategory = async (category) => {
    const onSubmitActive = async () => {
      await updateCategory(category.id, { active: !category.active }, "active")
        .then(() => {
          renderMessageAction("Category", "update");
        })
        .catch((err) => {
          renderError(err, "category", "update");
        })
        .finally(() => {
          setSearchOptionFilter(undefined);
          setActive(true);
          onRefetch();
          category.active === true && openCloseModal();
        });
    };
    if (category.active === false) await onSubmitActive();
    else {
      setActionModal("active");
      setTitleModal("¡Atención! Mensaje importante");
      setContentModal(
        <ActiveCategoryFormAdmin
          onSubmitActive={onSubmitActive}
          onClose={openCloseModal}
        />
      );
      openCloseModal();
    }
  };

  return (
    <>
      {loadingCategory ? (
        <Loader />
      ) : (
        <>
          <MyHeaderPage
            title="Categorías"
            btnOptions={[
              {
                title: "Nueva Categoría",
                type: "primary",
                onClick: onAddCategory,
                icon: <PlusOutlined />,
              },
              {
                title: "Recargar Registros",
                type: "primary",
                onClick: onRefetch,
                icon: <ReloadOutlined />,
              },
            ]}
            inputOptions={[
              {
                title: "Busca alguna categoría",
                onSearch: setSearchCategory,
                filter: {
                  type: "search",
                  get: searchOptionFilter,
                  set: handleSearchOptionChange,
                },
                filters: [
                  { value: undefined, content: "Todos" },
                  { value: true, content: "Activos" },
                  { value: false, content: "Inactivos" },
                ],
              },
            ]}
          />
          {loadingSearchCategory ? (
            <Loader />
          ) : (
            <TableCategoriesAdmin
              categories={categories}
              onChangeActiveCategory={onChangeActiveCategory}
              onUpdateCategory={onUpdateCategory}
              onDeleteCategory={onDeleteCategory}
            />
          )}
        </>
      )}
      <ModalAdmin
        title={titleModal}
        open={showModal}
        width={700}
        onClose={openCloseModal}
        actionModal={actionModal}
      >
        {contentModal}
      </ModalAdmin>
    </>
  );
}
