"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useActionState, useState } from "react";
import { SubmitButton } from "./SubmitButtons";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { invoiceSchema } from "@/app/utils/zodSchemas";
import { createInvoice } from "@/app/actions";

interface iAppProps {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
}

export function CreateInvoice({
  address,
  email,
  firstName,
  lastName,
}: iAppProps) {
  const [lastResult, action] = useActionState(createInvoice, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: invoiceSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [currency, setCurrency] = useState("USD");

  const calcualteTotal = (Number(quantity) || 0) * (Number(rate) || 0);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
          <input
            type="hidden"
            name={fields.date.name}
            value={selectedDate.toISOString()}
          />

          <input
            type="hidden"
            name={fields.total.name}
            value={calcualteTotal}
          />

          <div className="flex flex-col gap-1 w-fit mb-6">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">Draft</Badge>
              <Input
                name={fields.invoiceName.name}
                key={fields.invoiceName.key}
                defaultValue={fields.invoiceName.initialValue}
                placeholder="Enter invoice title "
              />
            </div>
            <p className="text-sm text-red-500">{fields.invoiceName.errors}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <Label>Invoice No.</Label>
              <div className="flex">
                <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                  #
                </span>
                <Input
                  name={fields.invoiceNumber.name}
                  key={fields.invoiceNumber.key}
                  defaultValue={fields.invoiceNumber.initialValue}
                  className="rounded-l-none"
                  placeholder="0001"
                />
              </div>
              <p className="text-red-500 text-sm">
                {fields.invoiceNumber.errors}
              </p>
            </div>

            <div>
              <Label>Currency</Label>
              <Select 
                name={fields.currency.name}
                key={fields.currency.key}
                onValueChange={(value) => setCurrency(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Currency</SelectLabel>
                    <SelectItem value="USD">
                      United States Dollar - USD
                    </SelectItem>
                    <SelectItem value="EUR">Euro - EUR</SelectItem>
                    {/* <SelectItem value="INR">Rupee - INR</SelectItem> */}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-red-500 text-sm">{fields.currency.errors}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label>From</Label>
              <div className="space-y-2">
                <Input
                  name={fields.fromName.name}
                  key={fields.fromName.key}
                  placeholder="Your Name"
                  defaultValue={firstName + " " + lastName}
                />
                <p className="text-red-500 text-sm">{fields.fromName.errors}</p>
                <Input
                  placeholder="Your Email"
                  name={fields.fromEmail.name}
                  key={fields.fromEmail.key}
                  defaultValue={email}
                />
                <p className="text-red-500 text-sm">
                  {fields.fromEmail.errors}
                </p>
                <Input
                  placeholder="Your Address"
                  name={fields.fromAddress.name}
                  key={fields.fromAddress.key}
                  defaultValue={address}
                />
                <p className="text-red-500 text-sm">
                  {fields.fromAddress.errors}
                </p>
              </div>
            </div>

            <div>
              <Label>To</Label>
              <div className="space-y-2">
                <Input
                  name={fields.clientName.name}
                  key={fields.clientName.key}
                  defaultValue={fields.clientName.initialValue}
                  placeholder="Enter client’s full name"
                />
                <p className="text-red-500 text-sm">
                  {fields.clientName.errors}
                </p>
                <Input
                  name={fields.clientEmail.name}
                  key={fields.clientEmail.key}
                  defaultValue={fields.clientEmail.initialValue}
                  placeholder="Enter client’s email address"
                />
                <p className="text-red-500 text-sm">
                  {fields.clientEmail.errors}
                </p>
                <Input
                  name={fields.clientAddress.name}
                  key={fields.clientAddress.key}
                  defaultValue={fields.clientAddress.initialValue}
                  placeholder="Enter client’s billing address"
                />
                <p className="text-red-500 text-sm">
                  {fields.clientAddress.errors}
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div>
                <Label>Date</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[280px] text-left justify-start"
                  >
                    <CalendarIcon />

                    {selectedDate ? (
                      new Intl.DateTimeFormat("en-US", {
                        dateStyle: "long",
                      }).format(selectedDate)
                    ) : (
                      <span>Pick a Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={selectedDate}
                    onSelect={(date) => setSelectedDate(date || new Date())}
                    mode="single"
                    fromDate={new Date()}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-red-500 text-sm">{fields.date.errors}</p>
            </div>

            <div>
              <Label>Invoice Due</Label>
              <Select
                name={fields.dueDate.name}
                key={fields.dueDate.key}
                defaultValue={fields.dueDate.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select due date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Due on Reciept</SelectItem>
                  <SelectItem value="15">Net 15</SelectItem>
                  <SelectItem value="30">Net 30</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500 text-sm">{fields.dueDate.errors}</p>
            </div>
          </div>

          <div>
  {/* Grid Layout for Input Rows */}
  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-4">
    {/* Description Input */}
    <div className="col-span-12 sm:col-span-6">
      <label className="font-medium text-sm block mb-1">Description</label>
      <Textarea
        name={fields.invoiceItemDescription.name}
        key={fields.invoiceItemDescription.key}
        defaultValue={fields.invoiceItemDescription.initialValue}
        placeholder="Enter item name and detailed description"
        className="w-full"
      />
      <p className="text-red-500 text-sm">
        {fields.invoiceItemDescription.errors}
      </p>
    </div>

    {/* Quantity Input */}
    <div className="col-span-12 sm:col-span-2">
      <label className="font-medium text-sm block mb-1">Quantity</label>
      <Input
        name={fields.invoiceItemQuantity.name}
        key={fields.invoiceItemQuantity.key}
        type="number"
        placeholder="0"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="w-full"
      />
      <p className="text-red-500 text-sm">
        {fields.invoiceItemQuantity.errors}
      </p>
    </div>

    {/* Rate Input */}
    <div className="col-span-12 sm:col-span-2">
      <label className="font-medium text-sm block mb-1">Rate</label>
      <Input
        name={fields.invoiceItemRate.name}
        key={fields.invoiceItemRate.key}
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        type="number"
        placeholder="0"
        className="w-full"
      />
      <p className="text-red-500 text-sm">
        {fields.invoiceItemRate.errors}
      </p>
    </div>

    {/* Amount Display */}
    <div className="col-span-12 sm:col-span-2">
      <label className="font-medium text-sm block mb-1">Amount</label>
      <Input
        value={formatCurrency({
          amount: calcualteTotal,
          currency: currency as any,
        })}
        disabled
        className="w-full"
      />
    </div>
  </div>

  {/* Total Section */}
  <div className="flex flex-col sm:flex-row justify-end">
    <div className="w-full sm:w-1/3">
      <div className="flex justify-between py-2">
        <span>Subtotal</span>
        <span>
          {formatCurrency({
            amount: calcualteTotal,
            currency: currency as any,
          })}
        </span>
      </div>
      <div className="flex justify-between py-2 border-t">
        <span>Total ({currency})</span>
        <span className="font-medium underline underline-offset-2">
          {formatCurrency({
            amount: calcualteTotal,
            currency: currency as any,
          })}
        </span>
      </div>
    </div>
  </div>
</div>

          <div>
            <Label>Note (optional)</Label>
            <Textarea
              name={fields.note.name}
              key={fields.note.key}
              defaultValue={fields.note.initialValue}
              placeholder="Add any special instructions or notes"
            />
            <p className="text-red-500 text-sm">{fields.note.errors}</p>
          </div>

          <div className="flex items-center justify-end mt-6">
            <div>
              <SubmitButton text="Send Invoice to Client" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
