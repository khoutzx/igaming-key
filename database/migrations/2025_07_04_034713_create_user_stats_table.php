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
        Schema::create('user_stats', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id');
            $table->decimal('total_bet', 20, 2)->default(0);
            $table->decimal('total_deposit', 20, 2)->default(0);
            $table->decimal('total_withdraw', 20, 2)->default(0);
            $table->decimal('total_commission', 20, 2)->default(0);
            $table->integer('deposit_count')->default(0);
            $table->bigInteger('cpa_sum')->default(0);
            $table->bigInteger('sub_sum')->default(0);
            $table->bigInteger('revenue_sum')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_stats');
    }
};
