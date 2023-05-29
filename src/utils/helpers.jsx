export const myMessagesError = (typeError, action) => {
  const msgDefault = `Error de conexión (${action} ${typeError}): No se pudo obtener datos del servidor`;
  const MESSAGES = {
    category: {
      getOne: "Error al obtener la categoría del servidor",
      getAll: "Error al obtener las categorías del servidor",
      add: "Error al agregar la categoría en el servidor",
      update: "Error al actualizar la categoría en el servidor",
      delete: "Error al eliminar la categoría en el servidor",
    },
    deposit: {
      getOne: "Error al obtener el depósito del servidor",
      getAll: "Error al obtener los depósitos del servidor",
      add: "Error al agregar el depósito en el servidor",
      update: "Error al actualizar el depósito en el servidor",
      delete: "Error al eliminar el depósito en el servidor",
    },
    product: {
      getOne: "Error al obtener el producto del servidor",
      getAll: "Error al obtener los productos del servidor",
      add: "Error al agregar el producto en el servidor",
      update: "Error al actualizar el producto en el servidor",
      delete: "Error al eliminar el producto en el servidor",
    },
  };

  return MESSAGES[typeError][action] || msgDefault;
};

export const codeMessageError = (code, typeError, action) => {
  const typeErrorMessage = typeError ? `${typeError}` : "";
  const actionMessage = action ? `${action}` : "";
  let auxMessage = "";
  auxMessage += translateWord(actionMessage);
  auxMessage += typeErrorMessage && ` ${translateWord(typeErrorMessage)}`;
  const CODE_MESSAGES = {
    ERR_BAD_REQUEST: `Error ${auxMessage}: Solicitud incorrecta. Verifica los datos enviados.`,
    ERR_UNAUTHORIZED: `Error ${auxMessage}: No autorizado. Inicia sesión para acceder.`,
    ERR_FORBIDDEN: `Error ${auxMessage}: Acceso prohibido. No tienes permisos suficientes.`,
    ERR_NOT_FOUND: `Error ${auxMessage}: No encontrado. El recurso solicitado no existe.`,
    ERR_METHOD_NOT_ALLOWED: `Error ${auxMessage}: Método no permitido. Verifica el método de solicitud utilizado.`,
    ERR_INTERNAL_SERVER_ERROR: `Error ${auxMessage}: Error interno del servidor. Inténtalo de nuevo más tarde.`,
    ERR_CONFLICT: `Error ${auxMessage}: Conflicto. Se encontró un estado conflictivo en el servidor.`,
    ERR_TOO_MANY_REQUESTS: `Error ${auxMessage}: Demasiadas solicitudes. Intenta nuevamente más tarde.`,
    ERR_SERVICE_UNAVAILABLE: `Error ${auxMessage}: Servicio no disponible. Inténtalo nuevamente más tarde.`,
    ERR_GATEWAY_TIMEOUT: `Error ${auxMessage}: Tiempo de espera agotado. La conexión con el servidor se ha perdido.`,
    ERR_NETWORK_ERROR: `Error ${auxMessage}: Error de red. Verifica tu conexión a internet.`,
    ERR_UNKNOWN: `Error ${auxMessage}: Error desconocido. Ocurrió un error inesperado.`,
  };
  return CODE_MESSAGES[code] || code;
};

export const translateWord = (word) => {
  const TRANSLATES = {
    product: "producto",
    products: "productos",
    categories: "categorías",
    category: "categoría",
    deposit: "depósito",
    deposits: "depósitos",
    getAll: "obtener",
    getOne: "obtener",
    add: "agregar",
    update: "actualizar",
    delete: "eliminar",
    Product: "Producto",
    Products: "Productos",
    Categories: "Categorías",
    Category: "Categoría",
    Deposit: "Depósito",
    Deposits: "Depósitos",
    GetAll: "Obtener",
    GetOne: "Obtener",
    Add: "Agregar",
    Update: "Actualizar",
    Delete: "Eliminar",
  };
  return TRANSLATES[word] || word;
};

export const myMessagesAction = (action, section) => {
  const ACTIONS_MESSAGES = {
    add: `${translateWord(section)} creado correctamente`,
    update: `${translateWord(section)} actualizado correctamente`,
    delete: `${translateWord(section)} eliminado correctamente`,
  };

  return ACTIONS_MESSAGES[action];
};
