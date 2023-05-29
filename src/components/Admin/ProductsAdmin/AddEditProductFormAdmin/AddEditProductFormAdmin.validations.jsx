import * as Yup from "yup";
import { REGEX_PATTERNS } from "../../../../utils";

export function initialValuesProduct(data) {
  return {
    name: data?.name || "",
    description: data?.description || "",
    price: data?.price || "",
    stock: data?.stock || 0,
    category: data?.id_category || undefined,
    deposit: data?.id_deposit || undefined,
  };
}

export function updateSchemaProduct(data) {
  return {
    name: Yup.string()
      .trim(
        "El nombre del producto no debe incluir espacios en blanco por demas"
      )
      .min(1, "El nombre del producto debe contener como mínimo 1 caracter")
      .max(
        254,
        "El nombre del producto debe contener como máximo 254 caracteres"
      )
      .required("El nombre del producto es obligatorio"),
    description: Yup.string()
      .trim("La descripción no debe incluir espacios en blanco por demas")
      .min(1, "La descripción debe contener como minimo 1 caracter")
      .max(2000, "La descripción debe contener como máximo 2000 caracteres"),
    price: Yup.string()
      .typeError("El precio no es un número válido")
      .test(
        "Es decimal",
        "El precio no cumple con el formato correcto de número decimal, ejemplo: '99999.99'",
        (val, options) => {
          if (val !== undefined) {
            return REGEX_PATTERNS.price.test(options.originalValue);
          }
          return true;
        }
      )
      .min(1, "El precio debe ser mayor a 0")
      .max(9999, "El precio debe ser menor a 9999")
      .required("El precio es obligatorio"),
    stock: Yup.number()
      .typeError("El stock no es un número válido")
      .default(0)
      .test(
        "Es entero",
        "El stock no cumple con el formato correcto de número entero, ejemplo: '999999999'",
        (val, options) => {
          if (val !== undefined) {
            return REGEX_PATTERNS.stock.test(options.originalValue);
          }
          return true;
        }
      )
      .min(0, "El stock debe ser mayor o igual a 0")
      .max(100000000, "El stock debe ser menor a 100000000")
      .required("El stock es obligatorio"),
    category: Yup.number()
      .typeError("La categoría no es un valor válido")
      .required("La categoría es obligatorio"),
    deposit: Yup.number()
      .typeError("El deposito no es un valor válido")
      .required("El deposito es obligatorio"),
  };
}

export function addSchemaProduct() {
  return {
    name: Yup.string()
      .trim(
        "El nombre del producto no debe incluir espacios en blanco por demas"
      )
      .min(1, "El nombre del producto debe contener como mínimo 1 caracter")
      .max(
        254,
        "El nombre del producto debe contener como máximo 254 caracteres"
      )
      .required("El nombre del producto es obligatorio"),
    description: Yup.string()
      .trim("La descripción no debe incluir espacios en blanco por demas")
      .min(1, "La descripción debe contener como minimo 1 caracter")
      .max(2000, "La descripción debe contener como máximo 2000 caracteres"),
    price: Yup.string()
      .typeError("El precio no es un número válido")
      .test(
        "Es decimal",
        "El precio no cumple con el formato correcto de número decimal, ejemplo: '99999.99'",
        (val, options) => {
          if (val !== undefined) {
            return REGEX_PATTERNS.price.test(options.originalValue);
          }
          return true;
        }
      )
      .min(1, "El precio debe ser mayor a 0")
      .max(9999, "El precio debe ser menor a 9999")
      .required("El precio es obligatorio"),
    stock: Yup.number()
      .typeError("El stock no es un número válido")
      .default(0)
      .test(
        "Es entero",
        "El stock no cumple con el formato correcto de número entero, ejemplo: '999999999'",
        (val, options) => {
          if (val !== undefined) {
            return REGEX_PATTERNS.stock.test(options.originalValue);
          }
          return true;
        }
      )
      .min(0, "El stock debe ser mayor o igual a 0")
      .max(100000000, "El stock debe ser menor a 100000000")
      .required("El stock es obligatorio"),
    category: Yup.number()
      .typeError("La categoría no es un valor válido")
      .required("La categoría es obligatorio"),
    deposit: Yup.number()
      .typeError("El deposito no es un valor válido")
      .required("El deposito es obligatorio"),
  };
}
