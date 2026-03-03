import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import { ProductPDFProps } from "./types";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 10,
    gap: 4,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
});

export const ProductPDF = ({ product }: ProductPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Product ID: {product.productId}</Text>
        <Text>Name: {product.name}</Text>
        <Text>Price: ${product.price}</Text>
        <Text>Type: {product.type}</Text>
        {product.parameters.map((param, index) => (
          <Text key={index}>
            {param.title}: {param.value}
          </Text>
        ))}
        {product.metrics.map((metric, index) => (
          <Text key={index}>
            {metric.title}: {metric.firstValue} / {metric.secondValue}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);
