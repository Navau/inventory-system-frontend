import * as Yup from "yup";
import { REGEX_PATTERNS } from "../../../../utils";

export function initialValuesDeposit(data) {
  return {
    name: data?.name || "",
    description: data?.description || "",
    capacity: data?.capacity || 0,
    address: data?.address || "",
  };
}

export function updateSchemaDeposit(data) {
  return {
    name: Yup.string()
      .trim(
        "El nombre del deposito no debe incluir espacios en blanco por demas"
      )
      .min(1, "El nombre del deposito debe contener como mínimo 1 caracter")
      .max(
        254,
        "El nombre del deposito debe contener como máximo 254 caracteres"
      )
      .required("El nombre del deposito es obligatorio"),
    description: Yup.string()
      .trim("La descripción no debe incluir espacios en blanco por demas")
      .min(1, "La descripción debe contener como minimo 1 caracter")
      .max(2000, "La descripción debe contener como máximo 2000 caracteres"),
    capacity: Yup.number()
      .typeError("La capacidad máxima no es un número válido")
      .default(0)
      .test(
        "Es entero",
        "La capacidad máxima no cumple con el formato correcto de número entero, ejemplo: '999999999'",
        (val, options) => {
          if (val !== undefined) {
            return REGEX_PATTERNS.capacity.test(options.originalValue);
          }
          return true;
        }
      )
      .min(0, "La capacidad máxima debe ser mayor o igual a 0")
      .max(100000000, "La capacidad máxima debe ser menor a 100000000")
      .required("La capacidad máxima es obligatorio"),
    address: Yup.string()
      .trim("La dirección no debe incluir espacios en blanco por demas")
      .min(1, "La dirección debe contener como minimo 1 caracter")
      .max(2000, "La dirección debe contener como máximo 2000 caracteres"),
  };
}

export function addSchemaDeposit() {
  return {
    name: Yup.string()
      .trim(
        "El nombre del deposito no debe incluir espacios en blanco por demas"
      )
      .min(1, "El nombre del deposito debe contener como mínimo 1 caracter")
      .max(
        254,
        "El nombre del deposito debe contener como máximo 254 caracteres"
      )
      .required("El nombre del deposito es obligatorio"),
    description: Yup.string()
      .trim("La descripción no debe incluir espacios en blanco por demas")
      .min(1, "La descripción debe contener como minimo 1 caracter")
      .max(2000, "La descripción debe contener como máximo 2000 caracteres"),
    capacity: Yup.number()
      .typeError("La capacidad máxima no es un número válido")
      .default(0)
      .test(
        "Es entero",
        "La capacidad máxima no cumple con el formato correcto de número entero, ejemplo: '999999999'",
        (val, options) => {
          if (val !== undefined) {
            return REGEX_PATTERNS.capacity.test(options.originalValue);
          }
          return true;
        }
      )
      .min(0, "La capacidad máxima debe ser mayor o igual a 0")
      .max(100000000, "La capacidad máxima debe ser menor a 100000000")
      .required("La capacidad máxima es obligatorio"),
    address: Yup.string()
      .trim("La dirección no debe incluir espacios en blanco por demas")
      .min(1, "La dirección debe contener como minimo 1 caracter")
      .max(2000, "La dirección debe contener como máximo 2000 caracteres"),
  };
}
