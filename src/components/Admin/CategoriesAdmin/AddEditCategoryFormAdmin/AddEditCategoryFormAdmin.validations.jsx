import * as Yup from "yup";
import { REGEX_PATTERNS } from "../../../../utils";

export function initialValuesCategory(data) {
  return {
    name: data?.name || "",
    description: data?.description || "",
  };
}

export function updateSchemaCategory(data) {
  return {
    name: Yup.string()
      .trim(
        "El nombre de la categoría no debe incluir espacios en blanco por demas"
      )
      .min(1, "El nombre de la categoría debe contener como mínimo 1 caracter")
      .max(
        254,
        "El nombre de la categoría debe contener como máximo 254 caracteres"
      )
      .required("El nombre de la categoría es obligatorio"),
    description: Yup.string()
      .trim("La descripción no debe incluir espacios en blanco por demas")
      .min(1, "La descripción debe contener como minimo 1 caracter")
      .max(2000, "La descripción debe contener como máximo 2000 caracteres"),
  };
}

export function addSchemaCategory() {
  return {
    name: Yup.string()
      .trim(
        "El nombre de la categoría no debe incluir espacios en blanco por demas"
      )
      .min(1, "El nombre de la categoría debe contener como mínimo 1 caracter")
      .max(
        254,
        "El nombre de la categoría debe contener como máximo 254 caracteres"
      )
      .required("El nombre de la categoría es obligatorio"),
    description: Yup.string()
      .trim("La descripción no debe incluir espacios en blanco por demas")
      .min(1, "La descripción debe contener como minimo 1 caracter")
      .max(2000, "La descripción debe contener como máximo 2000 caracteres"),
  };
}
