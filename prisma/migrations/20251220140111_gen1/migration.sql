-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "SubscriptionCycle" AS ENUM ('monthly', 'yearly');

-- CreateEnum
CREATE TYPE "SubscriptionTier" AS ENUM ('FREE', 'BASE', 'PRO');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "email_verified" TIMESTAMPTZ(6),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_plans" (
    "uuid" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "package_name" TEXT NOT NULL,
    "monthly_price" DECIMAL(65,30),
    "yearly_price" DECIMAL(65,30),
    "no_of_accounts" INTEGER NOT NULL,
    "no_of_email_accounts" INTEGER,
    "no_of_cloud_accounts" INTEGER,
    "no_of_social_accounts" INTEGER,
    "max_connected_drives" INTEGER NOT NULL,
    "tier" "SubscriptionTier" NOT NULL,
    "action_limit" BOOLEAN NOT NULL,
    "cycle" "SubscriptionCycle" NOT NULL,
    "features" JSONB NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscription_plans_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "subscribed_users" (
    "uuid" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "user_id" TEXT NOT NULL,
    "subscription_plan_id" TEXT NOT NULL,
    "connectedAccounts" INTEGER NOT NULL,
    "connected_email_accounts" INTEGER NOT NULL DEFAULT 0,
    "connected_cloud_accounts" INTEGER NOT NULL DEFAULT 0,
    "connected_social_accounts" INTEGER NOT NULL DEFAULT 0,
    "usage" INTEGER NOT NULL,
    "email_deletion_usage" BIGINT NOT NULL DEFAULT 0,
    "cloud_deletion_usage" BIGINT NOT NULL DEFAULT 0,
    "social_deletion_usage" BIGINT NOT NULL DEFAULT 0,
    "paid_amount" DECIMAL(65,30),
    "sub_start_time" TIMESTAMP(3),
    "sub_end_time" TIMESTAMP(3),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscribed_users_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "otp_codes" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "code" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_at" TIMESTAMPTZ(6) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otp_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "google_drive_accounts" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "gmail_account" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_in" BIGINT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "scope" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "google_drive_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "google_drive_folders_trees" (
    "google_drive_account_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "folder_tree" JSONB NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "google_drive_folders_trees_pkey" PRIMARY KEY ("google_drive_account_id")
);

-- CreateTable
CREATE TABLE "google_drive_folders" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "user_id" TEXT NOT NULL,
    "google_drive_account_id" TEXT NOT NULL,
    "folder_name" TEXT NOT NULL,
    "folder_parents" TEXT NOT NULL,
    "folder_path" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "google_drive_folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "google_drive_files" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "user_id" TEXT NOT NULL,
    "google_drive_account_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_parents" TEXT NOT NULL,
    "file_created_time" TIMESTAMP(3) NOT NULL,
    "md5Checksum" TEXT,
    "mime_type" TEXT NOT NULL,
    "file_size" BIGINT,
    "viewed_by_me_time" TIMESTAMP(3),
    "file_path" TEXT NOT NULL,
    "web_view_link" TEXT,
    "thumbnail_link" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "google_drive_files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "subscribed_users_user_id_key" ON "subscribed_users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "otp_codes_code_key" ON "otp_codes"("code");

-- CreateIndex
CREATE INDEX "otp_codes_code_idx" ON "otp_codes"("code");

-- CreateIndex
CREATE INDEX "otp_codes_user_id_idx" ON "otp_codes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "google_drive_accounts_gmail_account_key" ON "google_drive_accounts"("gmail_account");

-- CreateIndex
CREATE UNIQUE INDEX "google_drive_files_file_id_key" ON "google_drive_files"("file_id");

-- AddForeignKey
ALTER TABLE "subscribed_users" ADD CONSTRAINT "subscribed_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscribed_users" ADD CONSTRAINT "subscribed_users_subscription_plan_id_fkey" FOREIGN KEY ("subscription_plan_id") REFERENCES "subscription_plans"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "otp_codes" ADD CONSTRAINT "otp_codes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "google_drive_accounts" ADD CONSTRAINT "google_drive_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "google_drive_folders_trees" ADD CONSTRAINT "google_drive_folders_trees_google_drive_account_id_fkey" FOREIGN KEY ("google_drive_account_id") REFERENCES "google_drive_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "google_drive_folders_trees" ADD CONSTRAINT "google_drive_folders_trees_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "google_drive_folders" ADD CONSTRAINT "google_drive_folders_google_drive_account_id_fkey" FOREIGN KEY ("google_drive_account_id") REFERENCES "google_drive_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "google_drive_folders" ADD CONSTRAINT "google_drive_folders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "google_drive_files" ADD CONSTRAINT "google_drive_files_file_parents_fkey" FOREIGN KEY ("file_parents") REFERENCES "google_drive_folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "google_drive_files" ADD CONSTRAINT "google_drive_files_google_drive_account_id_fkey" FOREIGN KEY ("google_drive_account_id") REFERENCES "google_drive_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "google_drive_files" ADD CONSTRAINT "google_drive_files_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
