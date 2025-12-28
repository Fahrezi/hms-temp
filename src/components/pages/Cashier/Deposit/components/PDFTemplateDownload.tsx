import { Document, Page, StyleSheet, Text,View } from "@react-pdf/renderer";

const PDFTemplateDownload = () => {
  const styles = StyleSheet.create({
    page: {
      paddingTop: 28,
      paddingHorizontal: 28,
      paddingBottom: 40,
      fontFamily: "Helvetica",
      fontSize: 10,
    },
    header: { marginBottom: 24 },
    h1: { fontSize: 32, marginBottom: 32 },
    h2: { fontSize: 24, color: "#CCCCCC" }
  })
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header} fixed>
          <Text style={styles.h1}>Invoice</Text>
          <Text style={styles.h2}>Luthfi Fahrezi</Text>
        </View>
      </Page>
    </Document>
  );
}

export default PDFTemplateDownload;