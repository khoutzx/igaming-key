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
        Schema::create('payments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id');
            $table->decimal('amount', 20, 2);
            $table->decimal('bonus', 20, 2)->nullable();
            $table->integer('status');
            $table->string('transaction_id')->unique();
            $table->string('external_id')->unique();
            $table->text('qrcode')->nullable();
            $table->string('gateway')->nullable();
            $table->json('gateway_request')->nullable();
            $table->json('gateway_response')->nullable();
            $table->json('gateway_webhook')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
