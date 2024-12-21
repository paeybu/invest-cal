import { useState } from "react";
import {
  Container,
  NumberInput,
  Group,
  Button,
  Title,
  Table,
  Text,
} from "@mantine/core";
import { LineChart } from "@mantine/charts";
type ChartData = {
  year: number;
  futureValue: number; // Use number instead of string for numerical data
  totalContributions: number; // Use number instead of string for numerical data
};

const CompoundInterestCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState(100000);
  const [years, setYears] = useState(30);
  const [interestRate, setInterestRate] = useState(7.5);
  const [tableData, setTableData] = useState<ChartData[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const calculateCompoundInterest = () => {
    const monthlyRate = interestRate / 100 / 12;

    let futureValue = initialInvestment;
    let contributions = initialInvestment;

    const yearData = [];
    const chartDataArray = [];

    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        futureValue += monthlyContribution;
        futureValue *= 1 + monthlyRate;
        contributions += monthlyContribution;
      }
      yearData.push({
        year,
        futureValue: +futureValue.toFixed(2),
        totalContributions: +contributions.toFixed(2),
      });

      chartDataArray.push({
        year,
        futureValue: +futureValue.toFixed(2),
        totalContributions: +contributions.toFixed(2),
      });
    }

    setTableData(yearData);
    setChartData(chartDataArray);
    console.log(chartDataArray);
  };

  return (
    <Container size="sm" mt={4}>
      <Title
        mb={{ base: "sm", md: "lg" }} // Adjust margin-bottom for small and medium screens
        size="lg"
      >
        Compound Interest Calculator (THB)
      </Title>
      <Group align="center">
        <NumberInput
          w={{ base: "100%", xs: "auto" }}
          label="Initial Investment (THB)"
          value={initialInvestment}
          onChange={(value) => setInitialInvestment(+value || 0)}
          min={0}
          thousandSeparator=","
        />
        <NumberInput
          w={{ base: "100%", xs: "auto" }}
          label="Monthly Contribution (THB)"
          value={monthlyContribution}
          onChange={(value) => setMonthlyContribution(+value || 0)}
          min={0}
          thousandSeparator=","
        />
        <NumberInput
          w={{ base: "100%", xs: "auto" }}
          label="Length of Time (Years)"
          value={years}
          onChange={(value) => setYears(+value || 1)}
          min={1}
        />
        <NumberInput
          w={{ base: "100%", xs: "auto" }}
          label="Interest Rate (% per year)"
          value={interestRate}
          onChange={(value) => setInterestRate(+value || 0)}
          min={0}
        />
        <Button
          mt={{ base: 0, sm: 20 }}
          w={{ base: "100%", xs: "auto" }}
          disabled={monthlyContribution < 1}
          onClick={calculateCompoundInterest}
        >
          Calculate
        </Button>
      </Group>

      <LineChart
        h={300}
        mt="xl"
        data={chartData}
        dataKey="year"
        valueFormatter={(val) => val.toLocaleString()}
        series={[
          {
            name: "futureValue",
            color: "red.6",
            label: "Future Value",
          },
          {
            name: "totalContributions",
            color: "blue.6",
            label: "Total Contributions",
          },
        ]}
        curveType="linear"
      />

      {tableData.length > 0 && (
        <>
          <Text mt={32}>
            In {years} you will have{" "}
            <Text display="inline" fw={700} bg="green.9" c="white" p={4}>
              {tableData[tableData.length - 1].futureValue.toLocaleString()}{" "}
              Baht
            </Text>
          </Text>

          <Table mt="lg" highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th ta='right'>Year</Table.Th>
                <Table.Th ta='right'>Future Value (THB)</Table.Th>
                <Table.Th ta='right'>Total Contributions (THB)</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {tableData.map(({ year, futureValue, totalContributions }) => (
                <Table.Tr key={year}>
                  <Table.Td ta="right">{year}</Table.Td>
                  <Table.Td ta="right">{futureValue.toLocaleString()}</Table.Td>
                  <Table.Td ta="right">
                    {totalContributions.toLocaleString()}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default CompoundInterestCalculator;
