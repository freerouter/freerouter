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
        Schema::create('provider_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnUpdate()->onDelete('cascade');
            $table->foreignId('provider_id')->constrained('providers')->cascadeOnUpdate()->onDelete('cascade');
            $table->string('api_key');
            $table->boolean('is_enabled')->default(true);
            $table->string('default_model')->nullable();
            $table->jsonb('config')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'provider_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('provider_user');
    }
};
