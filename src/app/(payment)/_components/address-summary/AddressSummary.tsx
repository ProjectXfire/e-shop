import styles from "./styles.module.css";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import SeparatorAnimated from "@/shared/components/animations/separator-animated/SeparatorAnimated";
import TableKeyValue from "@/shared/components/table-key-value/TableKeyValue";

function AddressSummary(): React.ReactElement {
  const fields = [
    { key: "Nombres", value: "My Super nombre" },
    { key: "Apellidos", value: "My Super Apellido" },
    { key: "Dirección", value: "My Super dirección en la avenida nose que" },
    { key: "Dirección adicional", value: "My Super dirección en la avenida nose que" },
    { key: "Código postal", value: "12493" },
    { key: "Ciudad", value: "Popirate" },
    { key: "País", value: "Perú" },
    { key: "Teléfono", value: "+34-34343-56" },
  ];

  return (
    <section className={styles["address-summary"]}>
      <TitleAnimated title="Dirección de entrega" />
      <SeparatorAnimated />
      <TableKeyValue fields={fields} />
    </section>
  );
}
export default AddressSummary;
