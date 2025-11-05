// GuestListReport.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

type Guest = {
  id: string;
  room_no: string;
  last_name: string;
  first_name: string;
  arrival: string;      // YYYY-MM-DD
  departure: string;    // YYYY-MM-DD
  rate_source: string;
  group: string;
  etd: string;          // HH:mm
  by: string;
  sell_type: string;
  guest_type: string;
  m_j: string;
  adult: string;
  child: string;
  rsvp: string;
  type: string;
  reg_no: string;
  status: string;
  balance: string;
};

type Props = {
  data: Guest[];
  fileName?: string;
  hotelName?: string;
  reportTitle?: string;
  generatedAt?: string; // optional override
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingHorizontal: 28,
    paddingBottom: 28,
    fontSize: 10,
    color: "#111827",
  },
  headerWrap: {
    marginBottom: 10,
  },
  hotelName: {
    fontSize: 14,
    fontWeight: 700,
  },
  reportTitle: {
    marginTop: 2,
    fontSize: 12,
  },
  metaRow: {
    marginTop: 6,
    fontSize: 9,
    color: "#6B7280",
  },
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  thead: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingVertical: 6,
  },
  th: {
    paddingHorizontal: 6,
    fontSize: 9,
    fontWeight: 700,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  cell: {
    paddingHorizontal: 6,
    fontSize: 9,
  },
  // column widths
  w_room: { width: 42 },
  w_name: { width: 90 },
  w_dates: { width: 116 },
  w_source: { width: 72 },
  w_sell: { width: 70 },
  w_guestType: { width: 62 },
  w_pax: { width: 44 },
  w_status: { width: 64 },
  w_rsvp: { width: 90 },

  footer: {
    marginTop: 10,
    fontSize: 9,
    color: "#6B7280",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stickyHeader: {
    position: "absolute",
    top: 32,
    left: 28,
    right: 28,
  },
});

const formatDate = (d?: string) => (d ? d : "-");
const fullName = (g: Guest) => `${g.first_name} ${g.last_name}`.trim();

const TableHeader = () => (
  <View style={[styles.table]}>
    <View style={styles.thead}>
      <Text style={[styles.th, styles.w_room]}>Room</Text>
      <Text style={[styles.th, styles.w_name]}>Name</Text>
      <Text style={[styles.th, styles.w_dates]}>Arrival → Departure</Text>
      <Text style={[styles.th, styles.w_source]}>Rate Source / By</Text>
      <Text style={[styles.th, styles.w_sell]}>Sell Type / Group</Text>
      <Text style={[styles.th, styles.w_guestType]}>Guest Type</Text>
      <Text style={[styles.th, styles.w_pax]}>Pax</Text>
      <Text style={[styles.th, styles.w_status]}>Status</Text>
      <Text style={[styles.th, styles.w_rsvp]}>RSVP / REG</Text>
    </View>
  </View>
);

// Row chunking: @react-pdf handles page breaks; we just render rows.
const TableRow: React.FC<{ g: Guest; alt?: boolean }> = ({ g, alt }) => (
  <View
    style={[
      styles.row,
      { backgroundColor: alt ? "#FCFCFD" : "#FFFFFF" },
    ]}
    wrap={false}
  >
    <Text style={[styles.cell, styles.w_room]}>{g.room_no}</Text>
    <Text style={[styles.cell, styles.w_name]}>{fullName(g)}</Text>
    <Text style={[styles.cell, styles.w_dates]}>
      {formatDate(g.arrival)} → {formatDate(g.departure)}
    </Text>
    <Text style={[styles.cell, styles.w_source]}>
      {g.rate_source} / {g.by}
    </Text>
    <Text style={[styles.cell, styles.w_sell]}>
      {g.sell_type} / {g.group}
    </Text>
    <Text style={[styles.cell, styles.w_guestType]}>{g.guest_type}</Text>
    <Text style={[styles.cell, styles.w_pax]}>{g.adult}/{g.child}</Text>
    <Text style={[styles.cell, styles.w_status]}>{g.status}</Text>
    <Text style={[styles.cell, styles.w_rsvp]}>{g.rsvp} / {g.reg_no}</Text>
  </View>
);

export const ReportDoc: React.FC<Props> = ({
  data,
  hotelName = "Your Hotel Name",
  reportTitle = "Guest List Report",
  generatedAt,
}) => {
  const totalAdults = data.reduce((s, g) => s + (parseInt(g.adult || "0", 10) || 0), 0);
  const totalChildren = data.reduce((s, g) => s + (parseInt(g.child || "0", 10) || 0), 0);
  const ts = generatedAt ?? new Date().toISOString().slice(0, 19).replace("T", " ");

  return (
    <Document title={`${reportTitle} - ${hotelName}`}>
      <Page size="A4" style={styles.page} wrap>
        {/* Header */}
        <View style={styles.headerWrap} fixed>
          <Text style={styles.hotelName}>{hotelName}</Text>
          <Text style={styles.reportTitle}>{reportTitle}</Text>
          <Text style={styles.metaRow}>
            Generated: {ts} • Total Guests: {data.length} • Pax: {totalAdults}/{totalChildren}
          </Text>
        </View>

        {/* Table Header */}
        <View style={{ marginTop: 52 }} fixed>
          <TableHeader />
        </View>

        {/* Rows */}
        <View style={{ marginTop: 8 }}>
          {data.map((g, idx) => (
            <TableRow key={g.id || idx.toString()} g={g} alt={idx % 2 === 1} />
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text>© {new Date().getFullYear()} {hotelName}</Text>
          <Text>Generated by HMS Report</Text>
        </View>
      </Page>
    </Document>
  );
};

export const GuestListPDFButton: React.FC<Props> = (props) => {
  const fileName = props.fileName ?? "Guest_List_Report.pdf";
  return (
    <PDFDownloadLink
      document={<ReportDoc {...props} />}
      fileName={fileName}
      style={{
        padding: "10px 14px",
        borderRadius: 8,
        backgroundColor: "#111827",
        color: "white",
        textDecoration: "none",
        fontSize: 14,
        display: "inline-block",
      }}
    >
      {({ loading }) => (loading ? "Preparing PDF..." : "Download Guest List PDF")}
    </PDFDownloadLink>
  );
};

export default GuestListPDFButton;
