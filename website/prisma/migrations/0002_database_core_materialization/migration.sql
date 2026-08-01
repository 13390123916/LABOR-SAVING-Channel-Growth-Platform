-- CreateTable
CREATE TABLE `entities` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `entity_id` VARCHAR(32) NOT NULL,
    `entity_type` VARCHAR(64) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `summary` TEXT NULL,
    `status` VARCHAR(64) NOT NULL,
    `source_status` VARCHAR(64) NULL,
    `version` INTEGER NOT NULL DEFAULT 1,
    `locale` VARCHAR(16) NOT NULL DEFAULT 'zh-CN',
    `metadata_id` BIGINT UNSIGNED NULL,
    `schema_id` BIGINT UNSIGNED NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `published_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,
    `created_by` BIGINT UNSIGNED NULL,
    `updated_by` BIGINT UNSIGNED NULL,
    `published_by` BIGINT UNSIGNED NULL,

    UNIQUE INDEX `entities_entity_id_key`(`entity_id`),
    INDEX `entities_status_deleted_at_idx`(`status`, `deleted_at`),
    UNIQUE INDEX `entities_entity_type_slug_locale_key`(`entity_type`, `slug`, `locale`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `category_type` VARCHAR(64) NOT NULL,
    `parent_id` BIGINT UNSIGNED NULL,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `locale` VARCHAR(16) NOT NULL DEFAULT 'zh-CN',
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `categories_parent_id_idx`(`parent_id`),
    INDEX `categories_status_deleted_at_idx`(`status`, `deleted_at`),
    UNIQUE INDEX `categories_category_type_slug_locale_key`(`category_type`, `slug`, `locale`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `entity_id` VARCHAR(32) NOT NULL,
    `category_id` BIGINT UNSIGNED NOT NULL,
    `product_slug` VARCHAR(191) NOT NULL,
    `product_name` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NULL,
    `short_description` TEXT NULL,
    `target_users` JSON NULL,
    `application_summary` TEXT NULL,
    `lead_type` VARCHAR(64) NULL,
    `cta` VARCHAR(191) NULL,
    `detail_status` VARCHAR(64) NOT NULL,
    `schema_eligible` BOOLEAN NOT NULL DEFAULT false,
    `content_validated` BOOLEAN NOT NULL DEFAULT false,
    `release_approved` BOOLEAN NOT NULL DEFAULT false,
    `status` VARCHAR(64) NOT NULL,
    `version` INTEGER NOT NULL DEFAULT 1,
    `locale` VARCHAR(16) NOT NULL DEFAULT 'zh-CN',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `published_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `products_entity_id_key`(`entity_id`),
    INDEX `products_status_detail_status_deleted_at_idx`(`status`, `detail_status`, `deleted_at`),
    UNIQUE INDEX `products_category_id_product_slug_locale_key`(`category_id`, `product_slug`, `locale`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `industries` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `entity_id` VARCHAR(32) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `scenario_summary` TEXT NULL,
    `common_problems` JSON NULL,
    `implementation_conditions` TEXT NULL,
    `lead_type` VARCHAR(64) NULL,
    `status` VARCHAR(64) NOT NULL,
    `version` INTEGER NOT NULL DEFAULT 1,
    `locale` VARCHAR(16) NOT NULL DEFAULT 'zh-CN',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `published_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `industries_entity_id_key`(`entity_id`),
    INDEX `industries_status_deleted_at_idx`(`status`, `deleted_at`),
    UNIQUE INDEX `industries_slug_locale_key`(`slug`, `locale`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `partners` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `entity_id` VARCHAR(32) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `program_name` VARCHAR(191) NOT NULL,
    `positioning` TEXT NULL,
    `target_roles` JSON NULL,
    `lead_type` VARCHAR(64) NULL,
    `cta` VARCHAR(191) NULL,
    `status` VARCHAR(64) NOT NULL,
    `version` INTEGER NOT NULL DEFAULT 1,
    `locale` VARCHAR(16) NOT NULL DEFAULT 'zh-CN',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `published_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `partners_entity_id_key`(`entity_id`),
    INDEX `partners_status_deleted_at_idx`(`status`, `deleted_at`),
    UNIQUE INDEX `partners_slug_locale_key`(`slug`, `locale`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leads` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `lead_no` VARCHAR(64) NOT NULL,
    `lead_type` VARCHAR(64) NOT NULL,
    `company_name` VARCHAR(191) NULL,
    `contact_name` VARCHAR(191) NULL,
    `phone` VARCHAR(64) NULL,
    `region` VARCHAR(191) NULL,
    `industry` VARCHAR(191) NULL,
    `main_products` TEXT NULL,
    `customer_resources` TEXT NULL,
    `cooperation_intent` TEXT NULL,
    `interested_product` VARCHAR(191) NULL,
    `application_scenario` TEXT NULL,
    `project_stage` VARCHAR(64) NULL,
    `source_channel` VARCHAR(64) NULL,
    `source_page` VARCHAR(191) NULL,
    `source_campaign` VARCHAR(191) NULL,
    `status` VARCHAR(64) NOT NULL,
    `assigned_to` BIGINT UNSIGNED NULL,
    `contacted_at` DATETIME(3) NULL,
    `qualified_at` DATETIME(3) NULL,
    `closed_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `leads_lead_no_key`(`lead_no`),
    INDEX `leads_lead_type_status_idx`(`lead_type`, `status`),
    INDEX `leads_assigned_to_idx`(`assigned_to`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `media` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `entity_id` VARCHAR(32) NOT NULL,
    `asset_type` VARCHAR(64) NOT NULL,
    `asset_path` VARCHAR(512) NOT NULL,
    `original_filename` VARCHAR(255) NULL,
    `mime_type` VARCHAR(128) NULL,
    `file_size` BIGINT UNSIGNED NULL,
    `alt_text` VARCHAR(255) NULL,
    `caption` TEXT NULL,
    `source_status` VARCHAR(64) NULL,
    `license_status` VARCHAR(64) NULL,
    `usage_scope` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `media_entity_id_key`(`entity_id`),
    UNIQUE INDEX `media_asset_path_key`(`asset_path`),
    INDEX `media_license_status_deleted_at_idx`(`license_status`, `deleted_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articles` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `entity_id` VARCHAR(32) NOT NULL,
    `category_id` BIGINT UNSIGNED NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `summary` TEXT NULL,
    `content` LONGTEXT NULL,
    `content_type` VARCHAR(64) NULL,
    `target_audience` VARCHAR(191) NULL,
    `locale` VARCHAR(16) NOT NULL DEFAULT 'zh-CN',
    `status` VARCHAR(64) NOT NULL,
    `version` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `published_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `articles_entity_id_key`(`entity_id`),
    INDEX `articles_category_id_idx`(`category_id`),
    INDEX `articles_status_deleted_at_idx`(`status`, `deleted_at`),
    UNIQUE INDEX `articles_slug_locale_key`(`slug`, `locale`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faqs` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `entity_id` VARCHAR(32) NOT NULL,
    `question` TEXT NOT NULL,
    `answer` TEXT NOT NULL,
    `question_hash` VARCHAR(128) NOT NULL,
    `locale` VARCHAR(16) NOT NULL DEFAULT 'zh-CN',
    `status` VARCHAR(64) NOT NULL,
    `version` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `published_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `faqs_entity_id_key`(`entity_id`),
    INDEX `faqs_status_deleted_at_idx`(`status`, `deleted_at`),
    UNIQUE INDEX `faqs_entity_id_question_hash_locale_key`(`entity_id`, `question_hash`, `locale`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `downloads` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `entity_id` VARCHAR(32) NOT NULL,
    `category_id` BIGINT UNSIGNED NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `summary` TEXT NULL,
    `media_id` BIGINT UNSIGNED NULL,
    `public_access` BOOLEAN NOT NULL DEFAULT false,
    `license_status` VARCHAR(64) NULL,
    `status` VARCHAR(64) NOT NULL,
    `version` INTEGER NOT NULL DEFAULT 1,
    `locale` VARCHAR(16) NOT NULL DEFAULT 'zh-CN',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `published_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `downloads_entity_id_key`(`entity_id`),
    INDEX `downloads_category_id_idx`(`category_id`),
    INDEX `downloads_media_id_idx`(`media_id`),
    INDEX `downloads_status_deleted_at_idx`(`status`, `deleted_at`),
    UNIQUE INDEX `downloads_slug_locale_key`(`slug`, `locale`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `navigation` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nav_group` VARCHAR(64) NOT NULL,
    `parent_id` BIGINT UNSIGNED NULL,
    `slug` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `url` VARCHAR(512) NULL,
    `entity_id` VARCHAR(32) NULL,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `is_external` BOOLEAN NOT NULL DEFAULT false,
    `status` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `navigation_entity_id_idx`(`entity_id`),
    INDEX `navigation_status_deleted_at_idx`(`status`, `deleted_at`),
    UNIQUE INDEX `navigation_nav_group_parent_id_slug_key`(`nav_group`, `parent_id`, `slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seo_metadata` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `entity_id` VARCHAR(32) NOT NULL,
    `page_url` VARCHAR(512) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `keywords` TEXT NULL,
    `canonical_url` VARCHAR(512) NULL,
    `og_title` VARCHAR(255) NULL,
    `og_description` TEXT NULL,
    `og_image_id` BIGINT UNSIGNED NULL,
    `breadcrumb_json` JSON NULL,
    `locale` VARCHAR(16) NOT NULL DEFAULT 'zh-CN',
    `status` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `published_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,
    `indexed_at` DATETIME(3) NULL,
    `last_submitted_at` DATETIME(3) NULL,

    INDEX `seo_metadata_og_image_id_idx`(`og_image_id`),
    INDEX `seo_metadata_status_deleted_at_idx`(`status`, `deleted_at`),
    UNIQUE INDEX `seo_metadata_entity_id_page_url_locale_key`(`entity_id`, `page_url`, `locale`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schema_metadata` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `entity_id` VARCHAR(32) NOT NULL,
    `page_url` VARCHAR(512) NULL,
    `schema_type` VARCHAR(64) NOT NULL,
    `schema_json` JSON NOT NULL,
    `source_doc` VARCHAR(191) NULL,
    `source_status` VARCHAR(64) NULL,
    `locale` VARCHAR(16) NOT NULL DEFAULT 'zh-CN',
    `status` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `published_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,
    `indexed_at` DATETIME(3) NULL,
    `last_submitted_at` DATETIME(3) NULL,

    INDEX `schema_metadata_status_deleted_at_idx`(`status`, `deleted_at`),
    UNIQUE INDEX `schema_metadata_entity_id_schema_type_locale_key`(`entity_id`, `schema_type`, `locale`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `tag_type` VARCHAR(64) NOT NULL,
    `locale` VARCHAR(16) NOT NULL DEFAULT 'zh-CN',
    `status` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `tags_status_deleted_at_idx`(`status`, `deleted_at`),
    UNIQUE INDEX `tags_tag_type_slug_locale_key`(`tag_type`, `slug`, `locale`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `redirects` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `source_url` VARCHAR(512) NOT NULL,
    `target_url` VARCHAR(512) NOT NULL,
    `status_code` INTEGER NOT NULL,
    `reason` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `redirects_source_url_key`(`source_url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entity_relations` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `source_entity_id` VARCHAR(32) NOT NULL,
    `target_entity_id` VARCHAR(32) NOT NULL,
    `relation_type` VARCHAR(64) NOT NULL,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `entity_relations_target_entity_id_idx`(`target_entity_id`),
    INDEX `entity_relations_status_deleted_at_idx`(`status`, `deleted_at`),
    UNIQUE INDEX `entity_relations_source_entity_id_target_entity_id_relation__key`(`source_entity_id`, `target_entity_id`, `relation_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entity_media` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `source_entity_id` VARCHAR(32) NOT NULL,
    `target_entity_id` VARCHAR(32) NOT NULL,
    `relation_type` VARCHAR(64) NOT NULL,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `entity_media_target_entity_id_idx`(`target_entity_id`),
    INDEX `entity_media_status_deleted_at_idx`(`status`, `deleted_at`),
    UNIQUE INDEX `entity_media_source_entity_id_target_entity_id_relation_type_key`(`source_entity_id`, `target_entity_id`, `relation_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entity_faqs` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `source_entity_id` VARCHAR(32) NOT NULL,
    `target_entity_id` VARCHAR(32) NOT NULL,
    `relation_type` VARCHAR(64) NOT NULL,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `entity_faqs_target_entity_id_idx`(`target_entity_id`),
    INDEX `entity_faqs_status_deleted_at_idx`(`status`, `deleted_at`),
    UNIQUE INDEX `entity_faqs_source_entity_id_target_entity_id_relation_type_key`(`source_entity_id`, `target_entity_id`, `relation_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entity_tags` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `entity_id` VARCHAR(32) NOT NULL,
    `tag_id` BIGINT UNSIGNED NOT NULL,
    `relation_type` VARCHAR(64) NOT NULL,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `entity_tags_tag_id_idx`(`tag_id`),
    INDEX `entity_tags_status_deleted_at_idx`(`status`, `deleted_at`),
    UNIQUE INDEX `entity_tags_entity_id_tag_id_relation_type_key`(`entity_id`, `tag_id`, `relation_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_industries` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `source_entity_id` VARCHAR(32) NOT NULL,
    `target_entity_id` VARCHAR(32) NOT NULL,
    `relation_type` VARCHAR(64) NOT NULL,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `product_industries_target_entity_id_idx`(`target_entity_id`),
    INDEX `product_industries_status_deleted_at_idx`(`status`, `deleted_at`),
    UNIQUE INDEX `product_industries_source_entity_id_target_entity_id_relatio_key`(`source_entity_id`, `target_entity_id`, `relation_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `article_tags` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `article_entity_id` VARCHAR(32) NOT NULL,
    `tag_id` BIGINT UNSIGNED NOT NULL,
    `relation_type` VARCHAR(64) NOT NULL,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `article_tags_tag_id_idx`(`tag_id`),
    INDEX `article_tags_status_deleted_at_idx`(`status`, `deleted_at`),
    UNIQUE INDEX `article_tags_article_entity_id_tag_id_relation_type_key`(`article_entity_id`, `tag_id`, `relation_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
