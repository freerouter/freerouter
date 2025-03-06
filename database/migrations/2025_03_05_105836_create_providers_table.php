<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('providers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('display_name')->nullable();
            $table->string('slug')->unique();
            $table->string('base_url');
            $table->jsonb('data_policy')->nullable();
            $table->boolean('has_chat_completions')->default(false);
            $table->boolean('has_completions')->default(false);
            $table->boolean('is_abortable')->default(false);
            $table->boolean('moderation_required')->default(false);
            $table->string('group')->nullable();
            $table->string('status_page_url')->nullable();
            $table->boolean('byok_enabled')->default(false);
            $table->boolean('is_primary_provider')->default(false);
            $table->jsonb('icon')->nullable();
            $table->jsonb('config')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('providers');
    }
};
