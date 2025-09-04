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
        Schema::create('withdraws', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id');
            $table->string('transaction_id')->unique()->nullable();
            $table->string('external_id')->unique();
            $table->decimal('amount', 20, 2);
            $table->integer('status');
            $table->string('pix_key');
            $table->string('pix_type')->nullable();
            $table->string('description')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('gateway')->nullable();
            $table->boolean('is_affiliate')->index()->default(false);
            $table->timestamp('refunded_at')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('withdraws');
    }
};
