<template>
  <div>
    <q-btn
      @click="openDialog()"
      class="pt-bg-accent-0 text-white"
      label="Show Dialog"
    />
    <q-btn label="Download (Excel)" @click="generateExcel()" />
    <q-btn label="Download (HTML to PDF)" @click="generateHTML2PDF()" />
    <q-btn label="Download (PDF)" @click="generatePDF()" />

    <!-- HTML to PDF -->
    <div id="page" style="color: black; background: white">
      <div class="page page-1">
        <h3>Test page 1</h3>
        <p>This is an page for testing 1</p>
      </div>
      <div class="page page-2">
        <h3>Test page 2</h3>
        <p>This is an page for testing 1</p>
      </div>
      <div class="page page-3">
        <h3>Test page 3</h3>
        <p>This is an page for testing 1</p>
      </div>
    </div>
    <PMDialog :content="$options.components.DeleteConfirmation" />
  </div>
</template>

<script>
import PMDialog from "../../components/PMDialog.vue";
import { TogglePmDialogState } from "../../composables/Triggers";
import DeleteConfirmation from "./components/DeleteConfirmation.vue";
import html2PDF from "jspdf-html2canvas";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
export default {
  components: { PMDialog, DeleteConfirmation },
  setup() {
    const openDialog = () => {
      TogglePmDialogState();
    };

    /**Call download template function to
     * write data from db to excel file */
    const ExcelJS = require("exceljs");

    const generateExcel = async () => {
      const wb = new ExcelJS.Workbook();
      const saveAs = require("file-saver");

      /**Setting up the sheets */
      const task_sheet = wb.addWorksheet("Tasks");
      const projects_sheet = wb.addWorksheet("Projects & Milestones");

      /**Setting up the headers of each sheet */
      task_sheet.columns = [
        { header: "Project", key: "pn", width: 25 },
        { header: "Milestone", key: "mn", width: 25 },
        { header: "Task Name", key: "tn", width: 25 },
        { header: "Personnel", key: "psn", width: 25 },
        { header: "Evaluator", key: "ev", width: 25 },
        { header: "Work Type", key: "wt", width: 25 },
        { header: "Urgency Level", key: "ul", width: 25 },
        { header: "Task Description", key: "td", width: 25 },
        { header: "Estimated Hours", key: "eh", width: 25 },
      ];
      task_sheet.addRow([
        'List of Projects and Milestones can be found in the "Projects & Milestones" Sheet.',
        "",
        "Keep Task names simple, clear, and concise",
        'List of Employee Names can be found in the "Employees" Sheet.',
        'List of Employee Names can be found in the "Employees" Sheet.',
        'List of Work Types can be found in the "Work Types" Sheet.',
        "Urgency Levels are:\nNormal\nImportant\nUrgent Important",
        "You can input a task description and attach a link here\n\nNote: This is optional field",
        "You can input an estimated hours here\n\nNote: This is required field",
      ]);
      task_sheet.mergeCells("A2:B2");

      projects_sheet.columns = [
        { header: "Project", key: "pn", width: 25 },
        { header: "Milestone", key: "pn", width: 25 },
      ];

      /**Setting up the style for the headers */
      wb.eachSheet(function (sheet) {
        const header_row = sheet.getRow(1);
        header_row.eachCell(function (cell) {
          cell.alignment = {
            vertical: "middle",
            horizontal: "center",
          };
          cell.font = {
            size: 10,
            bold: true,
            color: { argb: "FFFFFF" },
          };
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "C7293A" },
          };
          cell.border = {
            bottom: { style: "thin" },
          };
        });
      });
      task_sheet.getRow(2).eachCell(function (cell) {
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };
        cell.border = {
          top: { style: "thin" },
          right: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
        };
        cell.font = {
          size: 10,
          color: { argb: "FFFFFF" },
        };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "E0384A" },
        };
      });

      /**Populate the sheets */

      const milestone_data = [
        {
          project_name: "Project name",
          milestone_name: "Milestone name",
        },
      ];

      milestone_data.forEach((record) => {
        projects_sheet.addRow([record.project_name, record.milestone_name]);
      });

      /**Download file */
      wb.xlsx.writeBuffer().then(function (data) {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "ImportTaskTemplate.xlsx");
      });
    };

    const generateHTML2PDF = () => {
      const pages = document.getElementsByClassName("page");
      html2PDF(pages, {
        jsPDF: {
          format: "a4",
        },
        imageType: "image/jpeg",
        output: "./pdf/generate.pdf",
      });
    };
    const doc = new jsPDF();
    const generatePDF = () => {
      let report = {
        done_tasks: 2,
        unfinished_tasks: 1,
        pending_tasks: 1,
        no_of_tasks: 1,
        total_hours: 1,
        tasks: [
          {
            name: "First task",
            overall_spent: 12,
            overall_delays: 1,
            overall_advance: 2,
            spent_today: 1,
          },
          {
            name: "Second task",
            overall_spent: 12,
            overall_delays: 1,
            overall_advance: 2,
            spent_today: 1,
          },
        ],
      };

      const docColumns = [
        { title: "Done Tasks", dataKey: "name" },
        { title: "Overall Spent", dataKey: "overall_spent" },
        { title: "Overall Delays", dataKey: "overall_delays" },
        { title: "Overall Advance", dataKey: "overall_advance" },
        { title: "Spent this date", dataKey: "spent_today" },
      ];

      // Header
      doc
        .setFont("Helvetica", "Bold")
        .setFontSize(10)
        .text("Daily Report", 10, 15);
      let width = doc.internal.pageSize.getWidth();
      doc
        .setFont("Helvetica", "regular", "normal")
        .setFontSize(10)
        .text("2022-01-01", width / 2, 15, {
          align: "center",
        });
      doc
        .setFont("Helvetica", "Bold")
        .setFontSize(10)
        .text("Full name", 200, 15, "right");

      // horizontal line
      doc.setDrawColor(196, 196, 196);
      doc.line(10, 25, 200, 25);

      // content
      doc.setFont("Helvetica", "regular", "normal");
      doc.setTextColor(135, 138, 145);
      doc.setFontSize(8).text("Done Tasks: ", 10, 35);
      doc.setFontSize(8).text("Unfinished Tasks Today: ", 10, 42);
      doc.setFontSize(8).text("Pending Task: ", 10, 49);
      doc
        .setFontSize(8)
        .text("No. of Task in Timesheet Today: ", 169.5, 35, "right");
      doc.setFontSize(8).text("Total Hours in Timesheet: ", 161, 42, "right");

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(8).text(report.done_tasks.toString(), 90, 35, "right");
      doc
        .setFontSize(8)
        .text(report.unfinished_tasks.toString(), 90, 42, "right");
      doc.setFontSize(8).text(report.pending_tasks.toString(), 90, 49, "right");
      doc.setFontSize(8).text(report.no_of_tasks.toString(), 200, 35, "right");
      doc.setFontSize(8).text(report.total_hours.toString(), 200, 42, "right");

      // horizontal line
      doc.setDrawColor(196, 196, 196);
      doc.line(10, 58, 200, 58);

      // table
      let row = report.tasks;
      doc.autoTable({
        columns: docColumns,
        body: row,
        headStyles: { fillColor: [224, 56, 74], cellPadding: 4, fontSize: 8 },
        bodyStyles: { cellPadding: 3, textColor: "black", fontSize: 8 },
        margin: { left: 10, top: 65, right: 10 },
      });
      doc.save(`file_name.pdf`);
    };

    return {
      openDialog,
      generateExcel,
      generateHTML2PDF,
      generatePDF,
    };
  },
};
</script>
