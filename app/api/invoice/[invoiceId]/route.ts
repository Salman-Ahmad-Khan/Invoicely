import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";
import jsPDF from "jspdf";
import { formatCurrency } from "@/app/utils/formatCurrency";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  const { invoiceId } = await params;

  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
    },
    select: {
      invoiceName: true,
      invoiceNumber: true,
      currency: true,
      fromName: true,
      fromEmail: true,
      fromAddress: true,
      clientName: true,
      clientAddress: true,
      clientEmail: true,
      date: true,
      dueDate: true,
      invoiceItemDescription: true,
      invoiceItemQuantity: true,
      invoiceItemRate: true,
      total: true,
      note: true,
    },
  });

  if (!data) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Add brand name to top-right
  pdf.setFont("Times", "bold");
  pdf.setFontSize(18);
  pdf.setTextColor(54, 69, 79); // Stylish dark slate gray color
  pdf.text("Invoicely", 200, 15, { align: "right" });

  // Invoice Title
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.text(data.invoiceName || "Invoice", 20, 40);

  // From Section
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.text("From:", 20, 60);
  pdf.setFontSize(10);
  pdf.text([data.fromName, data.fromEmail, data.fromAddress], 20, 65);

  // Client Section
  pdf.setFontSize(12);
  pdf.text("Bill To:", 120, 60);
  pdf.setFontSize(10);
  pdf.text([data.clientName, data.clientEmail, data.clientAddress], 120, 65);

  // Invoice Details
  pdf.setFontSize(12);
  pdf.text("Invoice Details", 20, 90);
  pdf.setFontSize(10);
  pdf.text(`Invoice Number: #${data.invoiceNumber}`, 20, 95);
  pdf.text(
    `Date: ${new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
      data.date
    )}`,
    20,
    100
  );
  pdf.text(`Due Date: ${data.dueDate}`, 20, 105);

  // Add description above the table
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text("Description:", 20, 115); // Heading for the description
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  const descriptionHeight = pdf.splitTextToSize(data.invoiceItemDescription, 170);
  pdf.text(descriptionHeight, 20, 120);

  // Add extra space based on description length
  let currentY = 120 + descriptionHeight.length * 5;

  // Add item details table below the description
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text("Item Details", 20, currentY + 10);
  pdf.setDrawColor(0, 0, 0);
  pdf.setFillColor(230, 230, 230);
  pdf.rect(20, currentY + 15, 170, 10, "F");
  pdf.text("Quantity", 30, currentY + 22);
  pdf.text("Rate", 80, currentY + 22);
  pdf.text("Total", 140, currentY + 22);

  // Table Content
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text(data.invoiceItemQuantity.toString(), 30, currentY + 35);
  pdf.text(
    formatCurrency({
      amount: data.invoiceItemRate,
      currency: data.currency as any,
    }),
    80,
    currentY + 35
  );
  pdf.text(
    formatCurrency({ amount: data.total, currency: data.currency as any }),
    140,
    currentY + 35
  );

  // Total Section
  pdf.setFont("helvetica", "bold");
  pdf.line(20, currentY + 50, 190, currentY + 50);
  pdf.text("Total:", 140, currentY + 60);
  pdf.text(
    formatCurrency({ amount: data.total, currency: data.currency as any }),
    160,
    currentY + 60
  );

  // Notes Section
  if (data.note) {
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(10);
    pdf.text("Note:", 20, currentY + 75);
    pdf.text(data.note, 20, currentY + 80, { maxWidth: 170 });
  }

  // Generate PDF buffer
  const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

  // Return PDF as response
  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
    },
  });
}
