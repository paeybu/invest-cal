import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import CompoundInterestCalculator from "./Cal";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <CompoundInterestCalculator />
    </MantineProvider>
  );
}
