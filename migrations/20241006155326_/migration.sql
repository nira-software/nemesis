-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "crm";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "invoices";

-- CreateEnum
CREATE TYPE "crm"."CustomerStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PROSPECT');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crm"."customers" (
    "id" TEXT NOT NULL,
    "document_type" TEXT NOT NULL,
    "document_number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "trade_name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "activity_code" TEXT,
    "activity_description" TEXT,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "crm"."CustomerStatus" NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crm"."addresses" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,
    "complement" TEXT,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crm"."contact_history" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "contact_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contact_method" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "contact_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices"."invoice_issuers" (
    "id" TEXT NOT NULL,
    "nit" TEXT NOT NULL,
    "nrc" TEXT,
    "name" TEXT NOT NULL,
    "trade_name" TEXT,
    "activity_code" TEXT,
    "activity_description" TEXT,
    "establishment_type" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "department" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,
    "complement_address" TEXT,

    CONSTRAINT "invoice_issuers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices"."invoice_receivers" (
    "id" TEXT NOT NULL,
    "document_type" TEXT NOT NULL,
    "document_number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,

    CONSTRAINT "invoice_receivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices"."electronic_tax_documents" (
    "id" TEXT NOT NULL,
    "control_number" TEXT NOT NULL,
    "generationCode" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type_of_currency" TEXT NOT NULL,
    "total_taxed" DOUBLE PRECISION NOT NULL,
    "total_exempt" DOUBLE PRECISION,
    "total_to_pay" DOUBLE PRECISION NOT NULL,
    "total_tax" DOUBLE PRECISION NOT NULL,
    "invoice_issuer_id" TEXT NOT NULL,
    "invoice_receiver_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "electronic_tax_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices"."invoice_items" (
    "id" SERIAL NOT NULL,
    "item_number" INTEGER NOT NULL,
    "item_type" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "taxed_sale" DOUBLE PRECISION NOT NULL,
    "item_tax" DOUBLE PRECISION NOT NULL,
    "invoice_id" TEXT NOT NULL,

    CONSTRAINT "invoice_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "public"."roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "customers_document_number_key" ON "crm"."customers"("document_number");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_issuers_nit_key" ON "invoices"."invoice_issuers"("nit");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_receivers_document_number_key" ON "invoices"."invoice_receivers"("document_number");

-- CreateIndex
CREATE UNIQUE INDEX "electronic_tax_documents_generationCode_key" ON "invoices"."electronic_tax_documents"("generationCode");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."addresses" ADD CONSTRAINT "addresses_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "crm"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."contact_history" ADD CONSTRAINT "contact_history_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "crm"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices"."electronic_tax_documents" ADD CONSTRAINT "electronic_tax_documents_invoice_issuer_id_fkey" FOREIGN KEY ("invoice_issuer_id") REFERENCES "invoices"."invoice_issuers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices"."electronic_tax_documents" ADD CONSTRAINT "electronic_tax_documents_invoice_receiver_id_fkey" FOREIGN KEY ("invoice_receiver_id") REFERENCES "invoices"."invoice_receivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices"."electronic_tax_documents" ADD CONSTRAINT "electronic_tax_documents_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "crm"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices"."invoice_items" ADD CONSTRAINT "invoice_items_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"."electronic_tax_documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
