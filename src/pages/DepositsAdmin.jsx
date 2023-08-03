import React, { useState, useEffect } from "react";
import { useDeposit } from "../hooks";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import {
  TableDepositsAdmin,
  MyHeaderPage,
  AddEditDepositFormAdmin,
  DeleteDepositFormAdmin,
  ActiveDepositFormAdmin,
} from "../components/Admin";
import { Loader, ModalAdmin } from "../components/Common";
import { renderError, renderMessageAction } from "../utils/renderHelpers";
import { isEmpty } from "lodash";

export function DepositsAdmin() {
  const {
    getDeposits,
    searchDeposits,
    updateDeposit,
    deposits,
    loadingDeposit,
    loadingSearchDeposit,
  } = useDeposit();
  const [active, setActive] = useState(undefined);
  const [titleModal, setTitleModal] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(undefined);
  const [refetch, setRefetch] = useState(false);
  const [actionModal, setActionModal] = useState(undefined);
  const [searchDeposit, setSearchDeposit] = useState("");
  const [searchDepositAux, setSearchDepositAux] = useState(false);
  const [searchOptionFilter, setSearchOptionFilter] = useState(undefined);

  useEffect(() => {
    if (!isEmpty(searchDeposit))
      searchDeposits(searchDeposit, searchOptionFilter).catch((err) =>
        renderError(err, "deposits", "search")
      );
    else
      getDeposits(active).catch((err) =>
        renderError(err, "deposits", "getAll")
      );
  }, [refetch, searchDeposit, searchDepositAux]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);
  const handleSearchOptionChange = (e) => {
    setSearchOptionFilter(e.target.value);
    setSearchDepositAux((prev) => !prev);
  };

  const onAddDeposit = () => {
    setActionModal("add");
    setTitleModal("Nueva Deposito: ¡Agrega tus detalles!");
    setContentModal(
      <AddEditDepositFormAdmin onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const onUpdateDeposit = (deposit) => {
    setActionModal("update");
    setTitleModal(
      `Actualizar Detalles del Deposito: ¡Haz los cambios necesarios!`
    );
    setContentModal(
      <AddEditDepositFormAdmin
        onClose={openCloseModal}
        onRefetch={onRefetch}
        deposit={deposit}
      />
    );
    openCloseModal();
  };

  const onDeleteDeposit = (deposit) => {
    setActionModal("delete");
    setTitleModal(`¡Atención! ¿Está seguro de eliminar este deposito?`);
    setContentModal(
      <DeleteDepositFormAdmin
        onClose={openCloseModal}
        onRefetch={onRefetch}
        deposit={deposit}
      />
    );
    openCloseModal();
  };

  const onChangeActiveDeposit = async (deposit) => {
    const onSubmitActive = async () => {
      await updateDeposit(deposit.id, { active: !deposit.active }, "active")
        .then(() => {
          renderMessageAction("Deposit", "update");
        })
        .catch((err) => {
          renderError(err, "deposit", "update");
        })
        .finally(() => {
          setSearchOptionFilter(undefined);
          setActive(true);
          onRefetch();
          deposit.active === true && openCloseModal();
        });
    };
    if (deposit.active === false) await onSubmitActive();
    else {
      setActionModal("active");
      setTitleModal("¡Atención! Mensaje importante");
      setContentModal(
        <ActiveDepositFormAdmin
          onSubmitActive={onSubmitActive}
          onClose={openCloseModal}
        />
      );
      openCloseModal();
    }
  };

  return (
    <>
      {loadingDeposit ? (
        <Loader />
      ) : (
        <>
          <MyHeaderPage
            title="Depositos"
            btnOptions={[
              {
                title: "Nuevo Deposito",
                type: "primary",
                onClick: onAddDeposit,
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
                title: "Busca algún deposito",
                onSearch: setSearchDeposit,
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
          {loadingSearchDeposit ? (
            <Loader />
          ) : (
            <TableDepositsAdmin
              deposits={deposits}
              onChangeActiveDeposit={onChangeActiveDeposit}
              onUpdateDeposit={onUpdateDeposit}
              onDeleteDeposit={onDeleteDeposit}
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
